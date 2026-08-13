# Thermo-nuclear code quality review

Auditoría de mantenibilidad del sitio corporativo activo. No cubre `archive/portfolio-legacy` como código vivo: ese árbol está excluido de TypeScript y ESLint, y no hay imports hacia la app. El legado sí aparece cuando deja residuos en el sistema visual, dependencias o el 404.

**Barra de aprobación:** no se aprueba “porque funciona”. El TypeScript activo es pequeño (~1,550 líneas) y en su mayoría directo. Aun así, hay regresiones estructurales claras, un movimiento de code-judo evidente que no se ha tomado, y crecimiento de casos especiales en i18n, catálogo y chrome. **No aprueba** como arquitectura lista para seguir creciendo sin reencuadre.

**Qué está bien y no hay que tocar:** aislamiento del archivo, composición de `HoldingLanding`, honestidad de estado de producto, fallback `mailto:` del formulario, `strict` sin `any`, y smoke tests de rutas corporativas vs. legado retirado.

---

## 1. Regresión estructural: dos sistemas visuales siguen vivos

La unificación corporativa retiró el portafolio del build, pero no retiró su sistema de diseño. El sitio público real vive en CSS a medida (`holding.css`, `product.css`). El 404, Tailwind y dos dependencias siguen siendo el producto anterior.

```1:24:app/not-found.tsx
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'

export default function NotFound() {
    return (
        <main id="main" className="min-h-screen flex items-center justify-center bg-softGray px-4">
            ...
                    className="inline-flex items-center gap-2 px-6 py-3 bg-charcoal text-white ..."
```

Eso es identidad dual en producción. `softGray`, `charcoal` y `lucide-react` no existen en la portada. `tailwind.config.js` todavía escanea `./pages/**` (no hay `pages/` activo) y conserva `turquoise`, `coral`, Inter, Montserrat y el acento indigo del portafolio.

`framer-motion` no se usa en código activo. `lucide-react` sólo existe por el 404. Cada visita carga `globals.css` + `holding.css` + `product.css` desde el layout raíz, así que la home arrastra estilos de producto/contacto y al revés.

Esto no es un nit de CSS. Es el mismo fallo de consistencia de la auditoría base, ahora reducido al 404 y a la toolchain. Mientras el visitante que se pierde ve otra marca, la unificación no está cerrada.

**Remedio:** un 404 en las mismas clases `holding-*` / `product-*`. Borrar tokens de Tailwind que la app corporativa no usa. Quitar `framer-motion`. Quitar `lucide-react` si el 404 deja de necesitarlo. Cargar CSS por superficie, no todo en el layout raíz.

---

## 2. Code-judo: el chrome no es un shell

Este es el movimiento que borra más complejidad de un golpe.

Hoy el header es compartido, pero el resto del marco se reimplementa en cada página:

| Pieza | Home | Producto | Contacto |
|---|---|---|---|
| `useLanguageSelection` | `HoldingLanding` | `ProductDetail` | `ContactPage` |
| `MarketingHeader` | sí | sí | sí |
| Footer `SEBICHE — Dallas, Texas` | `ClosingSection` | `ProductDetail` | `ContactPage` |
| Links de productos | hardcodeados | `Object.values(products)` | hardcodeados |
| Copy de chrome | `homeCopy` | `commonCopy` inline | `copy` inline |

El skip link vive en el layout de servidor. El cambio de idioma lo parchea con `querySelector` y `data-*`:

```9:18:lib/use-language-selection.ts
    useEffect(() => {
        document.documentElement.lang = language === 'en' ? 'en-US' : 'es-419'

        const skipNavigation = document.querySelector<HTMLElement>('[data-skip-navigation]')
        const skipLink = document.querySelector<HTMLAnchorElement>('[data-skip-link]')

        skipNavigation?.setAttribute('aria-label', language === 'es' ? 'Navegación de salto' : 'Skip navigation')
        if (skipLink) {
            skipLink.textContent = language === 'es' ? skipLink.dataset.labelEs ?? 'Saltar al contenido' : skipLink.dataset.labelEn ?? 'Skip to content'
        }
    }, [language])
```

Eso es lógica de i18n filtrándose a un path compartido mediante mutación del DOM. Funciona. También hace el layout más spaghetti y acopla un hook de cliente al markup del layout por atributos mágicos.

**El reencuadre:** un `MarketingShell` cliente (o un layout cliente del route group) que posee idioma, skip link, header y footer. Las páginas pasan contenido. El skip link se renderiza con el idioma actual; desaparecen `data-label-en`, `querySelector` y los tres footers.

No extraer ocho subcomponentes de `ProductDetail`. Eso sería mover las mismas secciones. El shell es el corte correcto: chrome vs. contenido.

