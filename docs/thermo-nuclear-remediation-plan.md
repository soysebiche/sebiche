# Plan técnico: corrección de findings

Plan de implementación para `docs/thermo-nuclear-code-quality-review.md`. Objetivo: mismos flujos públicos, menos conceptos. Cada paquete debe poder mergearse solo.

## Invariantes

- Rutas, copy visible, eventos de embudo y fallback `mailto:` no cambian de significado.
- No se crea `modules/`. No se parte `ProductDetail` en una sección por archivo.
- `archive/portfolio-legacy` sigue fuera del grafo.
- El toggle EN/ES sigue siendo inmediato y no borra el formulario de contacto.
- Gate de merge por paquete: `npm run lint && npm run typecheck && npm test`.

## Fuera de alcance

- Página `/nosotros`, nuevos productos, experimentos de CTA, activar Resend.
- Design system de `components/ui/`.
- i18n con rutas `/en` `/es` (el modelo sigue siendo cookie + `Accept-Language`).

## Resultado estructural

```text
app/
  layout.tsx                 # globals.css + generateMetadata(idioma)
  globals.css                # tokens, foco, reduced-motion
  chrome.css                 # skip, header, botón, footer
  holding.css                # sólo home
  product.css                # sólo producto
  contact.css                # sólo contacto
  not-found.tsx              # misma identidad visual
  (marketing)/layout.tsx     # JSON-LD + MarketingShell
  (marketing)/page.tsx
  (marketing)/productos/[slug]/page.tsx
  (marketing)/contacto/page.tsx
  api/contact/route.ts       # isProductSlug, no set local

components/marketing/
  MarketingShell.tsx         # idioma, skip, header; children
  MarketingHeader.tsx
  MarketingFooter.tsx        # un markup; placement lo decide la página
  TrackLink.tsx
  HoldingLanding.tsx         # composición; ya no posee el hook
  …

content/
  chrome.ts                  # skip, nav, footer, 404, ticket
  home.ts                    # sin items ni alts de producto
  products.ts                # catálogo canónico + cardBody
  contact.ts
  metadata.ts

lib/
  language.ts                # q-value, htmlLang, cookie
  language-context.tsx       # sustituye el effect del skip link
  request-language.ts
  marketing-analytics.ts
  site.ts                    # origin + GA id
```

`PROJECT_GUIDE.md` se actualiza al cerrar el paquete 2: la arquitectura canónica pasa a ser este árbol, no `modules/`.

---

## Paquete 1 — Catálogo canónico

Cierra el finding 3. Riesgo bajo. No mueve chrome.

### Contrato

`content/products.ts` es la única lista de productos. Añadir un producto es añadir un record.

```ts
type LocalizedProduct = {
  cardBody: string  // hoy vive en homeCopy.products.items[].body
  // …campos actuales
}
```

Helpers de ruta (mismo archivo o `lib/site.ts`):

```ts
export function productPath(slug: ProductSlug) {
  return `/productos/${slug}`
}
```

### Cambios

| Archivo | Qué hacer |
|---|---|
| `content/products.ts` | `cardBody` en `en`/`es`. Dejar `productSlugs` como origen. |
| `content/home.ts` | Borrar `products.items` y `imageAlt.restos\|tiptrack\|mise`. |
| `components/marketing/ProductGrid.tsx` | Iterar `productSlugs`. Copy de tarjeta = `getProductCopy`. Sin `as ProductSlug`. |
| `components/marketing/MarketingFooter.tsx` | **Nuevo.** Itera `products`. Props: `variant: 'home' \| 'internal'`, `currentSlug?`, `contactLabel?`. |
| `ClosingSection.tsx`, `ProductDetail.tsx`, `ContactPage.tsx` | Usar `MarketingFooter`. Borrar links hardcodeados. |
| `app/sitemap.ts` | `['', ...productSlugs.map(productPath), '/contacto']`. |
| `app/api/contact/route.ts` | `isProductSlug(product) \|\| product === ''`. Borrar `PRODUCT_VALUES`. |

El footer de home sigue **dentro** de `ClosingSection` (banda visual). El de producto/contacto sigue al final de `<main>`. Extraer el componente, no el placement: `holding-footer` y `product-footer` no son el mismo CSS.

