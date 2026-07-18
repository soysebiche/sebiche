# Guía canónica del proyecto Sebiche

Este documento es la referencia principal para decisiones de producto, arquitectura, UX/UI y ejecución del sitio corporativo de Sebiche.

## Decisiones canónicas

Estas decisiones posteriores a la auditoría prevalecen sobre cualquier alternativa mencionada en la línea base:

1. `sebiche.com` es un sitio **100% corporativo de Sebiche**.
2. El sitio activo no menciona a Sebastian Napuri ni utiliza experiencia personal, Linio o Liverpool como prueba de autoridad.
3. `/menu-board`, `/pizza`, `/entrees` y los case studies personales fueron eliminados del sitio corporativo; deben continuar respondiendo `404`.
4. El código y los recursos históricos sólo pueden permanecer en `archive/portfolio-legacy`, fuera del build y de `public`.
5. La identidad pública, metadata, navegación, correos y CTAs deben pertenecer exclusivamente a Sebiche.

## Estado del roadmap

| Fase | Estado | Resultado |
|---|---|---|
| Fase 1 — Estabilizar | Completada | Accesibilidad crítica, navegación, lint, build y pruebas corregidos |
| Fase 2 — Unificar | Completada y desplegada | Sitio exclusivamente corporativo, localización y SEO unificados, legado aislado |
| **Fase 3 — Convertir** | **Completada y desplegada** | Productos explorables, navegación conectada, captación medible y fallback operativo |
| **Fase 4 — Optimizar** | **En progreso** | Baseline medido; optimización de medios y telemetría de campo en implementación |

## Objetivo vigente: fase 4

La línea base móvil de producción del 17 de julio de 2026 es:

| Indicador | Baseline | Meta |
|---|---:|---:|
| Lighthouse Performance | 75/100 | ≥90/100 |
| LCP de laboratorio | 5.7 s | <2.5 s |
| TBT de laboratorio | 110 ms | <200 ms |
| CLS de laboratorio | 0 | <0.1 |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | Mantener 100 |

La primera iteración elimina descargas anticipadas, activa AVIF/WebP responsivo, difiere telemetría no crítica y añade Speed Insights para medir LCP, INP y CLS reales. El embudo y el primer experimento quedan definidos en `docs/phase-4-measurement.md`.

## Resultado de la fase 3

Crear una página corporativa por producto —RestOS, TipTrack y 86MISE— que incluya:

- Problema que resuelve.
- Para quién está diseñado.
- Flujo operativo.
- Capturas legibles.
- Integraciones y requisitos.
- Estado real del producto.
- Una prueba o resultado verificable.
- CTA específico.

También se deben hacer navegables las tarjetas y enlaces del footer, añadir un formulario interno con `mailto:` como fallback e instrumentar eventos.

**Meta de fase 3:** 100% de productos explorables y una conversión a contacto cualificado de 3%, o una mejora de 50% sobre el baseline de los primeros 14 días.

### Cierre operativo

- La superficie corporativa fue desplegada en `https://www.sebiche.com` el 17 de julio de 2026.
- RestOS, TipTrack y 86MISE tienen páginas públicas con estado real, evidencia y CTA específico.
- Vercel Analytics registra vistas de producto, clics de CTA e inicio, envío o fallback del formulario.
- La medición de 14 días comienza con este despliegue; la meta continúa siendo 3% de contacto cualificado o 50% de mejora sobre ese baseline.
- Vercel no dispone todavía de una credencial `RESEND_API_KEY`. Por ello, el formulario conserva la consulta y genera un correo prellenado a `s@sebiche.com`; la entrega automática queda preparada, pero no se declara activa.

---

# Auditoría base: 6/10

> Esta auditoría describe el estado inicial del proyecto. Sus hallazgos se conservan como línea base histórica. Cuando exista un conflicto, las decisiones canónicas anteriores tienen prioridad.

La portada nueva tiene una dirección visual sólida y diferenciada. El proyecto completo pierde puntos porque mezcla una web corporativa, el portafolio personal anterior y herramientas operativas de restaurante bajo los mismos estilos y metadatos.

Mi meta recomendada:

- **8/10 en 30 días:** experiencia coherente, accesible y confiable.
- **9/10 en 90 días:** sitio capaz de explicar los productos y generar conversaciones comerciales medibles.

## Puntajes por área

