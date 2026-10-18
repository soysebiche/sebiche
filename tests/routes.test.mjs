import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import net from 'node:net'
import { after, before, test } from 'node:test'

const host = '127.0.0.1'
const nextCli = new URL('../node_modules/next/dist/bin/next', import.meta.url).pathname
const site = 'https://www.sebiche.com'
const routes = [
  ['/en', 'Your restaurant'],
  ['/es', 'Tu restaurante'],
  ['/en/products/restos', 'Every order on one screen'],
  ['/es/productos/restos', 'Todos tus pedidos en una pantalla'],
  ['/en/products/tiptrack', 'Every delivery in sight'],
  ['/es/productos/tiptrack', 'Cada entrega a la vista'],
  ['/en/products/86mise', 'Know what’s on the shelf'],
  ['/es/productos/86mise', 'Ten claro qué hay en tu cámara'],
  ['/en/contact', 'Tell us where the shift breaks'],
  ['/es/contacto', 'Cuéntanos dónde se rompe el turno'],
  ['/manifest.webmanifest', 'Restaurant Technology'],
  ['/robots.txt', `Sitemap: ${site}/sitemap.xml`],
  ['/sitemap.xml', '<urlset'],
]
const products = [
  ['restos', 'RestOS', 'Private pilot · by invitation', 'Piloto privado · por invitación'],
  ['tiptrack', 'TipTrack', 'Web app in service', 'App web en servicio'],
  ['86mise', '86MISE', 'Limited beta · by invitation', 'Beta limitada · por invitación'],
]
const retiredRoutes = [
  '/case-studies/linio',
  '/case-studies/liverpool',
  '/entrees',
  '/menu-board',
  '/pizza',
  '/sebastian.jpg',
  '/sebastian.webp',
  '/projects/linio.webp',
  '/projects/liverpool.webp',
  '/menu/entrees.jpg',
  '/menu/pizza.jpg',
]

let baseUrl
let server
let serverOutput = ''

function getAvailablePort() {
  return new Promise((resolve, reject) => {
    const probe = net.createServer()
    probe.once('error', reject)
    probe.listen(0, host, () => {
      const address = probe.address()
      probe.close(() => resolve(address.port))
    })
  })
}

