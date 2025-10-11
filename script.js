// Fade-in on scroll
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, {threshold:0.12});
document.querySelectorAll('.section').forEach(s => io.observe(s));

// Contact form behavior
document.getElementById('contactForm').addEventListener('submit', e=>{
  e.preventDefault();
  alert('Thank you — message received. We will contact you shortly.');
});

// Leaflet map initialization (full-width)
const map = L.map('mapid', { minZoom: 3, maxZoom: 6, zoomControl: true }).setView([45, 10], 4);

// Tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom marker as divIcon with pulse
const createMarker = (name, coords, desc) => {
  const html = `<div class="pulse" title="${name}"></div>`;
  const icon = L.divIcon({ className: 'custom-marker', html, iconSize: [20,20], iconAnchor: [10,10] });
  const marker = L.marker(coords, { icon }).addTo(map);
  marker.bindPopup(`<strong>${name}</strong><br>${desc}`);
  return marker;
};

// Hubs list (Barcelona, Madrid, Valencia, Irun, Marseille, Montpellier, Nice, Milano, Torino, Bologna, Venezia)
const hubs = [
  {name:'Barcelona', coords:[41.3851,2.1734], desc:'Main office & regional hub - Barcelona'},
  {name:'Madrid', coords:[40.4168,-3.7038], desc:'Cross-dock & distribution - Madrid'},
  {name:'Valencia', coords:[39.4699,-0.3763], desc:'Port access & distribution - Valencia'},
  {name:'Irun', coords:[43.3389,-1.7894], desc:'Border crossing - Irun'},
  {name:'Marseille', coords:[43.2965,5.3698], desc:'Mediterranean corridor - Marseille'},
  {name:'Montpellier', coords:[43.6119,3.8772], desc:'Regional partner - Montpellier'},
  {name:'Nice', coords:[43.7102,7.2620], desc:'Coastal logistics - Nice'},
  {name:'Milano', coords:[45.4642,9.1900], desc:'Northern Italy hub - Milano'},
  {name:'Torino', coords:[45.0703,7.6869], desc:'Industrial corridor - Torino'},
  {name:'Bologna', coords:[44.4949,11.3426], desc:'Logistics & distribution - Bologna'},
  {name:'Venezia', coords:[45.4408,12.3155], desc:'Northeast access - Venezia'}
];

const markers = hubs.map(h => createMarker(h.name, h.coords, h.desc));

// Fit map to markers with padding
const latlngs = hubs.map(h => h.coords);
map.fitBounds(latlngs, { padding: [80, 80] });

// Optional: draw simple corridors (polylines) between major hubs (example)
const corridors = [
  [hubs[0].coords, hubs[2].coords, hubs[7].coords], // Barcelona - Valencia - Milano
  [hubs[1].coords, hubs[5].coords, hubs[8].coords]  // Madrid - Montpellier - Torino
];
corridors.forEach(path => {
  L.polyline(path, { color: '#007bff', weight: 2, opacity: 0.6, dashArray: '6 8' }).addTo(map);
});