| Área | Puntaje | Diagnóstico |
|---|---:|---|
| UI de la portada | 8.2/10 | Editorial, distintiva y profesional |
| UX y conversión | 5.5/10 | Buena promesa, pocos caminos para explorar o convertir |
| Arquitectura modular | 5.2/10 | Tres superficies incompatibles dentro de una misma aplicación |
| Consistencia | 4/10 | Conviven las identidades “Sebiche” y “Sebastian Napuri” |
| Accesibilidad | 5.8/10 | Buena semántica inicial, pero contrastes y controles táctiles fallan |
| Calidad técnica | 6/10 | Build y tipos pasan; lint, pruebas y limpieza no |
| **General** | **6/10** | **Buena base visual, producto todavía fragmentado** |

## Lo mejor

- La portada no parece una plantilla genérica de IA. La composición asimétrica, las fotografías de operación y la mezcla Manrope/Cormorant generan una identidad reconocible.
- El mensaje principal se entiende rápidamente: tecnología conectada para restaurantes independientes.
- La información está bien agrupada en tres productos y tres beneficios. La carga cognitiva de la portada es baja: sólo falla 1 de los 8 criterios.
- La versión móvil conserva correctamente la jerarquía y el CTA principal ocupa una zona táctil cómoda.
- `npm run build` y `npx tsc --noEmit` pasan correctamente.

## Problemas prioritarios

### P0 — `/menu-board` está visualmente roto

La pantalla hereda el texto claro global sobre una tarjeta clara. Axe midió un contraste de **1.13:1** y título y platillos prácticamente desaparecen. El problema nace entre los estilos globales de `app/globals.css` y el módulo de `menu-board`.

Si esta ruta alimenta una Fire TV, debe corregirse antes de cualquier otra mejora.

### P1 — Hay dos productos completamente diferentes dentro del sitio

La portada presenta “Sebiche — Restaurant Technology”, mientras que los case studies regresan a:

- “Sebastian Napuri”
- “Product Designer & eCommerce Strategist”
- Otra navegación
- Otra paleta
- Otro correo

Además, sus enlaces apuntan a `/#about`, `/#education`, `/#experience`, `/#skills` y `/#projects`, secciones que ya no existen. El visitante siente que salió de Sebiche y entró en otro sitio.

### P1 — Los productos no tienen profundidad ni siguiente paso

RestOS, TipTrack y 86MISE parecen productos disponibles, pero:

- Las tarjetas no son enlaces.
- Los tres enlaces del footer regresan al mismo bloque.
- No hay página de producto, demo, funcionalidades, prueba, estado, precio orientativo o evidencia.
- Ambos CTA comerciales terminan exclusivamente en `mailto:`.

La promesa es fuerte, pero el visitante no puede investigar ni validar lo prometido.

### P1 — Localización incorrecta

La lógica inicial asignaba español a cualquier país que no fuera Estados Unidos. Eso incluía Reino Unido, Canadá, Australia, Alemania, etc.

También:

- `<html lang="en">` permanecía inicialmente en inglés.
- La preferencia se recuperaba después de hidratar, provocando un posible cambio visible de idioma.
- En español, etiquetas accesibles como “Skip to content”, “Primary navigation” y “Language” seguían en inglés.
- En móvil, los botones EN/ES medían aproximadamente **16×19 px**, muy por debajo de la meta de 44×44.

Debe utilizarse cookie + `Accept-Language`, con selección manual como autoridad final.

### P1 — Accesibilidad

Axe encontró:

- CTA blanco/naranja: **3.83:1**, debe alcanzar 4.5:1.
- Selector de idioma inactivo: **4.05:1**.
- Case study Linio: 8 fallos de contraste, orden incorrecto de encabezados y skip link roto.
- Menú: 7 fallos graves de contraste.
- En móvil, la navegación principal desaparecía completamente.

### P1 — Case studies parcialmente ilegibles

Las páginas utilizaban `text-coral`, `border-coral` y `to-coral`, pero `coral` no existía en la configuración de Tailwind. Por eso varios encabezados heredaban texto casi blanco sobre tarjetas blancas.

El detector Impeccable encontró 10 tarjetas con el patrón genérico `border-l-4`, además de métricas con gradientes, sombras y grillas repetitivas. La portada no parecía generada por IA; los case studies sí tenían varias señales de ese estilo.

### P2 — Deuda de mantenimiento

