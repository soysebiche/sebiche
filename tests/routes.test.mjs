import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import net from 'node:net'
import { after, before, test } from 'node:test'

const host = '127.0.0.1'
const nextCli = new URL('../node_modules/next/dist/bin/next', import.meta.url).pathname
const routes = [
  ['/', 'SEBICHE'],
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
})

test('retired pages and public assets return 404', async () => {
  for (const route of retiredRoutes) {
    const response = await fetch(`${baseUrl}${route}`)

    assert.equal(response.status, 404, `${route} should not be accessible`)
  }
})

test('sitemap contains only the corporate homepage', async () => {
  const response = await fetch(`${baseUrl}/sitemap.xml`)
  const body = await response.text()
  const locations = body.match(/<loc>/g) ?? []

  assert.equal(locations.length, 1)
  assert.match(body, /<loc>https:\/\/sebiche\.com<\/loc>/i)
  assert.doesNotMatch(body, /case-studies|menu-board|\/pizza|\/entrees/i)
  assert.doesNotMatch(body, /sebiche\.vercel\.app/i)
})

test('language preference uses cookie before Accept-Language', async () => {
  const spanishResponse = await fetch(baseUrl, {
    headers: { 'accept-language': 'es-MX,es;q=0.9,en;q=0.8' },
  })
  const spanishBody = await spanishResponse.text()

  assert.match(spanishBody, /<html lang="es-419"/i)
  assert.match(spanishBody, /Tu restaurante/i)

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
