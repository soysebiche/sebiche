import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import net from 'node:net'
import { after, before, test } from 'node:test'

const host = '127.0.0.1'
const nextCli = new URL('../node_modules/next/dist/bin/next', import.meta.url).pathname
const routes = [
  ['/', 'SEBICHE'],
  ['/productos/restos', 'One operational thread'],
  ['/productos/tiptrack', 'Every delivery visible'],
  ['/productos/86mise', 'Know what is on hand'],
  ['/contacto', 'Tell us where the friction is'],
  ['/manifest.webmanifest', 'Restaurant Technology'],
  ['/robots.txt', 'Sitemap: https://sebiche.com/sitemap.xml'],
  ['/sitemap.xml', '<urlset'],
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
      const response = await fetch(url)
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

test('unknown routes return the custom 404', async () => {
  const response = await fetch(`${baseUrl}/route-that-does-not-exist`)
  const body = await response.text()

  assert.equal(response.status, 404)
  assert.match(body, /Page Not Found/i)
})

test('homepage exposes canonical corporate metadata only', async () => {
  const response = await fetch(baseUrl)
  const body = await response.text()

  assert.match(body, /<title>Sebiche \| Restaurant Technology<\/title>/i)
  assert.match(body, /rel="canonical" href="https:\/\/sebiche\.com"/i)
  assert.doesNotMatch(body, /Sebastian|Napuri|Linio|Liverpool|Founder experience/i)
  assert.match(body, /href="\/productos\/restos"/i)
  assert.match(body, /href="\/productos\/tiptrack"/i)
  assert.match(body, /href="\/productos\/86mise"/i)
  assert.match(body, /href="\/contacto"/i)
  assert.match(body, /fetchPriority="high" loading="eager"/i)
  assert.match(body, /loading="lazy"[^>]+\/_next\/image\?url=%2Fholding%2Frestos\.png/i)
  assert.doesNotMatch(body, /<img[^>]+src="\/holding\//i)

  if (process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID) {
    assert.match(body, new RegExp(`googletagmanager\\.com/gtag/js\\?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`))
  }
})

test('product pages expose specific canonical metadata and honest status', async () => {
  const products = [
    ['/productos/restos', 'RestOS', 'Private pilot'],
    ['/productos/tiptrack', 'TipTrack', 'Operational PWA'],
    ['/productos/86mise', '86MISE', 'Limited operational beta'],
  ]

  for (const [route, name, status] of products) {
    const response = await fetch(`${baseUrl}${route}`)
    const body = await response.text()

    assert.equal(response.status, 200)
    assert.match(body, new RegExp(`<title>${name} \\| Sebiche<\\/title>`, 'i'))
    assert.match(body, new RegExp(`rel="canonical" href="https:\\/\\/sebiche\\.com${route}"`, 'i'))
    assert.match(body, new RegExp(status, 'i'))
    assert.match(body, new RegExp(`href="\\/contacto\\?product=${route.split('/').at(-1)}"`, 'i'))
  }
})

test('retired pages and public assets return 404', async () => {
  for (const route of retiredRoutes) {
    const response = await fetch(`${baseUrl}${route}`)

    assert.equal(response.status, 404, `${route} should not be accessible`)
  }
})

test('sitemap contains the complete corporate conversion surface', async () => {
  const response = await fetch(`${baseUrl}/sitemap.xml`)
  const body = await response.text()
  const locations = body.match(/<loc>/g) ?? []

  assert.equal(locations.length, 5)
  assert.match(body, /<loc>https:\/\/sebiche\.com<\/loc>/i)
  assert.match(body, /<loc>https:\/\/sebiche\.com\/productos\/restos<\/loc>/i)
  assert.match(body, /<loc>https:\/\/sebiche\.com\/productos\/tiptrack<\/loc>/i)
  assert.match(body, /<loc>https:\/\/sebiche\.com\/productos\/86mise<\/loc>/i)
  assert.match(body, /<loc>https:\/\/sebiche\.com\/contacto<\/loc>/i)
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

test('language preference uses cookie before Accept-Language', async () => {
  const spanishResponse = await fetch(baseUrl, {
    headers: { 'accept-language': 'es-MX,es;q=0.9,en;q=0.8' },
  })
  const spanishBody = await spanishResponse.text()

  assert.match(spanishBody, /<html lang="es-419"/i)
  assert.match(spanishBody, /Tu restaurante/i)
  assert.match(spanishBody, /Saltar al contenido/i)
  assert.match(spanishBody, /aria-label="Navegación de salto"/i)

  const cookieResponse = await fetch(baseUrl, {
    headers: {
      'accept-language': 'es-MX,es;q=0.9',
      cookie: 'sebiche-language=en',
    },
  })
  const cookieBody = await cookieResponse.text()

  assert.match(cookieBody, /<html lang="en-US"/i)
  assert.match(cookieBody, /Your restaurant/i)
})
