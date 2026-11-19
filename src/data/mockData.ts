import { UserAccount, ServiceCategory, InternetLink, HardwareItem, NotificationItem } from '../types';

export const initialAccountData: UserAccount = {
  cgp: "1111111",
  companyName: "IPLAN NETWORKS OPERACIONES",
  cuit: "30702652975",
  billingAddress: "RECONQUISTA 885 5 - CABA",
  taxCondition: "Inscripto",
  balanceStatus: "al_dia",
  balanceAmount: 0,
  autoDebitCard: "XXXXXXXXXXXX2521",
  autoDebitType: "Tarjeta Visa Débito",
  primaryContact: {
    name: "GUIDO A GIOVANA",
    email: "sfandino@iplan.com.ar",
    phone: "1154850248"
  },
  dedicatedExecutive: {
    name: "Alejandro Gómez",
    email: "agomez@iplan.com.ar",
    phone: "+54 11 5031-8000 (Int. 4210)",
    role: "Account Executive Senior - Grandes Cuentas"
  }
};

export const serviceCategoriesData: ServiceCategory[] = [
  {
    id: "internet",
    title: "Internet",
    count: 23,
    badge: {
      label: "💡 Upgrade",
      type: "upgrade",
      color: "bg-[#E60067]"
    },
    iconName: "BarChart3",
    active: true,
    tagline: "Enlaces dedicados 100% simétricos por fibra óptica directa",
    description: "Tenés 23 enlaces activos en CABA, GBA, Córdoba y Rosario. Disponible oportunidad de duplicar ancho de banda con 35% de descuento.",
    modalOffer: {
      title: "OPORTUNIDAD UPGRADE: INTERNET CORPORATIVO",
      subtitle: "Aumentá la velocidad simétrica de tus sedes principales con descuento especial x 3 meses.",
      benefits: [
        "Duplicación de ancho de banda a 1 Gbps en Sede Central.",
        "SLA corporativo garantizado del 99.98% de disponibilidad.",
        "IP fijas adicionales /29 sin costo de alta de instalación.",
        "Monitoreo proactivo NOC 24/7 y prioridad en ruteo BGP."
      ],
      currentCost: "$ 385.000 /mes",
      discountedCost: "$ 270.000 /mes (Primeros 3 meses)",
      actionText: "VER PROPUESTA COMERCIAL"
    }
  },
  {
    id: "it",
    title: "IT",
    count: 5,
    badge: {
      label: "⚠️ Optimizar",
      type: "optimizar",
      color: "bg-[#F59E0B]"
    },
    iconName: "Settings",
    active: true,
    tagline: "Soluciones de networking, switches gestionados y seguridad perimetral",
    description: "5 equipos de red y firewalls administrados. Podés consolidar licenciamiento y sumar SD-WAN.",
    modalOffer: {
      title: "OPORTUNIDAD UPGRADE: IT & NETWORKING",
      subtitle: "Optimizá tu plan actual de IT con descuentos exclusivos por volumen.",
      benefits: [
        "Facturación unificada en pesos o USD oficial sin retenciones.",
        "Soporte técnico preferencial 24/7 con guardia de campo en menos de 2 hs.",
        "Implementación y migración asistida sin cargo por nuestros ingenieros.",
        "Dashboard centralizado de telemetría y seguridad en tiempo real."
      ],
      currentCost: "$ 210.000 /mes",
      discountedCost: "$ 165.000 /mes",
      actionText: "VER PROPUESTA COMERCIAL"
    }
  },
  {
    id: "telefonia",
    title: "Telefonía",
    count: 0,
    badge: {
      label: "🚀 Descubrir",
      type: "descubrir",
      color: "bg-[#2B75F6]"
    },
    iconName: "PhoneCall",
    active: false,
    tagline: "Central Virtual en la nube con internos móviles en celular y PC",
    description: "Aún no tenés el servicio de Central Virtual activo. Llevá tu negocio a la nube y profesionalizá la atención telefónica.",
    modalOffer: {
      title: "LANZAMIENTO: CENTRAL VIRTUAL CLOUD",
      subtitle: "Transformá la comunicación de tu empresa sin comprar servidores físicos.",
      benefits: [
        "Internos en smartphones (App Android / iOS) y computadoras con Softphone WebRTC.",
        "Mensaje de bienvenida IVR inteligente con selección de áreas y música en espera.",
        "Llamadas ilimitadas a líneas fijas y tarifas corporativas a celulares.",
        "0800 rotativo nacional y numeración geográfica en todo el país."
      ],
      currentCost: "$ 4.500 por interno",
      discountedCost: "$ 3.150 /mes por interno (Promo Lanzamiento)",
      actionText: "CONFIGURAR MI CENTRAL VIRTUAL"
    }
  },
  {
    id: "infraestructura",
    title: "Infraestructura",
    count: 7,
    badge: {
      label: "☁️ Cloud Backup",
      type: "cloud",
      color: "bg-[#D97706]"
    },
    iconName: "Server",
    active: true,
    tagline: "Servidores virtuales VPS, Housing en Data Center TIER III y Cloud Backup",
    description: "7 instancias activas en Data Center IPLAN Barracas y Almagro.",
    modalOffer: {
      title: "POTENCIÁ TU INFRAESTRUCTURA CLOUD",
      subtitle: "Migrá cargas de trabajo críticas a nuestra nube local con ultra baja latencia.",
      benefits: [
        "Data Centers certificados TIER III en Argentina con conectividad directa de 100 Gbps.",
        "Backup inmutable anti-ransomware con retención automatizada de 30 días.",
        "Escalabilidad instantánea de vCPU y RAM sin cortes de servicio.",
        "Soporte local en español y pago en moneda nacional al tipo de cambio oficial."
      ],
      currentCost: "$ 590.000 /mes",
      discountedCost: "$ 480.000 /mes",
      actionText: "VER PROPUESTA COMERCIAL"
    }
  },
  {
    id: "colaboracion",
    title: "Colaboración",
    count: 1,
    badge: {
      label: "+ Sumar IA",
      type: "ia",
      color: "bg-[#E60067]"
    },
    iconName: "Users",
    active: true,
    tagline: "Google Workspace & Microsoft 365 con Gemini AI y Microsoft Copilot",
    description: "Tenés 1 suscripción activa de Google Workspace. Agregá licencias adicionales o sumá Gemini AI.",
    modalOffer: {
      title: "COLABORACIÓN + INTELIGENCIA ARTIFICIAL",
      subtitle: "Integrá Gemini AI o Microsoft Copilot a tus herramientas de trabajo diarias.",
      benefits: [
        "Asistente generativo directo en Gmail, Google Docs, Meet o Microsoft Teams/Word.",
        "Capacitación de onboarding en vivo para tu equipo sin cargo extra.",
        "Consolidación de factura en un solo pago mensual junto a tu enlace de Internet.",
        "Transferencia de token en 3 simples pasos sin pérdida de datos ni configuraciones."
      ],
      currentCost: "USD 12 /usuario",
      discountedCost: "USD 8.50 /usuario x 6 meses",
      actionText: "EXPANDIR LICENCIAS Y SUMAR IA"
    }
  }
];

