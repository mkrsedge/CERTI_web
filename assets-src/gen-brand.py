#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generated brand/index.html — the brand-assets index page.

    ⚠ DO NOT RUN THIS UNLESS A BRAND PAGE IS WANTED AGAIN.

    The page it produces was REMOVED on the user's instruction (2026-09-10): a browsable
    index at /brand/ was itself a form of advertising the directory. /brand/ now returns
    404 and the 24 files are reachable only by their exact URLs. Running this script
    recreates the page, and copying it into out/ would put it back on the live site.

    Kept rather than deleted because the file inventory below, the per-colourway grounds
    and the do/don't copy are the useful part, and they would have to be rewritten from
    scratch if a brand page is ever wanted — as a page here, in a PDF, or in a deck.

WHAT /brand/ LOOKS LIKE NOW
    24 files under brand/<colourway>/<svg|png>/ plus brand/CERTI-logo-pack.zip. No HTML.
    Cloudflare Pages serves no directory listing, so /brand/, /brand/charcoal/ and
    /brand/charcoal/svg/ all 404.

    Nothing links to it, it is not in sitemap.xml, and out/_headers serves /brand/* with
    X-Robots-Tag: noindex, nofollow. There is deliberately no "Disallow: /brand/" in
    robots.txt: that file is world-readable, so a Disallow line would publish the very
    path we are not advertising. See the comment in _headers.

    It is UNADVERTISED, not private. Anyone holding a file URL can fetch it, and CORS is
    open so it can be hot-linked. If it ever needs to be genuinely restricted, that is
    Cloudflare Access in front of /brand/*, which would also break hot-linking.
"""

import io
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VER = '20260910'
SITE = 'https://getcerti.com'

# The delivered pack: three colourways x four lockups, SVG + PNG.
# `ground` is what each colourway must be previewed on to be visible at all - the Paper
# cut is near-white, so showing it on the page's own cream would render an invisible tile.
COLOURWAYS = [
    dict(
        key='charcoal', name='Charcoal', hex='#2C2C34', ground='var(--bg-2)',
        note='The default. Use it on paper, on white and on any light ground.',
        svg_suffix='_Charcoal', png_suffix='_Charcoal_4x', png_kind='Transparent PNG',
    ),
    dict(
        key='paper', name='Paper', hex='#FCFCFC', ground='var(--ink)',
        note='The reverse cut, for dark grounds and photography. Never on light.',
        svg_suffix='_Paper', png_suffix='_Paper_4x', png_kind='Transparent PNG',
    ),
    dict(
        key='plum', name='Plum', hex='#50354B', ground='#CBCBFF',
        note='The signature colourway. The PNGs ship on lavender rather than '
             'transparent, so use the SVG if you need it on your own ground.',
        svg_suffix='_Plum', png_suffix='_Plum_on_Lavender', png_kind='PNG on lavender',
    ),
]

LOCKUPS = [
    dict(stem='CERTI_Horizontal', name='Horizontal', vb='1273 536',
         use='Navigation bars, email signatures, anywhere wide and short.'),
    dict(stem='CERTI_Vertical', name='Vertical', vb='752 936',
         use='Square-ish spaces: slides, posters, stationery.'),
    dict(stem='CERTI_Vertical_Continuous_Quality', name='Vertical + tagline', vb='764 1014',
         use='Where the logo has room to introduce itself. Not below ~120px wide.'),
    dict(stem='CERTI_Symbol', name='Symbol', vb='723 723',
         use='Avatars, favicons, app tiles — anywhere the wordmark would be unreadable.'),
]


def tile(c, l):
    svg = '/brand/%s/svg/%s%s.svg' % (c['key'], l['stem'], c['svg_suffix'])
    png = '/brand/%s/png/%s%s.png' % (c['key'], l['stem'], c['png_suffix'])
    return '''        <li class="bcard">
          <div class="bcard__stage" style="--ground:%(ground)s">
            <img src="%(svg)s" alt="CERTI %(lock)s lockup, %(colour)s" loading="lazy" decoding="async" />
          </div>
          <div class="bcard__meta">
            <h3>%(lock)s</h3>
            <p>%(use)s</p>
            <p class="bcard__files">
              <a href="%(svg)s" download>SVG</a>
              <a href="%(png)s" download>PNG</a>
            </p>
          </div>
        </li>''' % dict(ground=c['ground'], svg=svg, png=png, lock=l['name'],
                        colour=c['name'], use=l['use'])


def section(c):
    tiles = '\n'.join(tile(c, l) for l in LOCKUPS)
    return '''
      <section class="bsec" id="%(key)s">
        <div class="bsec__head">
          <span class="bsec__swatch" style="background:%(hex)s"></span>
          <div>
            <h2>%(name)s</h2>
            <p>%(note)s <code>%(hex)s</code> &middot; SVG plus 4&times; %(kind)s.</p>
          </div>
        </div>
        <ul class="bgrid">
%(tiles)s
        </ul>
      </section>''' % dict(key=c['key'], hex=c['hex'], name=c['name'],
                           note=c['note'], kind=c['png_kind'], tiles=tiles)


PAGE = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Brand Assets | CERTI</title>
  <meta name="description" content="CERTI logo files: horizontal, vertical, tagline and symbol lockups in charcoal, paper and plum, as SVG and 4x PNG." />

  <!-- Unlisted. noindex here as well as in the X-Robots-Tag header on /brand/*, because
       a meta tag travels with the file if it is ever copied somewhere that has no headers.
       No canonical: this page is not competing for a query and should not be presented as
       the canonical version of anything. -->
  <meta name="robots" content="noindex, nofollow" />

  <meta name="theme-color" content="#F7F6F2" />
  <link rel="icon" type="image/png" href="/img/favicon.png" />
  <link rel="apple-touch-icon" href="/img/favicon.png" />

  <link rel="preload" href="/fonts/ApfelGrotezk-Fett.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/Switzer-400.woff2" as="font" type="font/woff2" crossorigin />

  <link rel="stylesheet" href="/css/style.css?v=%(ver)s" />
</head>
<body>
  <div class="grain" aria-hidden="true"></div>

  <header class="container legal__head dpage__head">
    <a href="/" aria-label="CERTI home">
      <img class="legal__logo" src="/img/logo-horizontal.webp" alt="Certi" width="900" height="307" />
    </a>

    <span class="legal__kicker">Brand assets</span>
    <h1 class="legal__title">Logos &amp; <em>marks<span class="accent">.</span></em></h1>
    <p class="dpage__lede">
      Every CERTI lockup, in three colourways, as scalable SVG and 4&times; PNG. Take what
      you need. If you are putting CERTI in a deck, an article or a supplier portal, the
      horizontal charcoal SVG is almost always the right file.
    </p>
    <p class="bnote">
      <strong>Unlisted page.</strong> It is not linked from the site and not indexed, but
      anyone with the link can open it. Share the link freely; it is not a secret, just not
      advertised.
    </p>
  </header>

  <main class="dpage">
    <div class="container">

      <a class="bpack" href="/brand/CERTI-logo-pack.zip" download>
        <span class="bpack__label">Everything, one file</span>
        <span class="bpack__name">CERTI-logo-pack.zip</span>
        <span class="bpack__meta">24 files &middot; 2.1&nbsp;MB &middot; SVG + PNG, all three colourways</span>
      </a>

%(sections)s

      <section class="bsec">
        <div class="bsec__head">
          <span class="bsec__swatch bsec__swatch--split" aria-hidden="true"></span>
          <div>
            <h2>Using them</h2>
            <p>Short version, because nobody reads long ones.</p>
          </div>
        </div>
        <div class="bdo">
          <div>
            <h3>Please do</h3>
            <ul class="dpage__list">
              <li>Use the SVG wherever the medium allows it</li>
              <li>Leave clear space around the mark, at least the height of the symbol&rsquo;s inner ring</li>
              <li>Pick the colourway that contrasts with your ground: charcoal on light, paper on dark</li>
              <li>Scale from the corner, so the proportions hold</li>
            </ul>
          </div>
          <div>
            <h3>Please don&rsquo;t</h3>
            <ul class="dpage__list">
              <li>Recolour, outline, add shadows or gradients, or rotate it</li>
              <li>Stretch it, or rebuild the lockup by moving the wordmark and symbol apart</li>
              <li>Put the tagline lockup below about 120px wide, where it stops being legible</li>
              <li>Place a transparent mark over a busy photograph without a plate behind it</li>
            </ul>
          </div>
        </div>
      </section>

      <section class="bsec">
        <div class="bsec__head">
          <span class="bsec__swatch" style="background:var(--plum)"></span>
          <div>
            <h2>Naming us</h2>
            <p>
              The product is <strong>CERTI</strong>, set in capitals. The company is
              <strong>Maker&rsquo;s Edge Inc.</strong> One line, if you need one: CERTI is
              the AI-native quality management system for food and packaging manufacturers.
              Anything else &mdash; press, partnership, a file in a format that is not here
              &mdash; <a href="mailto:info@makers-edge.com">info@makers-edge.com</a>.
            </p>
          </div>
        </div>
      </section>

    </div>
  </main>

  <footer class="dpage__foot">
    <div class="container dpage__footgrid">
      <a href="/" class="dpage__footlogo" aria-label="CERTI home">
        <img src="/img/logo-horizontal.webp" alt="Certi" width="900" height="307" loading="lazy" decoding="async" />
      </a>
      <nav class="dpage__footnav" aria-label="Site">
        <a href="/">Home</a>
        <a href="/demos/">All demos</a>
        <a href="/book-a-demo">Book a demo</a>
        <a href="/privacy-policy">Privacy policy</a>
        <a href="/terms">Terms of use</a>
      </nav>
      <span class="dpage__footnote">&copy; 2026 CERTI. All rights reserved.</span>
    </div>
  </footer>
</body>
</html>
'''


def main():
    html = PAGE % dict(ver=VER,
                       sections='\n'.join(section(c) for c in COLOURWAYS))
    out = os.path.join(ROOT, 'brand', 'index.html')
    io.open(out, 'w', encoding='utf-8', newline='\n').write(html)
    print('brand/index.html  %.1f KB  (%d colourways x %d lockups = %d tiles)'
          % (len(html.encode('utf-8')) / 1024.0, len(COLOURWAYS), len(LOCKUPS),
             len(COLOURWAYS) * len(LOCKUPS)))

    # Every file the page points at must exist, or this ships dead download links.
    missing = []
    for c in COLOURWAYS:
        for l in LOCKUPS:
            for rel in ('%s/svg/%s%s.svg' % (c['key'], l['stem'], c['svg_suffix']),
                        '%s/png/%s%s.png' % (c['key'], l['stem'], c['png_suffix'])):
                if not os.path.isfile(os.path.join(ROOT, 'brand', rel)):
                    missing.append(rel)
    if not os.path.isfile(os.path.join(ROOT, 'brand', 'CERTI-logo-pack.zip')):
        missing.append('CERTI-logo-pack.zip')
    if missing:
        raise SystemExit('MISSING %d referenced files:\n  %s'
                         % (len(missing), '\n  '.join(missing)))
    print('all 25 referenced files present')


if __name__ == '__main__':
    main()
