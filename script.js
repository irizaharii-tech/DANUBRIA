// Deluxe interactive site JS
// Preloader hide
window.addEventListener('load', ()=> {
  document.getElementById('preloader').style.display = 'none';
});

// Mobile menu
const mobileBtn = document.getElementById('mobileMenuBtn');
const mobileMenu = document.getElementById('mobileMenu');
mobileBtn.addEventListener('click', ()=> mobileMenu.classList.toggle('open'));

// Fade-in observer for sections
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:0.12});
document.querySelectorAll('.section').forEach(s => io.observe(s));

// Contact form (mailto fallback)
document.getElementById('contactForm').addEventListener('submit', e=>{
  // allow mailto default; show toast
  alert('Your message will open in your mail client. If you prefer direct submission, contact info@danubria.com');
});

// THREE.JS NETWORK - enhanced visuals
let scene, camera, renderer, controls, truck;
const container = document.getElementById('networkCanvas');

function initNetwork() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xf7fbff);

  const w = container.clientWidth, h = container.clientHeight;
  camera = new THREE.PerspectiveCamera(45, w/h, 0.1, 3000);
  camera.position.set(0, 280, 520);

  renderer = new THREE.WebGLRenderer({ antialias:true, alpha:false });
  renderer.setSize(w,h);
  renderer.setPixelRatio(window.devicePixelRatio);
  container.appendChild(renderer.domElement);

  controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enablePan = true;
  controls.enableRotate = true;
  controls.minDistance = 200;
  controls.maxDistance = 1200;
  controls.target.set(0,0,0);

  // lights
  const amb = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(amb);
  const dir = new THREE.DirectionalLight(0xffffff, 0.6);
  dir.position.set(100,200,100); scene.add(dir);

  // ground plane
  const plane = new THREE.Mesh(new THREE.PlaneGeometry(1200,800), new THREE.MeshBasicMaterial({color:0xffffff}));
  plane.rotation.x = -Math.PI/2; plane.position.y = -1; scene.add(plane);

  // helper: lat/lon -> x,z
  function latLonToXZ(lat, lon) {
    const latMin=35, latMax=60, lonMin=-10, lonMax=30;
    const x = ((lon - lonMin)/(lonMax-lonMin)-0.5)*900;
    const z = -((lat - latMin)/(latMax-latMin)-0.5)*600;
    return [x,z];
  }

  // hubs
  const hubs = [
    {name:'Barcelona', lat:41.3851, lon:2.1734},
    {name:'Madrid', lat:40.4168, lon:-3.7038},
    {name:'Valencia', lat:39.4699, lon:-0.3763},
    {name:'Irun', lat:43.3389, lon:-1.7894},
    {name:'Marseille', lat:43.2965, lon:5.3698},
    {name:'Montpellier', lat:43.6119, lon:3.8772},
    {name:'Nice', lat:43.7102, lon:7.2620},
    {name:'Milano', lat:45.4642, lon:9.19},
    {name:'Torino', lat:45.0703, lon:7.6869},
    {name:'Bologna', lat:44.4949, lon:11.3426},
    {name:'Venezia', lat:45.4408, lon:12.3155}
  ];

  const hubMeshes = [];
  hubs.forEach(h => {
    const [x,z] = latLonToXZ(h.lat, h.lon);
    const mat = new THREE.MeshStandardMaterial({color:0x007bff, emissive:0x003b7a, emissiveIntensity:0.2});
    const s = new THREE.Mesh(new THREE.SphereGeometry(7,24,18), mat);
    s.position.set(x,7,z);
    s.userData = { name: h.name };
    scene.add(s);
    hubMeshes.push(s);

    // pulse ring
    const ringGeo = new THREE.RingGeometry(9, 18, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color:0x66b3ff, side:THREE.DoubleSide, transparent:true, opacity:0.22 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI/2; ring.position.set(x,0.1,z);
    scene.add(ring);
  });

  // corridors (smooth glowing lines)
  function makeCorridor(coords) {
    const pts = coords.map(c => new THREE.Vector3(...latLonToXZ(c.lat, c.lon), 0));
    const curve = new THREE.CatmullRomCurve3(pts);
    const tubeGeo = new THREE.TubeGeometry(curve, 200, 1.6, 8, false);
    const mat = new THREE.MeshBasicMaterial({ color:0x007bff, transparent:true, opacity:0.18 });
    const tube = new THREE.Mesh(tubeGeo, mat); scene.add(tube);
    // moving particle along path
    const particleGeo = new THREE.SphereGeometry(3.5, 12, 8);
    const particleMat = new THREE.MeshBasicMaterial({ color:0xfffbfb });
    const particle = new THREE.Mesh(particleGeo, particleMat);
    scene.add(particle);
    return {curve, particle, speed: 0.0009 + Math.random()*0.0012};
  }

  const corridors = [
    makeCorridor([hubs[0], hubs[2], hubs[7]]), // BCN - VAL - MIL
    makeCorridor([hubs[1], hubs[5], hubs[8]]), // MAD - MPT - TOR
    makeCorridor([hubs[0], hubs[4], hubs[10]]) // BCN - MRS - VEN
  ];

  // refined truck (more polished)
  truck = new THREE.Group();
  const cabMat = new THREE.MeshStandardMaterial({ color:0xffffff, metalness:0.3, roughness:0.4 });
  const bodyMat = new THREE.MeshStandardMaterial({ color:0x0077dd, metalness:0.2, roughness:0.35 });
  const cab = new THREE.Mesh(new THREE.BoxGeometry(26,12,12), cabMat); cab.position.set(0,8,0);
  const body = new THREE.Mesh(new THREE.BoxGeometry(70,14,16), bodyMat); body.position.set(38,9,0);
  truck.add(cab, body);
  // wheels
  const wheelMat = new THREE.MeshStandardMaterial({ color:0x111111, metalness:0.1, roughness:0.6 });
  const makeWheel = (x,z) => { const w = new THREE.Mesh(new THREE.CylinderGeometry(5.6,5.6,6,24), wheelMat); w.rotation.z = Math.PI/2; w.position.set(x,3.5,z); truck.add(w); };
  makeWheel(12,-8); makeWheel(12,8); makeWheel(48,-8); makeWheel(48,8);
  truck.scale.set(1.0,1.0,1.0);
  truck.position.set(-240,8,-90);
  scene.add(truck);

  // store for animation
  scene.userData = { corridors };

  // fit camera
  window.addEventListener('resize', onResize);
  renderer.setAnimationLoop(animate);
}

