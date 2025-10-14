import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        network: 'Our Network',
        quote: 'Get a Quote',
        contact: 'Contact'
      },
      hero: {
        title: 'The Flow of Europe',
        subtitle: 'The Power of Logistics',
        description: 'Connecting major European cities with reliable, professional transport solutions across the continent.',
        getQuote: 'Get a Quote',
        ourNetwork: 'Our Network'
      },
      map: {
        title: 'Interactive Network Map',
        subtitle: 'Explore our extensive logistics network across Europe',
        zoom: 'Zoom, rotate, and click on cities to discover our hubs'
      },
      network: {
        title: 'Our Network',
        subtitle: 'Strategic Hubs Across Europe',
        description: 'We operate from key logistics centers, ensuring efficient delivery across the continent.'
      },
      quote: {
        title: 'Request a Quote',
        subtitle: 'Get a customized logistics solution for your needs',
        origin: 'Origin',
        destination: 'Destination',
        transportType: 'Type of Transport',
        road: 'Road',
        reefer: 'Reefer',
        curtain: 'Curtain',
        box: 'Box',
        temperature: 'Temperature Control',
        yes: 'Yes',
        no: 'No',
        weight: 'Weight (tonnes)',
        dimensions: 'Dimensions',
        length: 'Length (m)',
        width: 'Width (m)',
        height: 'Height (m)',
        submit: 'Submit Request',
        success: 'Quote request submitted successfully!'
      },
      footer: {
        tagline: 'The flow of Europe, the power of logistics',
        company: 'Company',
        aboutUs: 'About Us',
        careers: 'Careers',
        services: 'Services',
        roadTransport: 'Road Transport',
        temperatureControlled: 'Temperature Controlled',
        contact: 'Contact',
        email: 'info@danubria.com',
        rights: '© 2025 Danubria. All rights reserved.'
      }
    }
  },
  it: {
    translation: {
      nav: {
        home: 'Home',
        network: 'La Nostra Rete',
        quote: 'Richiedi Preventivo',
        contact: 'Contatto'
      },
      hero: {
        title: 'Il Flusso dell\'Europa',
        subtitle: 'La Potenza della Logistica',
        description: 'Collegamento delle principali città europee con soluzioni di trasporto affidabili e professionali.',
        getQuote: 'Richiedi Preventivo',
        ourNetwork: 'La Nostra Rete'
      },
      map: {
        title: 'Mappa Interattiva della Rete',
        subtitle: 'Esplora la nostra vasta rete logistica in Europa',
        zoom: 'Zoom, ruota e clicca sulle città per scoprire i nostri hub'
      },
      network: {
        title: 'La Nostra Rete',
        subtitle: 'Hub Strategici in Tutta Europa',
        description: 'Operiamo da centri logistici chiave, garantendo consegne efficienti in tutto il continente.'
      },
      quote: {
        title: 'Richiedi un Preventivo',
        subtitle: 'Ottieni una soluzione logistica personalizzata',
        origin: 'Origine',
        destination: 'Destinazione',
        transportType: 'Tipo di Trasporto',
        road: 'Strada',
        reefer: 'Refrigerato',
        curtain: 'Centinato',
        box: 'Furgone',
        temperature: 'Controllo Temperatura',
        yes: 'Sì',
        no: 'No',
        weight: 'Peso (tonnellate)',
        dimensions: 'Dimensioni',
        length: 'Lunghezza (m)',
        width: 'Larghezza (m)',
        height: 'Altezza (m)',
        submit: 'Invia Richiesta',
        success: 'Richiesta di preventivo inviata con successo!'
      },
      footer: {
        tagline: 'Il flusso dell\'Europa, la potenza della logistica',
        company: 'Azienda',
        aboutUs: 'Chi Siamo',
        careers: 'Carriere',
        services: 'Servizi',
        roadTransport: 'Trasporto Su Strada',
        temperatureControlled: 'Controllo Temperatura',
        contact: 'Contatto',
        email: 'info@danubria.com',
        rights: '© 2025 Danubria. Tutti i diritti riservati.'
      }
    }
  },
  es: {
    translation: {
      nav: {
        home: 'Inicio',
        network: 'Nuestra Red',
        quote: 'Solicitar Cotización',
        contact: 'Contacto'
      },
      hero: {
        title: 'El Flujo de Europa',
        subtitle: 'El Poder de la Logística',
        description: 'Conectando las principales ciudades europeas con soluciones de transporte confiables y profesionales.',
        getQuote: 'Solicitar Cotización',
        ourNetwork: 'Nuestra Red'
      },
      map: {
        title: 'Mapa Interactivo de Red',
        subtitle: 'Explore nuestra extensa red logística en Europa',
        zoom: 'Ampliar, rotar y hacer clic en las ciudades para descubrir nuestros centros'
      },
      network: {
        title: 'Nuestra Red',
        subtitle: 'Centros Estratégicos en Toda Europa',
        description: 'Operamos desde centros logísticos clave, asegurando entregas eficientes en todo el continente.'
      },
      quote: {
        title: 'Solicitar Cotización',
        subtitle: 'Obtenga una solución logística personalizada',
        origin: 'Origen',
        destination: 'Destino',
        transportType: 'Tipo de Transporte',
        road: 'Carretera',
        reefer: 'Refrigerado',
        curtain: 'Lona',
        box: 'Caja',
        temperature: 'Control de Temperatura',
        yes: 'Sí',
        no: 'No',
        weight: 'Peso (toneladas)',
        dimensions: 'Dimensiones',
        length: 'Longitud (m)',
        width: 'Ancho (m)',
        height: 'Alto (m)',
        submit: 'Enviar Solicitud',
        success: '¡Solicitud de cotización enviada con éxito!'
      },
      footer: {
        tagline: 'El flujo de Europa, el poder de la logística',
        company: 'Empresa',
        aboutUs: 'Sobre Nosotros',
        careers: 'Carreras',
        services: 'Servicios',
        roadTransport: 'Transporte Por Carretera',
        temperatureControlled: 'Control de Temperatura',
        contact: 'Contacto',
        email: 'info@danubria.com',
        rights: '© 2025 Danubria. Todos los derechos reservados.'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