async function waitForServer(url) {
  const deadline = Date.now() + 20_000

  while (Date.now() < deadline) {
    try {
      const response = await fetch(`${url}/en`)
      if (response.ok) return
    } catch {
      // The server is still starting.
    }

    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  throw new Error(`Next.js did not start in time.\n${serverOutput}`)
}

before(async () => {
  const port = await getAvailablePort()
  baseUrl = `http://${host}:${port}`
  server = spawn(process.execPath, [nextCli, 'start', '--hostname', host, '--port', String(port)], {
    cwd: new URL('..', import.meta.url),
    env: { ...process.env, NODE_ENV: 'production' },
    stdio: ['ignore', 'pipe', 'pipe'],
  })

  server.stdout.on('data', (chunk) => { serverOutput += chunk })
  server.stderr.on('data', (chunk) => { serverOutput += chunk })

  await waitForServer(baseUrl)
})

after(async () => {
  if (!server || server.exitCode !== null) return

  server.kill('SIGTERM')
  await Promise.race([
    new Promise((resolve) => server.once('exit', resolve)),
    new Promise((resolve) => setTimeout(resolve, 2_000)),
  ])
})

for (const [route, expectedText] of routes) {
  test(`GET ${route}`, async () => {
    const response = await fetch(`${baseUrl}${route}`)
    const body = await response.text()

    assert.equal(response.status, 200)
    assert.match(body, new RegExp(expectedText, 'i'))
  })
}

function escape(value) {
  return value.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')
}

async function redirectFor(route, headers = {}) {
  const response = await fetch(`${baseUrl}${route}`, { headers, redirect: 'manual' })
  return { status: response.status, location: new URL(response.headers.get('location') ?? '', baseUrl).pathname + new URL(response.headers.get('location') ?? '', baseUrl).search }
}

test('unknown routes return the custom 404', async () => {
  for (const route of ['/route-that-does-not-exist', '/fr', '/en/route-that-does-not-exist']) {
    const response = await fetch(`${baseUrl}${route}`)
    const body = await response.text()

    assert.equal(response.status, 404, route)
    assert.match(body, /Page Not Found/i)
  }
})

test('localized segments only exist in their own language', async () => {
  for (const route of ['/en/productos/restos', '/es/products/restos', '/en/contacto', '/es/contact', '/es/productos/unknown']) {
    const response = await fetch(`${baseUrl}${route}`)
    assert.equal(response.status, 404, `${route} should not be accessible`)
  }
})

test('the bare root and legacy URLs redirect by cookie, then Accept-Language', async () => {
  assert.deepEqual(await redirectFor('/'), { status: 307, location: '/en' })
  assert.deepEqual(await redirectFor('/', { 'accept-language': 'es-MX,es;q=0.9,en;q=0.8' }), { status: 307, location: '/es' })
  assert.deepEqual(await redirectFor('/', { 'accept-language': 'es-MX,es;q=0.9', cookie: 'sebiche-language=en' }), { status: 307, location: '/en' })
  assert.deepEqual(await redirectFor('/productos/tiptrack', { 'accept-language': 'es' }), { status: 307, location: '/es/productos/tiptrack' })
  assert.deepEqual(await redirectFor('/productos/tiptrack'), { status: 307, location: '/en/products/tiptrack' })
  assert.deepEqual(await redirectFor('/contacto?product=86mise', { 'accept-language': 'es' }), { status: 307, location: '/es/contacto?product=86mise' })
  assert.deepEqual(await redirectFor('/contacto?product=86mise'), { status: 307, location: '/en/contact?product=86mise' })
})

test('pages are prerendered, not rendered per request', async () => {
  for (const route of ['/en', '/es', '/en/products/restos', '/es/contacto']) {
    const response = await fetch(`${baseUrl}${route}`)
    await response.text()

    assert.doesNotMatch(response.headers.get('cache-control') ?? '', /no-store/, route)
  }
})

test('homepages expose localized metadata, canonical and hreflang', async () => {
  const pages = [
    ['en', 'en-US', 'Sebiche \\| Restaurant Technology', 'Your restaurant'],
    ['es', 'es-419', 'Sebiche \\| Tecnología para restaurantes', 'Tu restaurante'],
  ]

  for (const [language, htmlLang, title, heading] of pages) {
    const response = await fetch(`${baseUrl}/${language}`)
    const body = await response.text()

    assert.match(body, new RegExp(`<html lang="${htmlLang}"`, 'i'))
    assert.match(body, new RegExp(`<title>${title}</title>`, 'i'))
    assert.match(body, new RegExp(heading, 'i'))
    assert.match(body, new RegExp(`rel="canonical" href="${escape(site)}/${language}"`, 'i'))
    assert.match(body, new RegExp(`rel="alternate" hrefLang="en-US" href="${escape(site)}/en"`, 'i'))
    assert.match(body, new RegExp(`rel="alternate" hrefLang="es-419" href="${escape(site)}/es"`, 'i'))
    assert.match(body, new RegExp(`rel="alternate" hrefLang="x-default" href="${escape(site)}/?"`, 'i'))
    assert.match(body, new RegExp(`property="og:image" content="${escape(site)}/${language}/opengraph-image`, 'i'))
    assert.doesNotMatch(body, /https:\/\/sebiche\.com/i)
  }
})

test('homepage exposes corporate content and localized links only', async () => {
  const response = await fetch(`${baseUrl}/en`)
  const body = await response.text()

  assert.doesNotMatch(body, /Sebastian|Napuri|Linio|Liverpool|Founder experience/i)
  assert.match(body, /href="\/en\/products\/restos"/i)
  assert.match(body, /href="\/en\/products\/tiptrack"/i)
  assert.match(body, /href="\/en\/products\/86mise"/i)
  assert.match(body, /href="\/en\/contact"/i)
  assert.match(body, /hrefLang="es-419"[^>]*href="\/es"/i)
  assert.match(body, /Skip to content/i)
  assert.match(body, /fetchPriority="high" loading="eager"/i)
  assert.match(body, /loading="lazy"[^>]+\/_next\/image\?url=%2Fholding%2Frestos\.png/i)
  assert.doesNotMatch(body, /<img[^>]+src="\/holding\//i)

  const spanish = await (await fetch(`${baseUrl}/es`)).text()
  assert.match(spanish, /href="\/es\/productos\/restos"/i)
  assert.match(spanish, /href="\/es\/contacto"/i)
  assert.match(spanish, /Saltar al contenido/i)
  assert.match(spanish, /aria-label="Navegación de salto"/i)

  const expectedMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-X9SVKLLCBY'
  assert.match(body, new RegExp(`googletagmanager\\.com/gtag/js\\?id=${expectedMeasurementId}`))
  assert.match(body, new RegExp(`gtag\\('config','${expectedMeasurementId}'\\)`))
})

test('product pages expose localized canonical metadata and honest status', async () => {
  for (const [slug, name, englishStatus, spanishStatus] of products) {
    for (const [route, status, contact] of [
      [`/en/products/${slug}`, englishStatus, '/en/contact'],
      [`/es/productos/${slug}`, spanishStatus, '/es/contacto'],
    ]) {
      const response = await fetch(`${baseUrl}${route}`)
      const body = await response.text()

      assert.equal(response.status, 200)
      assert.match(body, new RegExp(`<title>${name} \\| Sebiche<\\/title>`, 'i'))
      assert.match(body, new RegExp(`rel="canonical" href="${escape(site + route)}"`, 'i'))
      assert.match(body, new RegExp(`hrefLang="en-US" href="${escape(`${site}/en/products/${slug}`)}"`, 'i'))
      assert.match(body, new RegExp(`hrefLang="es-419" href="${escape(`${site}/es/productos/${slug}`)}"`, 'i'))
      assert.match(body, new RegExp(status, 'i'))
      assert.match(body, new RegExp(`href="${escape(`${contact}?product=${slug}`)}"`, 'i'))
      assert.match(body, /"@type":"BreadcrumbList"/)
    }
  }
})

test('share images render for every page', async () => {
  for (const route of ['/en', '/es', '/en/products/restos', '/es/productos/86mise']) {
    const body = await (await fetch(`${baseUrl}${route}`)).text()
    const image = body.match(/property="og:image" content="([^"]+)"/)?.[1]
    assert.ok(image, `${route} has an og:image`)

    const response = await fetch(`${baseUrl}${new URL(image).pathname}${new URL(image).search}`)
    assert.equal(response.status, 200, `${route} og:image`)
    assert.equal(response.headers.get('content-type'), 'image/png')
  }
})

test('retired pages and public assets return 404', async () => {
  for (const route of retiredRoutes) {
    const response = await fetch(`${baseUrl}${route}`)

    assert.equal(response.status, 404, `${route} should not be accessible`)
  }
})

test('sitemap lists every page in both languages with hreflang alternates', async () => {
  const response = await fetch(`${baseUrl}/sitemap.xml`)
  const body = await response.text()
  const locations = body.match(/<loc>/g) ?? []

  assert.equal(locations.length, 10)
  for (const path of ['/en', '/es', '/en/products/restos', '/es/productos/restos', '/en/products/tiptrack', '/es/productos/tiptrack', '/en/products/86mise', '/es/productos/86mise', '/en/contact', '/es/contacto']) {
    assert.match(body, new RegExp(`<loc>${escape(site + path)}</loc>`, 'i'))
  }
  assert.match(body, /hreflang="es-419"/i)
  assert.match(body, /hreflang="x-default"/i)
  assert.doesNotMatch(body, /https:\/\/sebiche\.com/i)
  assert.doesNotMatch(body, /case-studies|menu-board|\/pizza|\/entrees/i)
  assert.doesNotMatch(body, /sebiche\.vercel\.app/i)
})

test('contact endpoint validates input and fails safely when delivery is not configured', async () => {
  const invalidResponse = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ name: 'Test' }),
  })
  assert.equal(invalidResponse.status, 400)

  const fallbackResponse = await fetch(`${baseUrl}/api/contact`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      name: 'Test User',
      email: 'test@example.com',
      restaurant: 'Test Restaurant',
      product: 'restos',
      message: 'We need to improve our order workflow.',
      language: 'en',
      website: '',
    }),
  })
  assert.equal(fallbackResponse.status, 503)
  assert.deepEqual(await fallbackResponse.json(), { ok: false, code: 'CONTACT_NOT_CONFIGURED' })
})