function onResize() {
  const w = container.clientWidth, h = container.clientHeight;
  camera.aspect = w/h; camera.updateProjectionMatrix();
  renderer.setSize(w,h);
}

let time = 0;
function animate() {
  time += 1;
  // animate particles along corridors
  scene.userData.corridors.forEach(c => {
    const t = (time * c.speed) % 1;
    const pt = c.curve.getPointAt(t);
    c.particle.position.set(pt.x, pt.y+6, pt.z);
  });
  // truck follows first corridor
  const path = scene.userData.corridors[0].curve;
  const tt = (time * 0.0007) % 1;
  const p = path.getPointAt(tt);
  const nxt = path.getPointAt((tt+0.01)%1);
  truck.position.set(p.x, 6 + Math.sin(time*0.01)*0.6, p.z);
  truck.lookAt(nxt);

  // rotate rings subtly
  scene.traverse(obj => {
    if (obj.geometry && obj.geometry.type === 'RingGeometry') obj.rotation.z += 0.003;
  });

  renderer.render(scene, camera);
}

// initialize when in view
let networkInitialized = false;
const networkEl = document.getElementById('networkCanvas');
const netObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting && !networkInitialized) {
      networkInitialized = true;
      initNetwork();
    }
  });
}, {threshold:0.2});
netObs.observe(networkEl);

// click detection for hubs
networkEl.addEventListener('click', (ev) => {
  if (!networkInitialized) return;
  const rect = networkEl.getBoundingClientRect();
  const mouse = new THREE.Vector2(((ev.clientX-rect.left)/rect.width)*2-1, -((ev.clientY-rect.top)/rect.height)*2+1);
  const ray = new THREE.Raycaster();
  ray.setFromCamera(mouse, camera);
  const intersects = ray.intersectObjects(scene.children, true);
  if (intersects.length) {
    const o = intersects[0].object;
    if (o.userData && o.userData.name) alert(o.userData.name + ' — Danubria hub');
  }
});

// HERO small three.js for visual (non-intensive)
(function initHeroMini(){
  const el = document.getElementById('heroCanvas');
  if(!el) return;
  const w = el.clientWidth, h = el.clientHeight;
  const r = new THREE.WebGLRenderer({antialias:true, alpha:true});
  r.setSize(w,h); r.setPixelRatio(window.devicePixelRatio);
  el.appendChild(r.domElement);
  const s = new THREE.Scene();
  const c = new THREE.PerspectiveCamera(50, w/h, 0.1, 1000);
  c.position.set(0,18,60);
  const light = new THREE.DirectionalLight(0xffffff, 0.8); light.position.set(20,50,30); s.add(light);
  const amb = new THREE.AmbientLight(0xffffff,0.7); s.add(amb);
  const truckMini = new THREE.Group();
  const bMat = new THREE.MeshStandardMaterial({color:0x0077dd});
  truckMini.add(new THREE.Mesh(new THREE.BoxGeometry(30,8,10), new THREE.MeshStandardMaterial({color:0xffffff})));
  truckMini.add(new THREE.Mesh(new THREE.BoxGeometry(46,10,12), bMat));
  truckMini.position.set(0,6,0); s.add(truckMini);
  let t=0;
  function loop(){ t+=0.01; truckMini.position.x = Math.sin(t)*12; truckMini.rotation.y = Math.sin(t)*0.08; r.render(s,c); requestAnimationFrame(loop); }
  loop();
})();

