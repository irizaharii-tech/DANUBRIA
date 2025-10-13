
// Basic 3D truck using Three.js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / 400, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, 400);
document.getElementById('truck-scene').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry(4, 2, 2);
const material = new THREE.MeshStandardMaterial({ color: 0x0090ff });
const truck = new THREE.Mesh(geometry, material);
scene.add(truck);

const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.5, 32);
const wheelMaterial = new THREE.MeshStandardMaterial({ color: 0x222222 });
for (let i = -1; i <= 1; i += 2) {
    for (let j = -1; j <= 1; j += 2) {
        const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(i * 2, -1.2, j * 0.8);
        scene.add(wheel);
    }
}

const light = new THREE.PointLight(0xffffff, 1);
light.position.set(10, 10, 10);
scene.add(light);

camera.position.z = 8;

function animate() {
    requestAnimationFrame(animate);
    truck.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Simple 3D map simulation with dots
const mapContainer = document.getElementById('map');
mapContainer.innerHTML = '';
const cities = [
    'Barcelona', 'Madrid', 'Valencia', 'Irun', 'Marseille',
    'Montpellier', 'Nice', 'Milan', 'Turin', 'Bologna'
];

cities.forEach(city => {
    const dot = document.createElement('div');
    dot.className = 'dot';
    dot.title = city;
    dot.style.left = Math.random() * 90 + '%';
    dot.style.top = Math.random() * 80 + '%';
    mapContainer.appendChild(dot);
});
