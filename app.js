// app.js (folosește modulele deja încărcate)
const translations = { /* păstrează obiectul translations din versiunea ta */ };
// ... setLang etc (păstrează codul i18n existent) ...

// init map: poziționare puțin spre sud-est pentru a se vedea corect când camionul e mare
const map = L.map('map', {minZoom:3, maxZoom:7, zoomControl:true}).setView([44.0, 6.0], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const cities = [
  {id:'barcelona', name:'Barcelona, ES', lat:41.3851, lon:2.1734, info:'Iberian operations & logistics'},
  {id:'madrid', name:'Madrid, ES', lat:40.4168, lon:-3.7038, info:'Central distribution'},
  {id:'irun', name:'Irun, ES', lat:43.3389, lon:-1.7906, info:'Border hub (Spain)'},
  {id:'valencia', name:'Valencia, ES', lat:39.4699, lon:-0.3763, info:'Mediterranean port operations'},
  {id:'montpellier', name:'Montpellier, FR', lat:43.6119, lon:3.8772, info:'Southern France partner'},
  {id:'marseille', name:'Marseille, FR', lat:43.2965, lon:5.3698, info:'Port & Mediterranean gateway'},
  {id:'nice', name:'Nice, FR', lat:43.7102, lon:7.2620, info:'Coastal logistics'},
  {id:'milano', name:'Milano, IT', lat:45.4642, lon:9.1900, info:'Northern Italy hub'},
  {id:'novarra', name:'Novara, IT', lat:45.4450, lon:8.6230, info:'Logistics in Piedmont'},
  {id:'venetia', name:'Venezia, IT', lat:45.4408, lon:12.3155, info:'Venice port & logistics'},
  {id:'bologna', name:'Bologna, IT', lat:44.4949, lon:11.3426, info:'Inland distribution Italy'}
];

const markerGroup = L.layerGroup().addTo(map);
cities.forEach(c=>{
  const el = document.createElement('div');
  el.className = 'map-dot';
  el.style.width = '14px';
  el.style.height = '14px';
  el.style.borderRadius = '50%';
  el.style.background = '#0A84FF';
  el.style.boxShadow = '0 0 18px 6px rgba(10,132,255,0.22)';
  el.style.border = '2px solid rgba(255,255,255,0.95)';
  el.style.cursor = 'pointer';
  el.title = c.name;

  const icon = L.divIcon({className:'', html: el.outerHTML, iconSize:[20,20], iconAnchor:[10,10]});
  const m = L.marker([c.lat, c.lon], {icon}).addTo(markerGroup);
  m.on('click', ()=> {
    const content = `<strong>${c.name}</strong><div style="margin-top:6px">${c.info}</div>`;
    L.popup({maxWidth:240}).setLatLng([c.lat,c.lon]).setContent(content).openOn(map);
  });
});