### Tests

- `tests/routes.test.mjs`: sitemap sigue con 5 `<loc>`; home sigue enlazando los tres productos.
- Añadir aserción de que el API rechaza `product: 'unknown'` con 400.

### Hecho cuando

No queda ningún literal `restos|tiptrack|86mise` fuera de `content/products.ts` (salvo URLs en tests que leen el HTML).

---

## Paquete 2 — MarketingShell

Cierra el finding 2. Este es el judo.

### Por qué no `router.refresh()` todavía

Un refresh en el toggle haría las secciones Server Components, pero **vaciaría el formulario** al cambiar idioma. El comportamiento actual conserva valores y sólo cambia labels. El shell debe preservar eso.

Idioma = estado cliente + cookie para el próximo document request. El skip link vive en el mismo árbol React. No hay `querySelector`.

### API

```ts
// lib/language-context.tsx
export function LanguageProvider({ initialLanguage, children })
export function useLanguage(): { language: Language, selectLanguage: (language: Language) => void }
```

`selectLanguage` actualiza estado, escribe cookie (`path=/; max-age=31536000; samesite=lax`; `Secure` sólo si `location.protocol === 'https:'`) y `document.documentElement.lang`.

```tsx
// components/marketing/MarketingShell.tsx
export default function MarketingShell({
  initialLanguage,
  headerContext = 'internal',
  children,
}: {
  initialLanguage: Language
  headerContext?: 'home' | 'internal'
  children: React.ReactNode
})
```

El shell renderiza skip link + `MarketingHeader` + `children`. No renderiza footer (paquete 1 ya unificó el markup; el placement es de la página).

### Cableado

```tsx
// app/(marketing)/layout.tsx  (sigue siendo Server Component)
const language = await getRequestLanguage()
return (
  <MarketingShell initialLanguage={language}>
    {children}
  </MarketingShell>
)
```

En App Router, `children` pasados a un Client Component siguen siendo el slot de servidor. Las páginas no se vuelven cliente por este wrap.

Luego:

- `HoldingLanding`, `ProductDetail`, `ContactPage` dejan de llamar `useLanguageSelection` y de montar `MarketingHeader`.
- Consumen `useLanguage()` para el copy.
- `MarketingHeader` deja de recibir `language` / `onLanguageChange`; los lee del contexto. `context` (home vs internal) sí se pasa: el layout no sabe si es home.

`headerContext`: el layout no distingue home. Opciones:

1. `MarketingHeader` usa `usePathname()`: `/` → wordmark `#main`, resto → `/`.
2. Prop opcional en shell, seteada por cada page.

Preferir pathname. Borra `headerContext`.

Borrar `lib/use-language-selection.ts` y los `data-skip-*` del layout.

### CSS

Mover a `app/chrome.css` (importado por el layout de marketing): skip link, header, nav móvil, language, `holding-button`. `holding.css` deja de ser prerrequisito de producto/contacto para el header.

En este paquete el root layout puede seguir importando los tres CSS. El split por superficie es el paquete 4.

### Tests

- Cookie vs `Accept-Language` sigue verde.
- Skip link sigue en el HTML inicial con el idioma de la request (`Saltar al contenido` / `Skip to content`).
- Tras este paquete se puede reactivar `react-hooks/set-state-in-effect` si no queda el effect del skip.

### Hecho cuando

Una sola llamada a `useLanguage` / provider. Cero `document.querySelector` en i18n. Header no se instancia en las páginas.

---

## Paquete 3 — Copy, metadata e i18n de verdad

Cierra el finding 4 y el 404 del finding 1 (identidad + idioma).

### Copy

| Destino | Origen actual |
|---|---|
| `content/chrome.ts` | nav de `homeCopy`, skip del layout, labels de footer/producto (`commonCopy`), 404, ticket del hero |
| `content/contact.ts` | blob inline de `ContactPage` |
| `content/metadata.ts` | title/description/OG de `app/layout.tsx`, contacto y productos |