export const internetLinksData: InternetLink[] = [
  {
    id: "lnk-101",
    name: "Sede Central Corporativa - Enlace Principal",
    address: "RECONQUISTA 885 5° - CABA",
    currentSpeed: 300,
    sla: "99.98%",
    ipRange: "181.30.128.40/29 (5 IPs Usables)",
    status: "online",
    ping: 3,
    utilizationPeak: 84,
    serviceType: "Fibra Óptica Dedicada Punto a Punto"
  },
  {
    id: "lnk-102",
    name: "Data Center IPLAN Barracas - Interconexión",
    address: "ISABEL LA CATÓLICA 1250 - CABA",
    currentSpeed: 1000,
    sla: "99.99%",
    ipRange: "181.30.144.16/28 (13 IPs Usables)",
    status: "online",
    ping: 2,
    utilizationPeak: 62,
    serviceType: "Fibra Óptica Dedicada Punto a Punto"
  },
  {
    id: "lnk-103",
    name: "Sucursal Córdoba Centro",
    address: "AV. COLÓN 450 - CÓRDOBA",
    currentSpeed: 200,
    sla: "99.95%",
    ipRange: "190.220.10.88/30 (1 IP Usable)",
    status: "online",
    ping: 11,
    utilizationPeak: 79,
    serviceType: "Fibra Óptica Dedicada Punto a Punto"
  },
  {
    id: "lnk-104",
    name: "Sucursal Rosario Puerto Norte",
    address: "AV. DE LA COSTA 2400 - ROSARIO",
    currentSpeed: 200,
    sla: "99.95%",
    ipRange: "190.220.45.12/30 (1 IP Usable)",
    status: "online",
    ping: 9,
    utilizationPeak: 48,
    serviceType: "Fibra Óptica Dedicada Punto a Punto"
  }
];

