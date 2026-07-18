# Medición y experimentación — fase 4

Este documento define cómo evaluar rendimiento y conversión sin confundir actividad técnica con resultados comerciales.

## Línea base de producción

Medición móvil de Lighthouse ejecutada el 17 de julio de 2026 sobre `https://www.sebiche.com` antes de la primera optimización:

| Indicador | Resultado |
|---|---:|
| Performance | 75/100 |
| Accessibility | 100/100 |
| Best Practices | 100/100 |
| SEO | 100/100 |
| FCP | 1.0 s |
| LCP | 5.7 s |
| TBT | 110 ms |
| CLS | 0 |
| Speed Index | 4.7 s |

Lighthouse atribuyó aproximadamente 1 MB de ahorro potencial a formatos modernos y tamaños responsivos. La página inicial transfería cerca de 1.7 MB y descargaba anticipadamente imágenes ubicadas bajo el fold.

## Resultado de la primera iteración

El 17 de julio de 2026 se desplegó el commit `ac3587b`. Para reducir el ruido propio de Lighthouse, el resultado posterior usa la mediana de tres corridas móviles consecutivas sobre producción. La línea base anterior corresponde a una sola corrida, por lo que la comparación orienta, pero no reemplaza los datos de campo.

| Indicador | Antes | Después, mediana | Meta | Estado |
|---|---:|---:|---:|---|
| Performance | 75/100 | 94/100 | ≥90/100 | Alcanzada |
| FCP | 1.0 s | 1.04 s | — | Estable |
| LCP | 5.7 s | 2.46 s | <2.5 s | Alcanzada con margen estrecho |
| TBT | 110 ms | 171 ms | <200 ms | Alcanzada |
| CLS | 0 | 0 | <0.1 | Alcanzada |
| Speed Index | 4.7 s | 3.70 s | — | Mejora de 21% |
| Transferencia inicial | ~1,688 KiB | ~311 KiB | — | Reducción de 82% |
| Accessibility / Best Practices / SEO | 100 / 100 / 100 | 100 / 100 / 100 | Mantener 100 | Alcanzada |

Las tres corridas de Performance fueron 93, 94 y 96. Sus LCP fueron 2.54 s, 2.34 s y 2.46 s. Una corrida quedó apenas por encima del objetivo, de modo que Speed Insights debe confirmar el resultado en tráfico real antes de declarar estable la mejora. Lighthouse ya no identifica ahorro en formatos modernos, tamaño responsivo ni compresión de imágenes.

## Fuentes de verdad

- **Vercel Speed Insights:** LCP, INP y CLS de usuarios reales por ruta y dispositivo.
- **Vercel Web Analytics:** sesiones, páginas y eventos del embudo.
- **Lighthouse móvil:** regresión reproducible previa a cada despliegue de optimización.
- **Correo recibido:** confirmación comercial final; ningún evento técnico sustituye esta evidencia.

## Embudo por producto

Los eventos no incluyen nombre, correo, restaurante ni mensaje.

| Orden | Evento | Significado |
|---:|---|---|
| 1 | `Product Viewed` | Una página de producto fue vista; cambiar idioma no duplica el evento. |
| 2 | `Product CTA Clicked` | El visitante avanzó desde una tarjeta o página de producto. |
| 3 | `Contact Form Started` | El visitante interactuó con el formulario. |
| 4 | `Contact Form Validated` | El servidor recibió campos completos y válidos; registra `provider` o `fallback`. |
| 5a | `Contact Form Delivered` | El proveedor aceptó el correo. Es el contacto cualificado confirmado. |
| 5b | `Contact Fallback Used` | El visitante abrió el correo prellenado. Es intención, no entrega confirmada. |

### Fórmulas

- Conversión de producto a intención cualificada: `Contact Form Validated / Product Viewed`.
- Conversión comercial confirmada: `Contact Form Delivered / Product Viewed`.
- Pérdida por entrega: `1 - (Contact Form Delivered / Contact Form Validated)`.
- Dependencia del fallback: `Contact Fallback Used / Contact Form Validated`.

Mientras `RESEND_API_KEY` no esté configurada, la conversión comercial confirmada no se declarará distinta de cero con base exclusiva en eventos.

## Primer experimento de propuesta

El baseline limpio comienza el 18 de julio de 2026 a las 00:00, hora de Chicago, después de las pruebas de producción. El experimento comienza después de 14 días de baseline o 100 sesiones de producto, lo que ocurra más tarde; por tiempo, la fecha más temprana posible es el 1 de agosto de 2026.

- **Control:** “Hablemos de tu operación”.
- **Variante:** “Evalúa qué producto encaja en tu operación”.
- **Métrica primaria:** `Contact Form Validated / Product Viewed`.
- **Guardrail:** no reducir `Product CTA Clicked / Product Viewed` más de 10%.
- **Segmentación:** producto e idioma; no mezclar resultados EN y ES.
- **Decisión:** mantener la variante únicamente si mejora al menos 15% sin romper el guardrail.

No se publicará evidencia de uso, clientes o resultados hasta contar con autorización y una fuente verificable.
