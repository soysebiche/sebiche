import type { Language } from '../lib/language'

export const productSlugs = ['restos', 'tiptrack', '86mise'] as const

export type ProductSlug = (typeof productSlugs)[number]

type LocalizedProduct = {
    eyebrow: string
    headline: string
    intro: string
    problemTitle: string
    problem: string
    audienceTitle: string
    audience: string
    workflowTitle: string
    workflowIntro: string
    workflow: Array<{ title: string; body: string }>
    capabilitiesTitle: string
    capabilities: Array<{ title: string; body: string }>
    integrationsTitle: string
    integrations: string[]
    requirementsTitle: string
    requirements: string[]
    statusLabel: string
    statusTitle: string
    statusBody: string
    evidenceLabel: string
    evidenceBody: string
    cta: string
    closingHeadline: string
    imageAlt: string
}

export type Product = {
    slug: ProductSlug
    name: string
    number: string
    image: string
    accent: 'copper' | 'violet' | 'orange'
    icon: string
    proofMetric: string
    scenes?: Array<{
        image: string
        en: { title: string; body: string; alt: string }
        es: { title: string; body: string; alt: string }
    }>
    en: LocalizedProduct
    es: LocalizedProduct
}

export const products: Record<ProductSlug, Product> = {
    restos: {
        slug: 'restos',
        name: 'RestOS',
        number: '01',
        image: '/holding/restos.png',
        accent: 'copper',
        icon: 'OS',
        // Product fact, not a result. Replace with a measured pilot figure once one exists.
        proofMetric: '4',
        en: {
            eyebrow: 'Orders · POS · Kitchen · Payments',
            headline: 'Every order on one screen, from the counter to close.',
            intro: 'RestOS puts counter, phone, pickup and delivery orders on one iPad, sends each ticket to the right station once and closes out your night.',
            problemTitle: 'The problem',
            problem: 'Orders come in from the counter, the phone, your website and delivery apps, each on its own screen. Someone types them again, the line misses a modifier, and you spend close chasing numbers that never match.',
            audienceTitle: 'Built for',
            audience: 'Independent restaurants taking counter, phone, pickup and delivery orders that want one way to run service, without an enterprise POS rollout.',
            workflowTitle: 'How an order moves',
            workflowIntro: 'From the moment you ring it in to the moment you close the drawer.',
            workflow: [
                { title: 'Ring in', body: 'Take counter, phone, pickup and delivery orders, or punch in one that arrived through a delivery app.' },
                { title: 'Check', body: 'Prices, modifiers and 86’d items come from your current menu, so the total is right before it fires.' },
                { title: 'Fire', body: 'Only confirmed orders reach the line, and each ticket lands at the right station once.' },
                { title: 'Close', body: 'Take payment, keep the receipt and get your end-of-day numbers ready.' },
            ],
            capabilitiesTitle: 'What it does today',
            capabilities: [
                { title: 'iPad POS with staff sign-in', body: 'Each station and each employee signs in, and the screen shows only what you need to take the order.' },
                { title: 'One menu for every station', body: 'Prices, modifiers and availability live in one place, so the counter and the phone sell the same menu.' },
                { title: 'Tickets that fire once', body: 'Built so a confirmed order reaches the kitchen one time, without duplicate tickets.' },
                { title: 'From open to close', body: 'Order status, cash and the day close stay straight, even when someone taps twice.' },
            ],
            integrationsTitle: 'What it connects to',
            integrations: ['Card payments through Stripe, in test mode during the pilot', 'Your menu and orders stored in the cloud', 'Delivery orders handed to TipTrack, if you use it'],
            requirementsTitle: 'What the pilot needs',
            requirements: ['An iPad with RestOS installed from Safari', 'Your stations and staff set up in the app', 'A check of your Wi-Fi and kitchen ticket routing before the first service'],
            statusLabel: 'Where it stands',
            statusTitle: 'Private pilot · by invitation',
            statusBody: 'RestOS already works end to end on our test station. Before it runs a real service, we still have to connect the live menu, the full order flow and the stations in your kitchen. We don’t sell it as a general POS yet.',
            evidenceLabel: 'ways an order comes in — counter, phone, pickup and delivery — on one screen',
            evidenceBody: 'In a private pilot. We’ll share real service numbers once a kitchen confirms them.',
            cta: 'Talk to us about a RestOS pilot',
            closingHeadline: 'Want to stop ringing in every order twice?',
            imageAlt: 'RestOS order entry screen on the point of sale',
        },
        es: {
            eyebrow: 'Pedidos · POS · Cocina · Pagos',
            headline: 'Todos tus pedidos en una pantalla, del mostrador al cierre.',
            intro: 'RestOS junta pedidos de mostrador, teléfono, pickup y delivery en un iPad, manda cada comanda una vez a la estación correcta y te deja listo el cierre.',
            problemTitle: 'El problema',
            problem: 'Los pedidos llegan por el mostrador, el teléfono, tu web y las apps de delivery, cada uno en su pantalla. Alguien los vuelve a escribir, a la línea se le pasa un modificador y al cierre persigues números que nunca cuadran.',
            audienceTitle: 'Hecho para',
            audience: 'Restaurantes independientes con pedidos de mostrador, teléfono, pickup y delivery que quieren una sola forma de dar servicio, sin implementar un POS corporativo.',
            workflowTitle: 'Cómo se mueve un pedido',
            workflowIntro: 'Desde que lo marcas hasta que cierras la caja.',
            workflow: [
                { title: 'Marcar', body: 'Toma pedidos de mostrador, teléfono, pickup y delivery, o captura uno que llegó por una app de reparto.' },
                { title: 'Revisar', body: 'Precios, modificadores y platos en 86 salen de tu menú vigente, así el total es correcto antes de mandarlo.' },
                { title: 'Marchar', body: 'Solo los pedidos confirmados llegan a la línea, y cada comanda cae una sola vez en la estación correcta.' },
                { title: 'Cerrar', body: 'Cobra, guarda el recibo y deja listos los números del día.' },
            ],
            capabilitiesTitle: 'Lo que hace hoy',
            capabilities: [
                { title: 'POS en iPad con acceso por empleado', body: 'Cada estación y cada empleado entra con su acceso, y la pantalla muestra solo lo que necesitas para tomar el pedido.' },
                { title: 'Un menú para todas las estaciones', body: 'Precios, modificadores y disponibilidad viven en un solo lugar, así el mostrador y el teléfono venden el mismo menú.' },
                { title: 'Comandas que salen una vez', body: 'Pensado para que un pedido confirmado llegue a cocina una sola vez, sin comandas duplicadas.' },
                { title: 'De la apertura al cierre', body: 'El estado de cada pedido, el efectivo y el cierre del día cuadran, aunque alguien toque dos veces.' },
            ],
            integrationsTitle: 'Con qué se conecta',
            integrations: ['Pagos con tarjeta por Stripe, en modo prueba durante el piloto', 'Tu menú y tus pedidos guardados en la nube', 'Pedidos de reparto enviados a TipTrack, si lo usas'],
            requirementsTitle: 'Qué necesita el piloto',
            requirements: ['Un iPad con RestOS instalado desde Safari', 'Tus estaciones y tu personal dados de alta en la app', 'Una revisión de tu Wi-Fi y de cómo llegan las comandas a cocina antes del primer servicio'],
            statusLabel: 'En qué punto está',
            statusTitle: 'Piloto privado · por invitación',
            statusBody: 'RestOS ya funciona de punta a punta en nuestra estación de prueba. Antes de llevarlo a un servicio real falta conectar el menú en vivo, el flujo completo de pedidos y las estaciones de tu cocina. Todavía no lo vendemos como POS general.',
            evidenceLabel: 'formas de recibir pedidos — mostrador, teléfono, pickup y delivery — en una sola pantalla',
            evidenceBody: 'En piloto privado. Compartiremos números de servicio reales cuando una cocina los confirme.',
            cta: 'Hablemos de un piloto de RestOS',
            closingHeadline: '¿Quieres dejar de marcar cada pedido dos veces?',
            imageAlt: 'Pantalla de captura de pedidos del punto de venta RestOS',
        },
    },
    tiptrack: {
        slug: 'tiptrack',
        name: 'TipTrack',
        number: '02',
        image: '/holding/tiptrack.png',
        accent: 'violet',
        icon: '↗',
        // Product fact, not a result. Replace with a measured figure from live shifts once one exists.
        proofMetric: '2',
        en: {
            eyebrow: 'Delivery · Routes · Tips · Oversight',
            headline: 'Every delivery in sight, from the door to the cash count.',
            intro: 'TipTrack gives your drivers a simple app for every run and gives you the history, cash and tips you need to run the shift.',
            problemTitle: 'The problem',
            problem: 'Your own delivery lives on paper tickets, a maps app, cash notes and memory. Drivers lose track, and at the end of the night nobody can say what happened without sitting down to reconcile.',
            audienceTitle: 'Built for',
            audience: 'Restaurants with their own drivers that need a clean record of routes, cash, tips and customers, without paying for a fleet platform.',
            workflowTitle: 'How a delivery runs',
            workflowIntro: 'Your driver taps a few times. You keep the full record.',
            workflow: [
                { title: 'Start', body: 'Enter the order, the address and whether it’s paid, and snap the ticket if you want.' },
                { title: 'Go', body: 'Check the address, see the route and open it in Apple Maps.' },
                { title: 'Keep going', body: 'If the phone loses signal or the app closes, the delivery and any pending changes are still there.' },
                { title: 'Settle', body: 'Close out cash, tip and rating. History and the day’s totals update on their own.' },
            ],
            capabilitiesTitle: 'What it does today',
            capabilities: [
                { title: 'Driver app', body: 'Start, edit, pick back up, cancel or finish a delivery, the same way every time.' },
                { title: 'Works without signal', body: 'Deliveries and ticket photos wait on the phone and send when the connection comes back, with a retry button.' },
                { title: 'Route at a glance', body: 'Address search, route preview, arrival time and one tap to Apple Maps.' },
                { title: 'Shift view', body: 'Delivery history, repeat customers, the day’s cash count, maps and delivery numbers.' },
            ],
            integrationsTitle: 'What it connects to',
            integrations: ['Driver sign-in and live updates across your team', 'Apple Maps for search and directions', 'Ticket photos read on the phone, with optional server help for hard-to-read tickets'],
            requirementsTitle: 'What you need',
            requirements: ['An iPhone on iOS 17 or later for the native app, or any up-to-date browser', 'A TipTrack account for your restaurant', 'Location and camera access, only if you use those features'],
            statusLabel: 'Where it stands',
            statusTitle: 'Web app in service · iPhone app in testing',
            statusBody: 'The web app is live and runs on production data. The native iPhone app already handles the core delivery flow and is being tested on real phones. Push notifications and reading photos from a wider range of real tickets are still in progress.',
            evidenceLabel: 'ways to run it: the web app in service today and a native iPhone app in testing',
            evidenceBody: 'We’ll publish numbers from real shifts once restaurants using it confirm them.',
            cta: 'See if TipTrack fits your team',
            closingHeadline: 'Close the night knowing where every dollar went.',
            imageAlt: 'TipTrack sign-in screen',
        },
        es: {
            eyebrow: 'Reparto · Rutas · Propinas · Supervisión',
            headline: 'Cada entrega a la vista, desde que sale hasta el corte.',
            intro: 'TipTrack le da a tus repartidores una app sencilla para cada entrega y a ti el historial, el efectivo y las propinas que necesitas para llevar el turno.',
            problemTitle: 'El problema',
            problem: 'Tu reparto propio vive entre tickets de papel, una app de mapas, notas de efectivo y memoria. El repartidor pierde el hilo y al final de la noche nadie sabe qué pasó sin sentarse a cuadrar.',
            audienceTitle: 'Hecho para',
            audience: 'Restaurantes con repartidores propios que necesitan un registro claro de rutas, efectivo, propinas y clientes, sin pagar una plataforma de flotillas.',
            workflowTitle: 'Cómo va una entrega',
            workflowIntro: 'Tu repartidor toca un par de veces. Tú te quedas con el registro completo.',
            workflow: [
                { title: 'Salir', body: 'Captura el pedido, la dirección y si ya está pagado, y toma foto del ticket si quieres.' },
                { title: 'Llegar', body: 'Revisa la dirección, mira la ruta y ábrela en Apple Maps.' },
                { title: 'Seguir', body: 'Si el teléfono pierde señal o la app se cierra, la entrega y los cambios pendientes siguen ahí.' },
                { title: 'Liquidar', body: 'Cierra efectivo, propina y calificación. El historial y el corte del día se actualizan solos.' },
            ],
            capabilitiesTitle: 'Lo que hace hoy',
            capabilities: [
                { title: 'App del repartidor', body: 'Inicia, edita, retoma, cancela o termina una entrega, siempre de la misma forma.' },
                { title: 'Funciona sin señal', body: 'Las entregas y las fotos de tickets esperan en el teléfono y se envían cuando vuelve la conexión, con botón para reintentar.' },
                { title: 'La ruta de un vistazo', body: 'Búsqueda de direcciones, vista previa de la ruta, hora de llegada y un toque para abrir Apple Maps.' },
                { title: 'Vista del turno', body: 'Historial de entregas, clientes frecuentes, el corte del día, mapas y números de reparto.' },
            ],
            integrationsTitle: 'Con qué se conecta',
            integrations: ['Acceso de repartidores y actualizaciones en vivo para todo tu equipo', 'Apple Maps para buscar direcciones y llegar', 'Fotos de tickets leídas en el teléfono, con ayuda opcional del servidor para los difíciles de leer'],
            requirementsTitle: 'Qué necesitas',
            requirements: ['Un iPhone con iOS 17 o posterior para la app nativa, o cualquier navegador actualizado', 'Una cuenta de TipTrack para tu restaurante', 'Acceso a ubicación y cámara, solo si usas esas funciones'],
            statusLabel: 'En qué punto está',
            statusTitle: 'App web en servicio · app de iPhone en pruebas',
            statusBody: 'La app web está en uso y trabaja con datos reales. La app nativa de iPhone ya cubre el flujo principal de reparto y la estamos probando en teléfonos reales. Las notificaciones push y la lectura de fotos de más tipos de tickets reales siguen en desarrollo.',
            evidenceLabel: 'formas de usarlo: la app web en servicio hoy y una app nativa de iPhone en pruebas',
            evidenceBody: 'Publicaremos números de turnos reales cuando los restaurantes que lo usan los confirmen.',
            cta: 'Mira si TipTrack le sirve a tu equipo',
            closingHeadline: 'Cierra la noche sabiendo a dónde fue cada dólar.',
            imageAlt: 'Pantalla de acceso de TipTrack',
        },
    },
    '86mise': {
        slug: '86mise',
        name: '86MISE',
        number: '03',
        image: '/holding/86mise.png',
        accent: 'orange',
        icon: '▤',
        // Product fact, not a result. Replace with a measured figure (waste, count time) once an operator confirms one.
        proofMetric: '7',
        scenes: [
            {
                image: '/holding/86mise-inventory.png',
                en: {
                    title: 'Count what’s actually on the shelf',
                    body: 'A quick count shows what you have and how long it has left, so you know what to use first.',
                    alt: '86MISE inventory count showing TCS expiry alerts and editable on-hand quantities',
                },
                es: {
                    title: 'Cuenta lo que de verdad hay',
                    body: 'Un conteo rápido te muestra qué tienes y cuánto le queda, para saber qué usar primero.',
                    alt: 'Conteo de inventario de 86MISE con alertas TCS y existencias editables',
                },
            },
            {
                image: '/holding/86mise-purchasing.png',
                en: {
                    title: 'Turn what you need into an order',
                    body: 'Supplier, amount and approval stay together from the draft to the delivery at your back door.',
                    alt: '86MISE purchase order list showing suppliers, totals and approval states',
                },
                es: {
                    title: 'Convierte lo que falta en un pedido',
                    body: 'Proveedor, importe y aprobación van juntos desde el borrador hasta que llega la mercancía.',
                    alt: 'Lista de órdenes de compra de 86MISE con proveedores, totales y estados de aprobación',
                },
            },
        ],
        en: {
            eyebrow: 'Inventory · Purchasing · Forecasting',
            headline: 'Know what’s on the shelf, what’s about to turn and what to order next.',
            intro: '86MISE ties recipes, counts, suppliers and purchase orders together, so you catch low stock and expiring prep before they hit service.',
            problemTitle: 'The problem',
            problem: 'Inventory waits until a count, an 86 or an invoice forces it. Recipe costs, shelf life, suppliers and what you expect to sell live in separate spreadsheets or in one person’s head.',
            audienceTitle: 'Built for',
            audience: 'Independent kitchens that want real inventory control, food-safety dates in view and help deciding what to order, without a months-long setup.',
            workflowTitle: 'From the count to the order',
            workflowIntro: 'Start with what can hurt today’s service. End with an order you can approve.',
            workflow: [
                { title: 'Spot', body: 'Open on what can change today’s service: low stock, prep about to expire, an order waiting on you.' },
                { title: 'Count', body: 'Confirm what’s on the shelf from a tablet while you walk the walk-in.' },
                { title: 'Decide', body: 'Weigh shelf life, what your recipes need and what you expect to sell before you spend.' },
                { title: 'Order', body: 'Turn it into a purchase order you can review, approve and check in when it arrives.' },
            ],
            capabilitiesTitle: 'What it does today',
            capabilities: [
                { title: 'Inventory and TCS dates', body: 'Counts, low-stock flags and alerts on the Texas seven-day shelf-life rule.' },
                { title: 'Recipe costs', body: 'Ingredients linked to recipes, with food cost calculated for you.' },
                { title: 'Suppliers and orders', body: 'Your suppliers and purchase orders, with clear limits on who can approve what.' },
                { title: 'Demand forecast', body: 'A starting forecast you can correct. Demo numbers are always labeled as demo.' },
            ],
            integrationsTitle: 'What it connects to',
            integrations: ['Sign-in and roles for each restaurant and location', 'Your inventory data kept separate for each restaurant', 'Square stays off until it’s tested with real orders'],
            requirementsTitle: 'What the beta needs',
            requirements: ['An up-to-date browser on a computer or tablet', 'Your restaurant and locations set up', 'Your first ingredients, recipes and suppliers loaded'],
            statusLabel: 'Where it stands',
            statusTitle: 'Limited beta · by invitation',
            statusBody: 'The inventory and purchasing beta is online and passed its technical pilot. It isn’t open to everyone yet, Square isn’t connected to real orders, and we’re still waiting for a kitchen team to sign off after using it in service.',
            evidenceLabel: 'days: the Texas shelf-life window 86MISE tracks on every TCS item you prep',
            evidenceBody: 'In a limited beta. We’ll share waste and count-time numbers once a kitchen confirms them in service.',
            cta: 'Ask about the 86MISE beta',
            closingHeadline: 'Stop finding out about an 86 in the middle of service.',
            imageAlt: '86MISE dashboard showing what’s expiring, what’s running low and which orders are waiting',
        },
        es: {
            eyebrow: 'Inventario · Compras · Pronóstico',
            headline: 'Ten claro qué hay en tu cámara, qué está por vencer y qué pedir después.',
            intro: '86MISE une recetas, conteos, proveedores y órdenes de compra para que detectes faltantes y preparaciones por vencer antes de que lleguen al servicio.',
            problemTitle: 'El problema',
            problem: 'El inventario espera hasta que un conteo, un 86 o una factura lo obliga. El costo de cada receta, la vida útil, los proveedores y lo que esperas vender viven en hojas sueltas o en la cabeza de una sola persona.',
            audienceTitle: 'Hecho para',
            audience: 'Cocinas independientes que quieren control real del inventario, fechas sanitarias a la vista y ayuda para decidir qué pedir, sin meses de implementación.',
            workflowTitle: 'Del conteo al pedido',
            workflowIntro: 'Empieza por lo que puede afectar el servicio de hoy. Termina con un pedido que puedes aprobar.',
            workflow: [
                { title: 'Detectar', body: 'Abre con lo que puede cambiar el servicio de hoy: algo que se acaba, una preparación por vencer, un pedido que espera tu visto bueno.' },
                { title: 'Contar', body: 'Confirma lo que hay en el estante desde una tablet mientras recorres la cámara.' },
                { title: 'Decidir', body: 'Considera vida útil, lo que piden tus recetas y lo que esperas vender antes de gastar.' },
                { title: 'Pedir', body: 'Conviértelo en una orden de compra que puedes revisar, aprobar y recibir cuando llegue.' },
            ],
            capabilitiesTitle: 'Lo que hace hoy',
            capabilities: [
                { title: 'Inventario y fechas TCS', body: 'Conteos, avisos de stock bajo y alertas por la regla de siete días de Texas.' },
                { title: 'Costo de recetas', body: 'Ingredientes ligados a cada receta, con el food cost calculado por ti.' },
                { title: 'Proveedores y pedidos', body: 'Tus proveedores y órdenes de compra, con límites claros de quién aprueba qué.' },
                { title: 'Pronóstico de demanda', body: 'Un pronóstico inicial que puedes corregir. Los números de demo siempre dicen que son demo.' },
            ],
            integrationsTitle: 'Con qué se conecta',
            integrations: ['Acceso y roles para cada restaurante y local', 'Los datos de inventario de cada restaurante, por separado', 'Square sigue apagado hasta probarlo con pedidos reales'],
            requirementsTitle: 'Qué necesita la beta',
            requirements: ['Un navegador actualizado en computadora o tablet', 'Tu restaurante y tus locales dados de alta', 'Tus primeros ingredientes, recetas y proveedores cargados'],
            statusLabel: 'En qué punto está',
            statusTitle: 'Beta limitada · por invitación',
            statusBody: 'La beta de inventario y compras está en línea y pasó su piloto técnico. Todavía no está abierta a todos, Square no está conectado a pedidos reales y nos falta que un equipo de cocina la apruebe después de usarla en servicio.',
            evidenceLabel: 'días: la ventana de vida útil de Texas que 86MISE vigila en cada preparación TCS',
            evidenceBody: 'En beta limitada. Compartiremos números de merma y tiempo de conteo cuando una cocina los confirme en servicio.',
            cta: 'Pregunta por la beta de 86MISE',
            closingHeadline: 'Que no te enteres de un 86 a mitad del servicio.',
            imageAlt: 'Dashboard de 86MISE con lo que está por vencer, lo que se acaba y los pedidos pendientes',
        },
    },
}

export function isProductSlug(value: string): value is ProductSlug {
    return productSlugs.includes(value as ProductSlug)
}

export function getProductCopy(product: Product, language: Language) {
    return product[language]
}