Tampoco adoptar `modules/{marketing,products,contact,localization}` como pide `PROJECT_GUIDE.md`. A este tamaño, esa carpeta **reparte** complejidad sin borrarla. El layout plano (`app/`, `components/marketing/`, `content/`, `lib/`) es el adecuado. Lo que falta no es más paquetes; es un dueño canónico del marco.

---

## 3. Code-judo: el catálogo de productos no es la fuente de verdad

`productSlugs` en `content/products.ts` debería ser el único contrato. En la práctica el catálogo se reescribe a mano en cuatro sitios:

1. `homeCopy.products.items` duplica `slug`, `name` y blurb, y obliga a `item.slug as ProductSlug`.
2. `app/api/contact/route.ts` define `PRODUCT_VALUES = new Set(['', 'restos', 'tiptrack', '86mise'])`.
3. `app/sitemap.ts` hardcodea las tres rutas.
4. Footers de home y contacto hardcodean `/productos/restos|tiptrack|86mise`. El de producto sí itera el registry.

Añadir un cuarto producto hoy no es “agregar un record”. Es cazar strings. Eso es branching de catálogo esparcido por paths que no deberían conocer slugs.

**El reencuadre:** las tarjetas de home se derivan de `products`. El sitemap mapea `productSlugs`. El API usa `isProductSlug`. El footer itera el registry. `homeCopy.products.items` desaparece. El cast en `ProductGrid` desaparece porque el tipo ya es `ProductSlug`.

`getProductCopy` sí gana su keep: es el acceso al locale. No es un wrapper vacío.

---

## 4. Spaghetti de i18n: el idioma se resuelve bien y luego se ignora

El modelo de servidor es el correcto: cookie, luego `Accept-Language`. El resto no lo respeta.

- Metadata raíz, Open Graph, Twitter, `/contacto` y `generateMetadata` de producto usan siempre inglés (`product.en`), aunque el JSON-LD de producto sí usa el idioma de la request.
- Manifest fijo `lang: 'en-US'`.
- 404 y el ticket del hero (`ORDER 86 / CONNECTED`) están sólo en inglés.
- Copy de chrome vive en cuatro hogares: `content/home.ts`, `content/products.ts`, `commonCopy` en `ProductDetail`, `copy` en `ContactPage`, más strings del layout.
- `languageFromAcceptLanguage` toma el **primer** tag, no el de mayor `q`. `en;q=0.8,es;q=0.9` se clasifica como inglés.

Eso no es un sistema de localización. Es SSR inicial más islas de cliente, con metadata y chrome fuera del modelo. Cada página nueva copiará otro blob `en`/`es`.

**Remedio:** un módulo de copy (home, productos, contacto, chrome, metadata). Metadata generada con `getRequestLanguage()`. Parser de `Accept-Language` por `q`. El ticket del hero y el 404 entran al mismo copy o se eliminan como decoración no localizada de forma consciente, no accidental.

La cookie de idioma se escribe sin `Secure` en un sitio HTTPS. No es el hallazgo principal; sí es un contrato a medio definir.

---

## 5. Frontera de capas: secciones enteras son cliente por un `onClick`

`HeroSection`, `ProductGrid` y `ClosingSection` son `'use client'` porque disparan `trackMarketingEvent` en un Link. `ApproachSection` ya es servidor. El resto no necesita estado.

Eso filtra telemetría hacia la capa de presentación y agranda el bundle de la home. Un `TrackLink` (o un handler en el shell) deja las secciones como Server Components. `trackMarketingEvent` ya es el helper canónico; el problema es **dónde** se llama, no que exista.

En producto, `viewedLanguage = useRef(initialLanguage)` nunca se actualiza. El efecto podría usar `initialLanguage` directo. El ref es estado fantasma que documenta una decisión de analítica con un mecanismo que no hace falta.

El API de contacto duplica el catálogo y trata 400 y 503 igual en el cliente (`throw` → mailto). El fallback es deliberado y correcto para 503. Mezclar validación inválida con “proveedor no configurado” en el mismo UI es un caso especial que va a doler cuando Resend sí esté activo: un campo malo se verá como fallo de entrega.

---

## 6. Tamaño de archivo: el problema de 1k líneas está en CSS, no en TS

Ningún TSX cruza 1k. Los archivos grandes son:

| Archivo | Líneas | Veredicto |
|---|---:|---|
| `app/holding.css` | 820 | Cerca del umbral; es el sistema visual de la home |
| `app/product.css` | 456 | Producto **y** contacto en el mismo archivo |
| `content/products.ts` | 324 | Monolito bilingüe; aceptable si el catálogo es canónico |
| `ProductDetail.tsx` | 188 | Plantilla larga, no spaghetti. No partirla en wrappers |

