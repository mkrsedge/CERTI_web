# getcerti.com — deployment

## What this repo is now

A hand-built static site. **No framework and no build step.** The previous Next.js
application was replaced in the `redesign` branch; it remains in git history on `main`
if anything needs recovering.

- `out/` — everything that gets served. This is what Cloudflare Pages publishes.
- `assets-src/` — versioned but **never served**: the Seedance source clips the
  Intelligence film was conformed from, retired logo artwork, and the two superseded
  legal PDFs. Kept because regenerating the clips would cost ~216 Seedance credits.

## Cloudflare Pages settings — unchanged

Deliberately kept compatible with the existing project so **nothing needs editing in the
dashboard**:

| Setting | Value |
|---|---|
| Build command | `npm run build` (now a no-op `echo`) |
| Build output directory | `out` (also declared in `wrangler.toml`) |
| Node version | `.nvmrc` → 20.11.1 |

`npm install` finds no dependencies and succeeds; `npm run build` prints a line and exits 0.

## One thing that must be done in the dashboard

Host-level redirects are applied by Pages only *after* a request has reached this
project, so the `www` → apex rule in `out/_redirects` is a mirror rather than the real
mechanism. Create the actual rule at **Rules → Redirect Rules**:

- If **hostname equals** `www.getcerti.com`
- Then **dynamic redirect** to `concat("https://getcerti.com", http.request.uri.path)`
- Status **301**, preserve query string

Before this deploy both `www.getcerti.com` and `getcerti.com` returned 200 for every
path, which is duplicate content. The whole site canonicalises to the apex.

## Local preview

```bash
npm run dev      # serves out/ on http://localhost:4180
```

## After going live

1. Resubmit `https://getcerti.com/sitemap.xml` in Search Console.
2. Expect a temporary ranking wobble: `/en/`, `/tr/`, `/blog/` and 14 blog stubs now
   301 to `/`. All were thin or duplicate pages, so this is a cleanup, but Google takes
   a few weeks to settle.
3. `out/_redirects` carries the full map. Add a 301 for **every** URL you ever change.