`ProductDetail` importa chrome copy; no define `commonCopy`. `ContactPage` no define `copy`. El ticket `ORDER 86` pasa a `chrome.ts` (en/es) o se marca `aria-hidden` y se deja en inglés **en el archivo de copy**, no como string suelto en JSX.

### Metadata

Sustituir `export const metadata` estático del root por:

```ts
export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage()
  return siteMetadata[language]
}
```

Igual en `contacto/page.tsx` y en `generateMetadata` de producto (`getProductCopy(product, language)` en lugar de `product.en`).

El toggle cliente no cambia `<title>` hoy. En este paquete, `selectLanguage` también asigna `document.title` desde `content/metadata.ts` para no dejar el tab en el idioma anterior. JSON-LD de organización: mover strings a metadata copy; el layout de marketing ya resuelve idioma.

Manifest: `lang` no puede ser dinámico por request de forma limpia en `manifest.ts`. Dejar `en-US` y documentarlo como limitación, o emitir `lang` según cookie si `cookies()` está permitido ahí. Si no lo está, no inventar un route handler.

### 404

`app/not-found.tsx` pasa a clases `holding-site` / `holding-button`. Copy desde `chrome.ts`. Idioma: `getRequestLanguage()` (Server Component). Sin toggle en 404; el CTA vuelve a `/`. Quitar `lucide-react` de este archivo.

Ajustar el smoke test: sigue existiendo `Page Not Found` en inglés por default; añadir caso `accept-language: es` → copy español. No asertar clases Tailwind.

### Parser `Accept-Language`

En `lib/language.ts`:

- Split por coma.
- Parsear `q=` (default `1`).
- Ordenar por `q` descendente.
- Primer tag que `startsWith('es')` → `es`; si no hay, `en`.
- Vacío o inválido → `en`.

Casos de test (`tests/language.test.ts`, `node --test --experimental-strip-types`):

| Input | Output |
|---|---|
| `null` | `en` |
| `es-MX,es;q=0.9,en;q=0.8` | `es` |
| `en;q=0.8,es;q=0.9` | `es` |
| `en-US,en;q=0.9` | `en` |
| `fr-FR,fr;q=0.9` | `en` |

Script: `"test:unit": "node --test --experimental-strip-types tests/*.test.ts"` y `test` corre unit + routes.

### Hecho cuando

No hay blobs `en:`/`es:` dentro de componentes. Metadata de producto/contacto sigue el idioma de la request. El bug de `q` tiene test rojo-antes / verde-después.

---

## Paquete 4 — Superficie visual, RSC de analytics y toolchain

Cierra findings 1 (resto), 5, 6 y 8.

### CSS por superficie

1. Tokens (`--paper`, `--ink`, `--muted`, `--rule`, `--copper-action`, `--copper`, `--violet`) una sola vez en `globals.css`.
2. Root layout importa **sólo** `globals.css`.
3. `(marketing)/layout.tsx` importa `chrome.css`.
4. Home importa `holding.css`.
5. `productos/[slug]/page.tsx` importa `product.css`.
6. `contacto/page.tsx` importa `contact.css` (cortar el bloque `.contact-*` de `product.css`).
7. 404 importa `chrome.css` (o un `@import` desde un wrapper) para botón/tipografía.

Verificar que la home ya no envía reglas `.product-*` / `.contact-*` (ver source o coverage de CSS en el HTML/build).

`holding.css` no debe cruzar 1k. Si al extraer chrome baja de ~820, no hace falta partirlo más.

### Tailwind y dependencias

Tras el 404 corporativo, el app activo no usa utilities Tailwind: sólo `not-found.tsx` y `@apply antialiased`.

- Reemplazar `@apply antialiased` por ` -webkit-font-smoothing: antialiased`.
- Quitar `tailwindcss`, `autoprefixer` si queda sin uso, `framer-motion`, `lucide-react`.
- Borrar tokens de portafolio en `tailwind.config.js`. Si Tailwind desaparece, borrar el config y el plugin de PostCSS.
- Confirmar que `archive/` no entra al build (ya excluido) antes de quitar las deps.

### Analytics sin contaminar secciones

```tsx
// components/marketing/TrackLink.tsx
'use client'
export function TrackLink({ event, properties, ...linkProps }: LinkProps & { event, properties })
```