`holding.css` y `product.css` redefinen `--paper`, `--ink`, `--muted`, `--rule`, `--copper-action`. Contacto no tiene dueño de estilos: vive al final de CSS de producto.

No hay que “componentizar” el CSS en decenas de módulos. Hay que (1) tokens compartidos una vez, (2) no cargar CSS de producto en la home, (3) no dejar que `product.css` absorba contacto por inercia. Si contacto crece, se sale de ese archivo **antes** de cruzar 1k combinado.

`tsconfig` sigue en `"target": "es5"` con Next 16 / React 19. `@types/react` es 18. No es un bug de runtime hoy; es toolchain que miente sobre la plataforma.

---

## 7. Abstracciones: cuáles ganan su keep y cuáles no

**Mantener**

- `getRequestLanguage` + `isLanguage` + cookie.
- `trackMarketingEvent` como único puente `va` / `gtag`.
- `HoldingLanding` como composición, no como god component.
- `Telemetry` como gate de Vercel. Es delgado a propósito.
- Validación + honeypot + `escapeHtml` en `app/api/contact/route.ts`.

**No añadir**

- `modules/` al estilo de la guía. Sería un refactor que mueve archivos y no borra conceptos.
- Extraer cada sección de `ProductDetail` a su propio archivo. Wrappers de identidad.
- Un design system de `components/ui/` para tres páginas. El CSS a medida ya es el sistema.

**Consolidar**

- Footer → un componente alimentado por `products`.
- Copy de contacto y `commonCopy` → `content/`.
- `PRODUCT_VALUES` y rutas del sitemap → `productSlugs`.
- Tokens CSS duplicados → un `:root` corporativo.

---

## 8. Pruebas y contratos que no sostienen el diseño

`tests/routes.test.mjs` es un buen smoke de producción: rutas vivas, legado en 404, canonicals, sitemap, 503 del formulario, cookie vs. `Accept-Language`. También fija deuda:

- Las aserciones de copy son inglés. Un markup español roto en producto/contacto no se ve.
- No hay prueba del honeypot (`website` → 204).
- No hay prueba unitaria de `languageFromAcceptLanguage` (el bug de `q` pasaría).
- El ID de GA `G-X9SVKLLCBY` está hardcodeado en layout y test. El test congela un fallback mágico.

`npm test` = `build` + servidor de producción. Correcto como gate de deploy; caro e incompleto como red de diseño. Falta un `node:test` barato sobre `lib/language.ts` y el parser de contacto.

ESLint apaga `react/no-unescaped-entities` y `react-hooks/set-state-in-effect`. El segundo oculta exactamente el patrón del skip-link effect. Si el shell absorbe el idioma, esa regla puede volver a encenderse.

---

## Secuencia si se actúa (sin cambiar comportamiento)

1. **Shell único** — idioma, skip link, header, footer. Borrar mutación DOM y footers copiados.
2. **Catálogo canónico** — home, sitemap, API y footer leen `products` / `productSlugs`.
3. **Copy y metadata al mismo modelo de idioma** — incluyendo `generateMetadata`.
4. **Un sistema visual** — 404 corporativo, Tailwind/deps muertos, CSS por superficie.
5. **Parser `Accept-Language` por `q`** + test unitario. Cookie `Secure`.
6. **`TrackLink`** para devolver Hero/Grid/Closing a Server Components.
7. **Toolchain** — `target` moderno, `@types/react` 19, quitar `framer-motion`.

El paso 1+2 es el judo: menos conceptos, mismos flujos, cero features nuevas.

---

## Veredicto

| Pregunta de la rúbrica | Respuesta |
|---|---|
| ¿Hay un code-judo que simplifique de forma dramática? | Sí: `MarketingShell` + catálogo único. |
| ¿La arquitectura local mejora o empeora al crecer? | Empeora: cada página nueva copia chrome, footer y copy. |
| ¿Hay branching especial en flujos ajenos? | Sí: skip link, slugs duplicados, metadata siempre EN. |
| ¿Algún TS cruza 1k? | No. El CSS de home se acerca. |
| ¿Las abstracciones ganan su keep? | Las de i18n/analytics sí. `modules/` y partir `ProductDetail` no. |
| ¿Hay `any` / wrappers huecos? | No `any`. Casts de slug porque el home no usa el catálogo. |

**No aprobado** para seguir añadiendo superficie (nosotros, más productos, más experimentos de copy) encima de chrome duplicado y dos sistemas visuales.

El código no es un desastre. Es un sitio de marketing coherente que ya pagó Fases 1–3 y dejó el corte estructural a medias: el portafolio salió del grafo, no del 404 ni de la toolchain; el header se extrajo, el resto del marco no; el registry de productos existe, pero no gobierna. Eso es deuda de diseño, no de estilo.