export const hardwareCatalogData: HardwareItem[] = [
  {
    id: "softphone-free",
    name: "Softphone Móvil & Web (Sin Hardware Físico)",
    brand: "IPLAN Cloud Communicator",
    model: "WebRTC & Mobile iOS/Android",
    description: "Utilizá tus computadoras portátiles y teléfonos celulares corporativos sin comprar aparatos.",
    pricePerMonth: 0,
    priceOneTime: 0,
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&auto=format&fit=crop&q=80",
    category: "softphone",
    features: ["Audio HD Opus", "App iOS & Android", "WebRTC en navegador", "Sin costo de equipamiento"]
  },
  {
    id: "yealink-t31p",
    name: "Teléfono IP Yealink T31P",
    brand: "Yealink",
    model: "SIP-T31P 2 Líneas",
    description: "Teléfono IP clásico empresarial de alto rendimiento con pantalla gráfica LCD retroiluminada de 2.3 pulgadas.",
    pricePerMonth: 2800,
    priceOneTime: 42000,
    image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&auto=format&fit=crop&q=80",
    category: "phone",
    features: ["2 Cuentas SIP", "Audio HD", "PoE Integrado", "Teclas rápidas de interno"]
  },
  {
    id: "grandstream-gxp2170",
    name: "Teléfono IP Ejecutivo Grandstream GXP2170",
    brand: "Grandstream",
    model: "GXP2170 Pantalla Color",
    description: "Equipo de nivel ejecutivo con pantalla color TFT de 4.3\", 12 teclas de línea y Bluetooth integrado.",
    pricePerMonth: 4900,
    priceOneTime: 79000,
    image: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=400&auto=format&fit=crop&q=80",
    category: "phone",
    features: ["Pantalla Color 4.3\"", "12 Líneas / Cuentas SIP", "Bluetooth & Gigabit", "48 Teclas virtuales BLF"]
  },
  {
    id: "jabra-evolve-20",
    name: "Auricular Profesional Jabra Evolve 20 USB",
    brand: "Jabra",
    model: "Evolve 20 Stereo",
    description: "Auricular ergonómico con cancelación de ruido pasiva y control de llamadas integrado para PC y softphone.",
    pricePerMonth: 1900,
    priceOneTime: 32000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&auto=format&fit=crop&q=80",
    category: "headset",
    features: ["Cancelación de Ruido", "Conexión USB Plug & Play", "Control en el cable", "Almohadillas de cuero sintético"]
  }
];

export const initialNotificationsData: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Lanzamiento Asistencia IA PatricIA",
    tag: "HOY",
    tagType: "new",
    date: "24 de Agosto, 2026",
    description: "Ya está activo nuestro nuevo agente interactivo para resolver consultas operativas en segundos desde tu dashboard.",
    read: false,
    actionUrl: "patricia",
    actionLabel: "Chatear con PatricIA"
  },
  {
    id: "notif-2",
    title: "Descuento 3 Meses en Enlaces Dedicados",
    tag: "PROMO",
    tagType: "promo",
    date: "22 de Agosto, 2026",
    description: "Upgrade tu velocidad de 300 Mbps a 1 Gbps con tarifa promocional fija x 90 días.",
    read: false,
    actionUrl: "upgrade_internet",
    actionLabel: "Ver Oferta de Upgrade"
  },
  {
    id: "notif-3",
    title: "Mantenimiento Programado de Fibra Óptica",
    tag: "PROGRAMADO",
    tagType: "maint",
    date: "Próximo Domingo 02:00 a 04:00 AM",
    description: "Optimización preventiva del anillo troncal en Microcentro CABA. No se prevé corte de tráfico gracias a nuestra redundancia automática BGP.",
    read: true
  },
  {
    id: "notif-4",
    title: "Nueva integración Microsoft Copilot & Google Gemini",
    tag: "NOVEDAD",
    tagType: "update",
    date: "15 de Agosto, 2026",
    description: "Adquirí licencias de Inteligencia Artificial para tu empresa con facturación unificada en pesos.",
    read: true,
    actionUrl: "colaboracion",
    actionLabel: "Sumar IA"
  }
];

export const quickFaqAnswers: Record<string, string> = {
  upgrade: "🚀 ¡Con gusto! Para solicitar un upgrade de velocidad en tu enlace de fibra óptica, podés ingresar a la pestaña **Mis Servicios > Upgrade de Internet Corporativo** o decirme qué velocidad necesitás (ej. 500 Mbps o 1 Gbps). En este momento tenés una bonificación del 35% de descuento por 3 meses.",
  saldo: "📄 Tu saldo con IPLAN se encuentra **Al día** al 100%. No tenés facturas vencidas. Tu próximo vencimiento operará a través de débito automático en tu tarjeta Visa Débito registrada (terminada en 2521).",
  central: "📞 Nuestra **Central Virtual IPLAN** incluye internos móviles en smartphones, softphone para PC, menú de bienvenida IVR inteligente y grabación de llamadas. Podés configurarla desde el módulo **Mis Servicios > 3. Telefonía Corporativa** con planes desde 2 a 50 internos.",
  ivr: "⚙️ Podés configurar el árbol de atención de tu IVR (ej: 'Marque 1 para Ventas, 2 para Soporte') asignando cada opción a grupos de internos o derivaciones a celulares directos.",
  soporte: "🛠️ Para emergencias técnicas de conectividad, nuestro NOC (Network Operations Center) está disponible 24/7 al 0800-345-IPLAN o podés abrir un ticket prioritario desde la sección **Gestión de Tickets**.",
  token: "🔑 El **Transfer Token** de Google Workspace o Microsoft es una clave alfanumérica que generás en tu consola de administración para transferir la gestión de facturación a IPLAN con descuentos por volumen sin interrumpir tus correos ni Drive."
};
