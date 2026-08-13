export const homeCopy = {
    en: {
        nav: {
            products: 'Products',
            approach: 'Approach',
            contact: 'Contact',
            menu: 'Menu',
            label: 'Primary navigation',
            language: 'Language',
            home: 'Sebiche home',
        },
        hero: {
            eyebrow: 'Restaurant technology',
            start: 'Your restaurant,',
            accent: 'connected',
            end: 'end to end.',
            body: 'A family of products built from real operations to help independent restaurants go digital.',
            cta: 'Discuss your operation',
        },
        products: {
            title: 'Three products.',
            accent: 'One connected operation.',
            intro: 'Explore what each product solves, how it works and its real delivery status.',
            explore: 'Explore product',
        },
        approach: {
            start: 'Technology that understands',
            accent: 'how a restaurant works.',
            pillars: [
                { title: 'Less friction', body: 'Clearer workflows so your team can focus on service.' },
                { title: 'More control', body: 'Real-time visibility from the kitchen to the doorstep.' },
                { title: 'Decisions with context', body: 'Connected data that helps you act better every day.' },
            ],
            caption: 'The details shape the operation.',
        },
        closing: {
            start: 'Digitize your restaurant',
            end: 'without losing its',
            accent: 'soul.',
            cta: 'Start a conversation',
        },
        imageAlt: {
            hero: 'A chef finishing a dish on the restaurant pass',
            operations: 'A chef working the hot line during service',
        },
    },
    es: {
        nav: {
            products: 'Productos',
            approach: 'Enfoque',
            contact: 'Contacto',
            menu: 'Menú',
            label: 'Navegación principal',
            language: 'Idioma',
            home: 'Inicio de Sebiche',
        },
        hero: {
            eyebrow: 'Tecnología para restaurantes',
            start: 'Tu restaurante,',
            accent: 'conectado',
            end: 'de punta a punta.',
            body: 'Una familia de productos creada desde la operación real para digitalizar restaurantes independientes.',
            cta: 'Hablemos de tu operación',
        },
        products: {
            title: 'Tres productos.',
            accent: 'Una operación conectada.',
            intro: 'Explora qué resuelve cada producto, cómo funciona y cuál es su estado real.',
            explore: 'Explorar producto',
        },
        approach: {
            start: 'Tecnología que entiende',
            accent: 'cómo trabaja un restaurante.',
            pillars: [
                { title: 'Menos fricción', body: 'Flujos más claros para que tu equipo se enfoque en el servicio.' },
                { title: 'Más control', body: 'Visibilidad en tiempo real desde la cocina hasta la entrega.' },
                { title: 'Decisiones con contexto', body: 'Datos conectados que te ayudan a decidir mejor cada día.' },
            ],
            caption: 'El detalle hace la diferencia.',
        },
        closing: {
            start: 'Digitaliza tu restaurante',
            end: 'sin perder su',
            accent: 'esencia.',
            cta: 'Iniciar una conversación',
        },
        imageAlt: {
            hero: 'Un chef terminando un plato en el pase del restaurante',
            operations: 'Un chef trabajando en la línea durante el servicio',
        },
    },
} as const

export type HomeCopy = (typeof homeCopy)[keyof typeof homeCopy]
