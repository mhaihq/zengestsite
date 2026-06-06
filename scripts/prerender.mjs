// Build-time prerender for the ZenGest SPA.
//
// Runs LOCALLY (not in Vercel CI): serves the built `dist/` with a tiny static
// server (SPA fallback to index.html), then drives headless Chromium via
// Puppeteer to load each route, wait until the SEO component's useEffect has
// injected the <head> tags (the <link rel="canonical"> is the signal — for
// blog posts it appears only AFTER the Sanity fetch resolves), and serialize
// the resulting DOM to `dist/<route>/index.html`.
//
// Usage:  pnpm build && pnpm prerender   (or: pnpm build:prerender)
//
// Vercel just serves the committed static files — no Puppeteer in CI.
//
// NOTE: we drive Puppeteer directly rather than via @prerenderer/* because
// that renderer's wait mechanism is incompatible with Puppeteer 25 ("Promise
// was collected"). Direct control is simpler and more reliable here.

import { fileURLToPath } from 'node:url'
import { dirname, join, resolve, extname } from 'node:path'
import { mkdir, writeFile, readFile, stat } from 'node:fs/promises'
import { createServer } from 'node:http'
import puppeteer from 'puppeteer'
import { createClient } from '@sanity/client'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = resolve(__dirname, '..')
const DIST = join(ROOT, 'dist')
const PORT = 5179

// ── Static routes to prerender ──────────────────────────────────────────────
// Indexable marketing/content pages. We also prerender the noindex Hana pages
// so their `<meta robots="noindex">` ends up in the static HTML (otherwise a
// crawler hitting them gets the default index,follow shell).
const STATIC_ROUTES = [
  '/', '/pricing', '/about', '/sicurezza', '/termini', '/dpa', '/terms',
  '/blog', '/video',
  '/vs/psicogest', '/vs/gesto', '/vs/appuntoo', '/vs/chatgpt',
  // noindex (kept routed):
  '/research', '/state-of-ai', '/contact',
]

// Routes excluded from the sitemap (noindex / low value).
const SITEMAP_EXCLUDE = new Set(['/research', '/state-of-ai', '/contact', '/terms'])

// Per-route sitemap priority/changefreq hints.
const SITEMAP_HINTS = {
  '/': { priority: '1.0', changefreq: 'weekly' },
  '/pricing': { priority: '0.9', changefreq: 'monthly' },
  '/video': { priority: '0.8', changefreq: 'monthly' },
  '/blog': { priority: '0.8', changefreq: 'weekly' },
  '/about': { priority: '0.7', changefreq: 'monthly' },
  '/sicurezza': { priority: '0.7', changefreq: 'monthly' },
}

const MIME = {
  '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css',
  '.json': 'application/json', '.png': 'image/png', '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.webp': 'image/webp',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2',
  '.txt': 'text/plain', '.webmanifest': 'application/manifest+json',
}

// Static file server with SPA fallback to the ORIGINAL (un-prerendered) shell.
async function startServer() {
  const shell = await readFile(join(DIST, 'index.html'))
  const server = createServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent((req.url || '/').split('?')[0])
      let filePath = join(DIST, urlPath)
      // If it's a real file, serve it; else SPA-fallback to the shell.
      let isFile = false
      try { isFile = (await stat(filePath)).isFile() } catch {}
      if (isFile) {
        const body = await readFile(filePath)
        res.writeHead(200, { 'Content-Type': MIME[extname(filePath)] || 'application/octet-stream' })
        res.end(body)
      } else {
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.end(shell)
      }
    } catch (e) {
      res.writeHead(500); res.end(String(e))
    }
  })
  await new Promise((r) => server.listen(PORT, r))
  return server
}

// ── Enumerate blog slugs from Sanity (public CDN read) ──────────────────────
// Blog posts ARE prerendered (the in-page Sanity fetch is proxied through Node
// during render to dodge CORS — see request interception below). Pass
// `--no-blog` to skip them (e.g. if Sanity is unreachable).
const INCLUDE_BLOG = !process.argv.includes('--no-blog')

