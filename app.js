// app.js
const translations = {
  en: {
    "nav.home":"Home","nav.network":"Our Network","nav.quote":"Get a Quote",
    "btn.contact":"Contact","hero.title":"Danubria — The flow of Europe, the power of logistics",
    "hero.lead":"Modern European logistics — transparent routes, on-time deliveries and live network visibility.",
    "btn.quote":"Get a Quote","btn.network":"Our Network","network.title":"Our Network — Europe map",
    "network.lead":"Click a glowing dot to see city details.","quote.title":"Request a Quote","btn.send":"Send Request"
  },
  es: {
    "nav.home":"Inicio","nav.network":"Nuestra Red","nav.quote":"Pedir Cotización",
    "btn.contact":"Contacto","hero.title":"Danubria — El flujo de Europa, el poder de la logística",
    "hero.lead":"Logística europea moderna — rutas transparentes y entregas puntuales.",
    "btn.quote":"Pedir Cotización","btn.network":"Nuestra Red","network.title":"Nuestra Red — Mapa de Europa",
    "network.lead":"Haz clic en un punto brillante para ver detalles.","quote.title":"Solicitar Cotización","btn.send":"Enviar"
  },
  it: {
    "nav.home":"Home","nav.network":"La Nostra Rete","nav.quote":"Richiedi Preventivo",
    "btn.contact":"Contatti","hero.title":"Danubria — Il flusso dell'Europa, la potenza della logistica",
    "hero.lead":"Logistica europea moderna — rotte trasparenti e consegne puntuali.",
    "btn.quote":"Richiedi Preventivo","btn.network":"La Nostra Rete","network.title":"La Nostra Rete — Mappa d'Europa",
    "network.lead":"Clicca su un punto luminoso per vedere i dettagli.","quote.title":"Richiedi un Preventivo","btn.send":"Invia"
  }
};

// i18n helper
function setLang(lang){
  document.querySelectorAll('[data-i18n]').forEach(el=>{
    const key = el.getAttribute('data-i18n');
    el.textContent = translations[lang]?.[key] ?? translations.en[key] ?? key;
  });
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active', b.dataset.lang===lang));
}
document.querySelectorAll('.lang-btn').forEach(b=>b.addEventListener('click', ()=> setLang(b.dataset.lang)));
setLang('en');

// Quote form: mailto fallback
document.getElementById('quoteForm').addEventListener('submit', (e)=>{
  e.preventDefault();
  const fd = new FormData(e.target);
  const obj = {};
  for (const [k,v] of fd.entries()) obj[k]=v;
  const body = encodeURIComponent(JSON.stringify(obj, null, 2));
  window.location.href = `mailto:info@danubria.com?subject=Quote request&body=${body}`;
});

// Leaflet map
const map = L.map('map', {minZoom:3, maxZoom:7, zoomControl:true}).setView([45.0, 7.0], 5);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19, attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// cities
const cities = [
  {id:'barcelona', name:'Barcelona', lat:41.3851, lon:2.1734, info:'Iberian operations & logistics'},
  {id:'madrid', name:'Madrid', lat:40.4168, lon:-3.7038, info:'Central distribution'},
  {id:'irun', name:'Irun', lat:43.3389, lon:-1.7906, info:'Border hub (Spain)'},
  {id:'valencia', name:'Valencia', lat:39.4699, lon:-0.3763, info:'Mediterranean port operations'},
  {id:'montpellier', name:'Montpellier', lat:43.6119, lon:3.8772, info:'Southern France partner'},
  {id:'marseille', name:'Marseille', lat:43.2965, lon:5.3698, info:'Port & Mediterranean gateway'},
  {id:'nice', name:'Nice', lat:43.7102, lon:7.2620, info:'Coastal logistics'},
  {id:'milano', name:'Milano', lat:45.4642, lon:9.1900, info:'Northern Italy hub'},
  {id:'novarra', name:'Novara', lat:45.4450, lon:8.6230, info:'Logistics in Piedmont'},
  {id:'venetia', name:'Venezia', lat:45.4408, lon:12.3155, info:'Venice port & logistics'},
  {id:'bologna', name:'Bologna', lat:44.4949, lon:11.3426, info:'Inland distribution Italy'}
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

// style injection for marker hover
const style = document.createElement('style');
style.textContent = `
.map-dot { transition: transform .18s ease; }
.map-dot:hover { transform: scale(1.25); box-shadow: 0 0 26px 10px rgba(10,132,255,0.28); }
.leaflet-container { background: linear-gradient(180deg,#f3fbff,#f8fdff); border-radius:10px }
`;
document.head.appendChild(style);
