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
        proofMetric: '96',
        en: {
            eyebrow: 'Orders · POS · Kitchen · Payments',
            headline: 'One operational thread from order entry to day close.',
            intro: 'RestOS is the internal restaurant operating layer for taking orders, applying catalog rules, routing confirmed work and closing service with fewer disconnected tools.',
            problemTitle: 'The problem',
            problem: 'Counter, phone, online and delivery orders often enter through different systems. Staff retypes information, kitchen context gets lost and managers reconcile the gaps at the end of the day.',
            audienceTitle: 'Designed for',
            audience: 'Independent restaurants that handle counter, phone, pickup and delivery orders and need one controlled workflow without enterprise complexity.',
            workflowTitle: 'The operational flow',
            workflowIntro: 'A narrow path that keeps authority and context attached to every order.',
            workflow: [
                { title: 'Capture', body: 'Enter counter, phone, pickup, delivery or manually received partner orders.' },
                { title: 'Validate', body: 'Apply the active catalog, configuration, availability and server-authoritative totals.' },
                { title: 'Route', body: 'Send only confirmed work to the correct kitchen preparation path.' },
                { title: 'Close', body: 'Tender safely, preserve the receipt and prepare the operational day close.' },
            ],
            capabilitiesTitle: 'Current product surface',
            capabilities: [
                { title: 'Protected iPad POS', body: 'Station and employee access with a focused touch-first ordering surface.' },
                { title: 'Catalog authority', body: 'Versioned menu, configuration, availability and pricing contracts.' },
                { title: 'Kitchen readiness', body: 'Ticket and KDS contracts designed to receive confirmed work once.' },
                { title: 'Order lifecycle', body: 'Idempotent order transitions, cash handling and day-close foundations.' },
            ],
            integrationsTitle: 'Integration boundary',
            integrations: ['Supabase pilot data layer', 'Stripe test-mode payment contracts', 'Optional TipTrack delivery handoff'],
            requirementsTitle: 'Pilot requirements',
            requirements: ['Safari-installed iPad PWA', 'Enrolled station and staff access', 'Network and kitchen routing validation before activation'],
            statusLabel: 'Real product status',
            statusTitle: 'Private pilot · controlled activation',
            statusBody: 'The local vertical slice and security contracts are accepted. Remote catalog, order lifecycle and physical-station activation remain gated; RestOS is not presented as a generally available POS.',
            evidenceLabel: 'focused test scripts passing locally',
            evidenceBody: 'The current project status records green lint, production build and 96 focused test scripts across its operational contracts.',
            cta: 'Discuss a RestOS pilot',
            imageAlt: 'RestOS internal point-of-sale order entry screen',
        },
        es: {
            eyebrow: 'Pedidos · POS · Cocina · Pagos',
            headline: 'Un solo hilo operativo desde la captura hasta el cierre.',
            intro: 'RestOS es la capa operativa interna para tomar pedidos, aplicar reglas del catálogo, enviar trabajo confirmado y cerrar el servicio con menos herramientas desconectadas.',
            problemTitle: 'El problema',
            problem: 'Los pedidos de mostrador, teléfono, web y reparto suelen entrar por sistemas distintos. El equipo vuelve a capturar información, cocina pierde contexto y gerencia reconcilia las diferencias al final del día.',
            audienceTitle: 'Diseñado para',
            audience: 'Restaurantes independientes con pedidos de mostrador, teléfono, pickup y delivery que necesitan un flujo controlado sin complejidad empresarial.',
            workflowTitle: 'El flujo operativo',
            workflowIntro: 'Un recorrido estrecho que mantiene autoridad y contexto unidos a cada pedido.',
            workflow: [
                { title: 'Capturar', body: 'Registrar pedidos de mostrador, teléfono, pickup, delivery o plataformas externas.' },
                { title: 'Validar', body: 'Aplicar catálogo, configuración, disponibilidad y totales autorizados por servidor.' },
                { title: 'Enrutar', body: 'Enviar únicamente trabajo confirmado a la estación correcta de cocina.' },
                { title: 'Cerrar', body: 'Cobrar con seguridad, conservar el recibo y preparar el cierre operativo.' },
            ],
            capabilitiesTitle: 'Superficie actual',
            capabilities: [
                { title: 'POS protegido en iPad', body: 'Acceso por estación y empleado con una interfaz táctil enfocada.' },
                { title: 'Catálogo autoritativo', body: 'Contratos versionados de menú, configuración, disponibilidad y precio.' },
                { title: 'Preparación de cocina', body: 'Contratos de tickets y KDS para recibir trabajo confirmado una sola vez.' },
                { title: 'Ciclo del pedido', body: 'Transiciones idempotentes, efectivo y bases para el cierre diario.' },
            ],
            integrationsTitle: 'Límite de integración',
            integrations: ['Capa piloto de datos en Supabase', 'Contratos de pago Stripe en modo prueba', 'Entrega opcional hacia TipTrack'],
            requirementsTitle: 'Requisitos del piloto',
            requirements: ['PWA instalada desde Safari en iPad', 'Estación y personal enrolados', 'Validación de red y enrutamiento de cocina antes de activar'],
            statusLabel: 'Estado real del producto',
            statusTitle: 'Piloto privado · activación controlada',
            statusBody: 'La vertical local y los contratos de seguridad están aceptados. La activación remota de catálogo, ciclo de pedidos y estación física continúa condicionada; RestOS no se presenta como un POS disponible de forma general.',
            evidenceLabel: 'scripts de prueba enfocados aprobados localmente',
            evidenceBody: 'El estado actual registra lint, build de producción y 96 scripts de prueba enfocados en verde.',
            cta: 'Conversemos sobre un piloto RestOS',
            imageAlt: 'Pantalla interna de captura de pedidos en RestOS',
        },
    },
    tiptrack: {
        slug: 'tiptrack',
        name: 'TipTrack',
        number: '02',
        image: '/holding/tiptrack.png',
        accent: 'violet',
        icon: '↗',
        proofMetric: '98%',
        en: {
            eyebrow: 'Delivery · Routes · Tips · Oversight',
            headline: 'Every delivery visible from departure to settlement.',
            intro: 'TipTrack gives drivers a focused delivery workflow and gives operators the history, customer context, cash and tip visibility needed to supervise the shift.',
            problemTitle: 'The problem',
            problem: 'Restaurant delivery frequently lives between paper tickets, map apps, cash notes and memory. Drivers lose context and managers cannot reconstruct what happened without manual reconciliation.',
            audienceTitle: 'Designed for',
            audience: 'Restaurants operating their own delivery team and needing reliable route, cash, tip and customer records without a heavyweight fleet platform.',
            workflowTitle: 'The delivery flow',
            workflowIntro: 'Driver actions stay simple while the operational record becomes complete.',
            workflow: [
                { title: 'Start', body: 'Capture the order, address, payment state and optional ticket evidence.' },
                { title: 'Navigate', body: 'Validate the destination, preview the route and hand off to Apple Maps.' },
                { title: 'Recover', body: 'Keep the active delivery and queued changes available through interruptions.' },
                { title: 'Settle', body: 'Close cash, tip and service rating, then update history and daily totals.' },
            ],
            capabilitiesTitle: 'Current product surface',
            capabilities: [
                { title: 'Driver workflow', body: 'Start, edit, restore, cancel and complete one stable delivery lifecycle.' },
                { title: 'Offline recovery', body: 'Durable delivery and ticket-image queues with explicit retry.' },
                { title: 'Route context', body: 'MapKit search, route preview, ETA and Apple Maps handoff.' },
                { title: 'Operations view', body: 'History, customer patterns, day cut, maps and delivery analytics.' },
            ],
            integrationsTitle: 'Integration boundary',
            integrations: ['Supabase Auth, Postgres and Realtime', 'Apple Maps and MapKit', 'On-device Vision OCR with optional server improvement'],
            requirementsTitle: 'Operating requirements',
            requirements: ['iOS 17+ for the native driver client or a modern web browser', 'Authenticated restaurant workspace', 'Location and photo permissions only when those features are used'],
            statusLabel: 'Real product status',
            statusTitle: 'Operational PWA · native iOS pilot',
            statusBody: 'The production-backed PWA is active. The native driver client has verified core delivery behavior and is in controlled device validation; remote push and representative camera corpus work remain open.',
            evidenceLabel: 'functional native-driver parity verified',
            evidenceBody: 'The fixed capability scorecard records 98% parity, production-backed RPC validation and successful physical iPhone lifecycle tests.',
            cta: 'Evaluate TipTrack for your team',
            imageAlt: 'TipTrack secure operations login screen',
        },
        es: {
            eyebrow: 'Reparto · Rutas · Propinas · Supervisión',
            headline: 'Cada entrega visible desde la salida hasta el corte.',
            intro: 'TipTrack ofrece al repartidor un flujo enfocado y a la operación el historial, contexto de cliente, efectivo y propinas necesarios para supervisar el turno.',
            problemTitle: 'El problema',
            problem: 'El reparto propio suele vivir entre tickets de papel, mapas, notas de efectivo y memoria. El repartidor pierde contexto y gerencia no puede reconstruir lo ocurrido sin conciliación manual.',
            audienceTitle: 'Diseñado para',
            audience: 'Restaurantes con equipo propio de reparto que necesitan registros confiables de rutas, efectivo, propinas y clientes sin una plataforma pesada de flotillas.',
            workflowTitle: 'El flujo de reparto',
            workflowIntro: 'Las acciones del repartidor siguen simples mientras el registro operativo se vuelve completo.',
            workflow: [
                { title: 'Iniciar', body: 'Capturar pedido, dirección, estado de pago y evidencia opcional del ticket.' },
                { title: 'Navegar', body: 'Validar destino, revisar ruta y abrir la navegación en Apple Maps.' },
                { title: 'Recuperar', body: 'Conservar el reparto activo y cambios pendientes durante interrupciones.' },
                { title: 'Liquidar', body: 'Cerrar efectivo, propina y evaluación; actualizar historial y corte diario.' },
            ],
            capabilitiesTitle: 'Superficie actual',
            capabilities: [
                { title: 'Flujo del repartidor', body: 'Iniciar, editar, restaurar, cancelar y completar un ciclo estable.' },
                { title: 'Recuperación offline', body: 'Colas durables de entregas e imágenes con reintento explícito.' },
                { title: 'Contexto de ruta', body: 'Búsqueda MapKit, vista previa, ETA y salida hacia Apple Maps.' },
                { title: 'Vista operativa', body: 'Historial, patrones de cliente, corte, mapas y analítica de reparto.' },
            ],
            integrationsTitle: 'Límite de integración',
            integrations: ['Supabase Auth, Postgres y Realtime', 'Apple Maps y MapKit', 'OCR Vision local con mejora opcional en servidor'],
            requirementsTitle: 'Requisitos operativos',
            requirements: ['iOS 17+ para el cliente nativo o navegador web moderno', 'Espacio de restaurante autenticado', 'Permisos de ubicación y foto sólo cuando se utilizan'],
            statusLabel: 'Estado real del producto',
            statusTitle: 'PWA operativa · piloto nativo iOS',
            statusBody: 'La PWA respaldada por producción está activa. El cliente nativo tiene comportamiento central verificado y continúa en validación controlada de dispositivo; push remoto y corpus representativo de cámara siguen abiertos.',
            evidenceLabel: 'de paridad funcional nativa verificada',
            evidenceBody: 'El scorecard fijo registra 98% de paridad, validación de RPC contra producción y ciclos exitosos en un iPhone físico.',
            cta: 'Evaluar TipTrack para tu equipo',
            imageAlt: 'Pantalla segura de acceso operativo de TipTrack',
        },
    },
    '86mise': {
        slug: '86mise',
        name: '86MISE',
        number: '03',
        image: '/holding/86mise.png',
        accent: 'orange',
        icon: '▤',
        proofMetric: '8.4/10',
        scenes: [
            {
                image: '/holding/86mise-inventory.png',
                en: {
                    title: 'Count what is physically there',
                    body: 'A focused count turns shelf life and on-hand quantity into visible, actionable facts.',
                    alt: '86MISE inventory count showing TCS expiry alerts and editable on-hand quantities',
                },
                es: {
                    title: 'Contar lo que realmente existe',
                    body: 'Un conteo enfocado convierte vida útil y existencias en hechos visibles para actuar.',
                    alt: 'Conteo de inventario de 86MISE con alertas TCS y existencias editables',
                },
            },
            {
                image: '/holding/86mise-purchasing.png',
                en: {
                    title: 'Turn the decision into a controlled purchase',
                    body: 'Supplier, amount and approval state stay together from draft through receipt.',
                    alt: '86MISE purchase order list showing suppliers, totals and approval states',
                },
                es: {
                    title: 'Convertir la decisión en una compra controlada',
                    body: 'Proveedor, importe y estado de aprobación permanecen unidos desde borrador hasta recepción.',
                    alt: 'Lista de órdenes de compra de 86MISE con proveedores, totales y estados de aprobación',
                },
            },
        ],
        en: {
            eyebrow: 'Inventory · Purchasing · Forecasting',
            headline: 'Know what is on hand, what is at risk and what to buy next.',
            intro: '86MISE connects ingredients, recipes, inventory counts, suppliers and purchase orders so independent restaurants can act before stock, expiry or purchasing becomes an emergency.',
            problemTitle: 'The problem',
            problem: 'Inventory decisions are often delayed until a count, shortage or invoice forces attention. Recipe cost, shelf life, suppliers and forecasts live in separate spreadsheets or in someone’s head.',
            audienceTitle: 'Designed for',
            audience: 'Independent restaurant teams that need practical inventory control, food-safety visibility and purchasing guidance without an enterprise implementation.',
            workflowTitle: 'The inventory flow',
            workflowIntro: 'One decision loop connects today’s exceptions to the next controlled purchase.',
            workflow: [
                { title: 'Detect', body: 'Open with the stock, expiry and purchasing exception that can change today’s service.' },
                { title: 'Count', body: 'Confirm on-hand quantities from a tablet-focused inventory workflow.' },
                { title: 'Decide', body: 'Combine shelf life, recipe demand and forecast context before committing spend.' },
                { title: 'Purchase', body: 'Translate the decision into a reviewable order with approval and receipt states.' },
            ],
            capabilitiesTitle: 'Current product surface',
            capabilities: [
                { title: 'Inventory and TCS', body: 'Counts, low-stock state and Texas seven-day shelf-life alerts.' },
                { title: 'Recipe economics', body: 'Ingredient relationships and automatic food-cost calculation.' },
                { title: 'Suppliers and purchasing', body: 'Supplier records and purchase orders with approval boundaries.' },
                { title: 'Forecast context', body: 'Baseline predictions and feedback paths clearly separated from demo-only models.' },
            ],
            integrationsTitle: 'Integration boundary',
            integrations: ['Clerk authentication and restaurant roles', 'PostgreSQL API data layer', 'Square remains disabled until real-traffic validation'],
            requirementsTitle: 'Beta requirements',
            requirements: ['Modern desktop or tablet browser', 'Restaurant and location assignment', 'Initial ingredient, recipe and supplier setup'],
            statusLabel: 'Real product status',
            statusTitle: 'Limited operational beta',
            statusBody: 'The authenticated inventory and purchasing beta is deployed and its technical pilot is complete. General availability, real Square traffic and operator-validated readiness are not claimed.',
            evidenceLabel: 'confirmed technical audit score',
            evidenceBody: 'The current audit records 131 backend tests, 15 unit tests and 18 end-to-end journeys passing. An operator session and SUS score remain the gate to 8.5/10.',
            cta: 'Explore an 86MISE beta',
            imageAlt: '86MISE dashboard prioritizing expiry, low stock and pending purchase decisions',
        },
        es: {
            eyebrow: 'Inventario · Compras · Pronóstico',
            headline: 'Saber qué tienes, qué está en riesgo y qué comprar después.',
            intro: '86MISE conecta ingredientes, recetas, conteos, proveedores y órdenes de compra para actuar antes de que el stock, vencimiento o abastecimiento se conviertan en emergencia.',
            problemTitle: 'El problema',
            problem: 'Las decisiones de inventario suelen esperar hasta que un conteo, faltante o factura obliga a prestar atención. El costo de receta, vida útil, proveedores y pronósticos viven en hojas separadas o en la cabeza de alguien.',
            audienceTitle: 'Diseñado para',
            audience: 'Equipos de restaurantes independientes que necesitan control práctico, visibilidad sanitaria y orientación de compras sin una implementación empresarial.',
            workflowTitle: 'El flujo de inventario',
            workflowIntro: 'Un solo ciclo conecta las excepciones de hoy con la siguiente compra controlada.',
            workflow: [
                { title: 'Detectar', body: 'Abrir con la excepción de stock, vencimiento o compra que puede cambiar el servicio de hoy.' },
                { title: 'Contar', body: 'Confirmar existencias desde un flujo de inventario optimizado para tablet.' },
                { title: 'Decidir', body: 'Combinar vida útil, demanda de recetas y pronóstico antes de comprometer gasto.' },
                { title: 'Comprar', body: 'Convertir la decisión en una orden revisable con estados de aprobación y recepción.' },
            ],
            capabilitiesTitle: 'Superficie actual',
            capabilities: [
                { title: 'Inventario y TCS', body: 'Conteos, stock bajo y alertas por la regla de siete días de Texas.' },
                { title: 'Economía de recetas', body: 'Relación de ingredientes y cálculo automático de food cost.' },
                { title: 'Proveedores y compras', body: 'Registros y órdenes de compra con límites de aprobación.' },
                { title: 'Contexto de pronóstico', body: 'Predicción base y feedback separados claramente de modelos sólo demo.' },
            ],
            integrationsTitle: 'Límite de integración',
            integrations: ['Autenticación Clerk y roles por restaurante', 'Capa API sobre PostgreSQL', 'Square permanece deshabilitado hasta validar tráfico real'],
            requirementsTitle: 'Requisitos de beta',
            requirements: ['Navegador moderno en desktop o tablet', 'Asignación de restaurante y local', 'Configuración inicial de ingredientes, recetas y proveedores'],
            statusLabel: 'Estado real del producto',
            statusTitle: 'Beta operativa limitada',
            statusBody: 'La beta autenticada de inventario y compras está desplegada y su piloto técnico terminó. No se declara disponibilidad general, tráfico Square real ni preparación validada por operadores.',
            evidenceLabel: 'de puntaje técnico confirmado',
            evidenceBody: 'La auditoría vigente registra 131 pruebas backend, 15 unitarias y 18 recorridos E2E aprobados. La sesión con operador y el SUS siguen siendo el gate para 8.5/10.',
            cta: 'Explorar una beta de 86MISE',
            imageAlt: 'Dashboard de 86MISE que prioriza vencimientos, stock bajo y compras pendientes',
        },
    },
}

export function isProductSlug(value: string): value is ProductSlug {
    return productSlugs.includes(value as ProductSlug)
}

export function getProductCopy(product: Product, language: Language) {
    return product[language]
}