async function getBlogRoutes() {
  if (!INCLUDE_BLOG) return []
  const client = createClient({
    projectId: 'nutut50l', dataset: 'production', apiVersion: '2026-05-30', useCdn: true,
  })
  try {
    const slugs = await client.fetch(
      `*[_type == "post" && defined(titolo) && defined(slug)].slug.current`,
    )
    const routes = (slugs || []).filter(Boolean).map((s) => `/blog/${s}`)
    console.log(`  Sanity: found ${routes.length} blog post(s)`)
    return routes
  } catch (err) {
    console.warn(`  ⚠ Sanity slug fetch failed (${err.message}); skipping blog posts`)
    return []
  }
}

// "/" -> dist/index.html ; "/vs/gesto" -> dist/vs/gesto/index.html
function outputPathFor(route) {
  if (route === '/') return join(DIST, 'index.html')
  return join(DIST, route.replace(/^\//, ''), 'index.html')
}

const SITE = 'https://zengest.it'

// This script owns dist/sitemap.xml (the old static public/sitemap.xml was
// removed). It is regenerated on every prerender run from the live routes.
// Write dist/sitemap.xml from the indexable routes (excludes noindex pages).
async function writeSitemap(routes) {
  const today = new Date().toISOString().slice(0, 10)
  const urls = routes
    .filter((r) => !SITEMAP_EXCLUDE.has(r))
    .map((r) => {
      const h = SITEMAP_HINTS[r] || { priority: '0.6', changefreq: 'monthly' }
      const loc = r === '/' ? `${SITE}/` : `${SITE}${r}`
      return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${h.changefreq}</changefreq>\n    <priority>${h.priority}</priority>\n  </url>`
    })
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join('\n')}\n</urlset>\n`
  await writeFile(join(DIST, 'sitemap.xml'), xml, 'utf8')
  console.log(`  sitemap.xml: ${urls.length} URLs`)
}

async function main() {
  const blogRoutes = await getBlogRoutes()
  const routes = [...STATIC_ROUTES, ...blogRoutes]
  console.log(`Prerendering ${routes.length} route(s)…`)

  const server = await startServer()
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  })

  let ok = 0, failed = 0
  try {
    for (const route of routes) {
      const page = await browser.newPage()
      try {
        // The blog pages fetch Sanity client-side, but the headless origin
        // (localhost) isn't in the project's CORS allowlist, so the browser
        // fetch fails (ERR_FAILED). Intercept Sanity API requests and proxy
        // them through Node (no CORS) so the page's data load succeeds.
        await page.setRequestInterception(true)
        page.on('request', async (req) => {
          const url = req.url()
          if (/\.api(cdn)?\.sanity\.io\//.test(url)) {
            try {
              const r = await fetch(url, { headers: { Accept: 'application/json' } })
              const body = await r.text()
              await req.respond({
                status: r.status,
                headers: { 'content-type': 'application/json', 'access-control-allow-origin': '*' },
                body,
              })
            } catch {
              await req.abort()
            }
          } else {
            await req.continue()
          }
        })

        await page.goto(`http://localhost:${PORT}${route}`, {
          waitUntil: 'domcontentloaded', timeout: 30000,
        })
        // Wait until the SEO effect has injected the canonical link FOR THIS
        // route specifically. Matching the route (not just "any canonical")
        // avoids snapshotting a transient/default state — critical for blog
        // posts, whose canonical appears only after the async Sanity fetch.
        const expectedCanonical = `https://zengest.it${route === '/' ? '/' : route}`
        await page.waitForFunction(
          (expected) => {
            const el = document.querySelector('link[rel="canonical"]')
            return !!el && el.getAttribute('href') === expected
          },
          { timeout: 30000 },
          expectedCanonical,
        )
        const html = await page.content()
        if (html.length < 200) throw new Error('empty/short HTML')
        const out = outputPathFor(route)
        await mkdir(dirname(out), { recursive: true })
        await writeFile(out, html.trim() + '\n', 'utf8')
        console.log(`  ✓ ${route}`)
        ok++
      } catch (err) {
        console.warn(`  ✗ ${route} — ${err.message}`)
        failed++
      } finally {
        await page.close()
      }
    }
  } finally {
    await browser.close()
    server.close()
  }

  // Regenerate the sitemap from the routes we just rendered (indexable only).
  await writeSitemap(routes)

  console.log(`\nDone: ${ok} route(s) written, ${failed} failed.`)
  if (ok === 0) process.exit(1)
}

main().catch((err) => { console.error(err); process.exit(1) })