`HeroSection`, `ProductGrid`, `ClosingSection` pueden dejar de ser `'use client'` **sólo si** dejan de leer idioma desde contexto y reciben `copy` + `language` por props desde un padre cliente (`HoldingLanding`). Eso ya es una mejora: el JS de esas secciones no necesita hooks; `TrackLink` es la isla.

No forzar Server Components en home en este paquete. El padre sigue cliente por el toggle inmediato. Convertir home a RSC exigiría `router.refresh()` y persistir el form (sessionStorage). Eso es un follow-up, no un blocker.

`ProductDetail`: borrar `viewedLanguage` ref; `trackMarketingEvent('Product Viewed', { language: initialLanguage })` en un `ProductViewTracker` de ~10 líneas, o en un effect con `initialLanguage` directo.

### Contacto 400 vs 503

El cliente lee `code` del JSON:

| Status | Código | UI |
|---|---|---|
| 204 | honeypot | silencio (igual) |
| 400 | `INVALID_*` | error de campos, sin mailto |
| 503 | `CONTACT_NOT_CONFIGURED` | mailto (igual) |
| 502 | `DELIVERY_FAILED` | mailto (igual) |

Tests de routes: 400 sin mailto obligatorio; honeypot `website: 'http://spam'` → 204.

### Toolchain

- `tsconfig.json` `"target": "ES2017"` (o el default de `create-next-app` 16).
- `@types/react` / `@types/react-dom` alineados a React 19.
- Constante `GA_MEASUREMENT_ID` en `lib/site.ts`; layout y test la importan (el test de routes es `.mjs`: o bien exportar un `site.json`, o asertar el patrón `G-[A-Z0-9]+` y el override por env, no el literal duplicado).
- `npm uninstall` de deps muertas; lockfile actualizado.

### Tests de copy en español

En `tests/routes.test.mjs`, un caso por superficie con `accept-language: es-MX`:

- `/` → `Tu restaurante`
- `/productos/restos` → headline ES
- `/contacto` → `Cuéntanos dónde está la fricción`

No duplicar todo el archivo; un test parametrizado basta.

### Hecho cuando

Lighthouse de laboratorio no empeora de forma material (LCP home). `npm ls framer-motion lucide-react` falla. Home no incluye CSS de contacto. Formulario distingue 400 de 503.

---

## Orden y dependencias

```text
P1 catálogo ──────────────────────────────┐
P2 shell (después o en paralelo a P1) ────┼─→ P3 copy/metadata/404/parser
                                          └─→ P4 CSS/Tailwind/TrackLink/toolchain
```

P1 y P2 no se pisan si P2 no reescribe footers (P1 ya los unificó). Si se hace P2 antes, el footer duplicado sigue hasta P1: peor. **P1 primero.**

P3 necesita el shell para no volver a poner copy de skip en el layout.

P4 necesita el 404 de P3 antes de borrar Tailwind.

## Riesgos

| Riesgo | Mitigación |
|---|---|
| Footer de home se sale de la banda | Componente sí, placement no. QA visual de `/#contact`. |
| Cookie `Secure` en `localhost` | Sólo si `https:`. |
| CSS split deja header sin estilos en producto | `chrome.css` en layout de marketing, no en la page. |
| Quitar Tailwind rompe el 404 | 404 corporativo mergeado antes. |
| `generateMetadata` dinámico pierde cache estático | Aceptable: el idioma ya depende de cookie/headers; el layout ya es dinámico. |
| Strip-types en CI | Confirmar Node ≥ 22 en Vercel; si no, `tsx` como runner de unit. |

## Criterio de cierre global

La barra de la auditoría se cumple cuando:

1. No hay segundo sistema visual en rutas activas.
2. Chrome (skip, header, idioma) tiene un dueño.
3. Un producto nuevo se añade en un solo archivo.
4. Metadata y copy de UI salen del mismo modelo de idioma.
5. No hay `querySelector` de i18n, ni `PRODUCT_VALUES`, ni `framer-motion` en el app activo.

Eso habilita Fase 4 (experimentos, más evidencia) sin copiar chrome otra vez.