- `npm run lint` estaba roto porque Next.js 16 ya no soporta `next lint`.
- No existían pruebas de rutas, componentes o accesibilidad.
- Había aproximadamente 3,845 líneas entre la implementación activa y el portafolio anterior.
- `pages_old` y numerosos componentes ya no formaban parte de la portada.
- `ContactForm.tsx` estaba desconectado y conservaba un endpoint placeholder.
- Manifest, service worker y documentación seguían describiendo el portafolio anterior.
- El sitemap utilizaba `sebiche.vercel.app`, mientras el metadata usaba `sebiche.com`.
- Varias imágenes estaban marcadas `unoptimized` y `loading="eager"`, descargando más recursos de los necesarios.

## Evaluación Nielsen

| Heurística | /4 | Problema principal |
|---|---:|---|
| Estado del sistema | 2 | No hay feedback comercial dentro del sitio |
| Lenguaje del usuario | 3 | Buen lenguaje operativo; falta explicar productos |
| Control y libertad | 2 | Navegación móvil ausente y retornos rotos |
| Consistencia | 1 | Dos marcas y dos sistemas visuales |
| Prevención de errores | 2 | Dependencia exclusiva de `mailto:` |
| Reconocimiento | 3 | Categorías claras, pero tarjetas no accionables |
| Flexibilidad | 2 | Idioma persistente, pocos caminos alternativos |
| Diseño minimalista | 3 | Portada fuerte; legado repetitivo |
| Recuperación de errores | 2 | 404 existe, pero faltan alternativas de contacto |
| Ayuda/documentación | 2 | Descripción básica, sin detalle de producto |
| **Total** | **22/40** | **Aceptable; requiere mejoras significativas** |

## Arquitectura recomendada

No se crearán microservicios ni un design system complejo. El proyecto es pequeño. La división recomendada por superficies es:

```text
app/
  (marketing)/
    page.tsx
    productos/[slug]/page.tsx
    nosotros/page.tsx
    contacto/page.tsx

modules/
  marketing/
  products/
  contact/
  localization/

content/
  products/

components/
  ui/
```

`HoldingLanding.tsx` debe dividirse en cinco módulos razonables: Header, Hero, ProductGrid, Approach y Closing. No más fragmentación que eso.

## Plan de mejora

### Fase 1 — Estabilizar, 1–2 días

- Corregir inmediatamente `/menu-board`.
- Añadir o eliminar correctamente el token `coral`.
- Reparar contraste, skip links y controles táctiles.
- Corregir navegación y anchors rotos.
- Sustituir `next lint` por ESLint actual.
- Añadir smoke tests para las rutas existentes.

**Meta:** cero rutas ilegibles, cero enlaces internos rotos y build/type/lint/test en verde.

### Fase 2 — Unificar, 3–7 días

- Declarar Sebiche como identidad canónica.
- Retirar los case studies personales.
- Mover código anterior fuera de la aplicación activa.
- Eliminar las rutas operativas de menú del sitio corporativo.
- Implementar localización mediante cookie y `Accept-Language`.
- Corregir metadata, sitemap, manifest y canonicals.

**Meta:** una sola identidad, un solo sistema visual y cero violaciones serias de axe.

### Fase 3 — Convertir, 1–2 semanas

Crear una página por producto con:

- Problema que resuelve.
- Para quién está diseñado.
- Flujo operativo.
- Capturas legibles.
- Integraciones y requisitos.
- Estado real del producto.
- Una prueba o resultado verificable.
- CTA específico.

Hacer las tarjetas y enlaces del footer navegables. Añadir formulario interno con `mailto:` como fallback e instrumentar eventos.

**Meta:** 100% de productos explorables y una conversión a contacto cualificado de 3% o una mejora de 50% sobre el baseline de los primeros 14 días.

### Fase 4 — Optimizar, días 30–90

- Optimizar imágenes con AVIF/WebP y carga diferida.
- Medir embudo por producto.
- Probar variaciones de propuesta y CTA.
- Publicar evidencia real de uso.
- Revisar búsquedas orgánicas y consultas comerciales.

**Metas técnicas:** LCP <2.5 s, INP <200 ms, CLS <0.1, axe sin violaciones serias y puntuación general ≥9/10.

## Dirección final

Sebiche debe evolucionar como un sitio corporativo capaz de explicar sus productos, demostrar su utilidad operativa y generar conversaciones comerciales medibles, sin mezclar identidades personales ni herramientas operativas externas.
