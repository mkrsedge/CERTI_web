#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generates the nine standalone demo pages, the /demos/ hub, /book-a-demo and sitemap.xml.

WHY THIS EXISTS
    Every quickstart demo used to live only inside a modal on the homepage, which meant
    nine pieces of genuinely distinct content shared one URL. Nothing was linkable and
    nothing was indexable. These pages give each demo a real URL that returns 200, carries
    its own title, description and OG image, and has its own place in the sitemap.

    The homepage modal is still the primary way people open a demo. It just calls
    history.pushState() to the matching URL now (see the quickstart section of js/main.js),
    so sharing from the modal yields a real page and Back closes the modal.

HOW TO USE
    python assets-src/gen-pages.py       # writes into the repo root
    Then mirror the tree into the deploy repo's out/ as usual.

    Card copy (tag, name, quote, lede, image, alt) is READ OUT OF index.html at generation
    time rather than duplicated here. That is deliberate: the first draft of this file
    duplicated it and five of the nine had already drifted from the homepage within the
    hour. Edit a card in index.html and re-run this; the pages follow.
"""

import io
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VER = '20260909'          # asset cache-busting version; must match index.html
TODAY = '2026-09-09'
SITE = 'https://getcerti.com'
ARCADE_PARAMS = '?embed&embed_mobile=inline&embed_desktop=inline&show_copy_link=true'

# ── The nine demos ────────────────────────────────────────────────────────────────────
# Only fields that exist ONLY here are listed. See load_cards() for the rest.
#
# slug     : URL segment under /demos/
# title    : <title>, kept short enough not to truncate in results
# metadesc : ~150-160 chars, written for a human rather than stuffed
# body     : two paragraphs of page copy
# bullets  : three lines describing the job
# aspect   : the Arcade recording's height/width as a percentage. PER DEMO, never a
#            constant. Measure it at demo.arcade.software/<id> (largest asset height
#            divided by its width). A wrong value hands the player the wrong shape and
#            clips the 41px control bar its own buttons live in.
DEMOS = [
    dict(
        key='capa', num='01', slug='quality-investigations-capa',
        arcade='PWBNgAKPv8EJf19bvGFh', aspect='49.296875',
        title='CAPA &amp; Quality Investigation Software Demo | CERTI',
        metadesc='See how CERTI investigates a complaint, drafts the CAPA in your '
                 'auditor&rsquo;s format, chases approvers and verifies the fix held. '
                 'Interactive demo, no signup.',
        body=[
            'A complaint arrives and the clock starts. The work that follows is mostly '
            'assembly: pulling the batch record, the maintenance log, the line clearance '
            'and the photographs, then arguing your way to a root cause you can defend. '
            'CERTI does that assembly and proposes the causes with the evidence attached '
            'to each one, so the judgement left to you is the part that genuinely needs a '
            'human.',
            'The CAPA itself is drafted in the format your scheme expects, with the '
            'references filled in, and approvers are chased without anyone having to '
            'remember to chase them. Once the action closes, effectiveness is checked '
            'against later records rather than marked complete and forgotten &mdash; which '
            'is the step whose absence turns a closed CAPA into a repeat finding.',
        ],
        bullets=[
            'A complaint taken from intake through to a defensible root cause',
            'Every hypothesis carrying the records that support or kill it',
            'The CAPA drafted for your scheme, then verified after it closes',
        ],
    ),
    dict(
        key='supplier', num='02', slug='supplier-incoming-quality',
        arcade='R7wWuEgkyR5pzHUZqFZe', aspect='52.96875',
        title='Supplier Quality &amp; COA Verification Demo | CERTI',
        metadesc='Watch every COA checked against spec on arrival, bad lots caught before '
                 'they reach your floor, and suppliers risk-ranked on real performance.',
        body=[
            'Incoming quality fails quietly. A certificate is filed without being read, a '
            'value sits just outside spec, an approval lapses between audits. None of it '
            'announces itself, and all of it resurfaces later as a deviation, a hold or a '
            'finding. The check that would have caught it is dull, repetitive and exactly '
            'the kind of work that gets skipped under pressure.',
            'Here every certificate of analysis is read against the specification of '
            'record as it arrives, and anything out of tolerance is raised before the lot '
            'moves. Supplier standing is then built from what actually happened across '
            'deliveries rather than from a questionnaire filled in once at approval, so '
            'the ranking reflects performance instead of intent.',
        ],
        bullets=[
            'A COA read against the spec of record at goods-in',
            'Out-of-tolerance results raised before the lot reaches production',
            'Suppliers ranked on delivered performance, not a one-off questionnaire',
        ],
    ),
    dict(
        key='gfsi', num='03', slug='gfsi-compliance',
        arcade='465sEDzrBECGDiVaVyxP', aspect='52.96875',
        title='GFSI Audit Compliance Software Demo | CERTI',
        metadesc='See records mapped to every standard you are held to, gaps surfaced '
                 'continuously, and the full evidence pack assembled on demand. '
                 'Interactive GFSI demo.',
        body=[
            'Audit preparation is usually a retrieval problem rather than a compliance '
            'one. The records exist. Proving which clause each one answers, for several '
            'schemes at once, is the part that eats weeks &mdash; and it gets redone from '
            'scratch every cycle, because the mapping lives in someone&rsquo;s head or in '
            'a spreadsheet that quietly went stale.',
            'This walkthrough shows documentation linked to the requirements it satisfies, '
            'so coverage is a standing fact rather than an annual scramble. Gaps show up '
            'while there is still time to close them, and when an auditor or a customer '
            'asks for evidence, the pack is assembled from records already in the system.',
        ],
        bullets=[
            'Documentation linked to the clauses it actually answers',
            'Coverage gaps visible continuously, not only during audit prep',
            'An evidence pack built from existing records on request',
        ],
    ),
    dict(
        key='docs', num='04', slug='documentation-change-management',
        arcade='YvtoXxmJ1J5wov3f6bZQ', aspect='52.96875',
        title='Document Control &amp; Change Management Demo | CERTI',
        metadesc='See one document change fan out into impact analysis, review tasks and '
                 'retraining, with every response tracked. Interactive demo, no signup '
                 'required.',
        body=[
            'A single SOP revision is never a single change. It touches the procedures '
            'that reference it, the records built from it, the people trained against the '
            'old version and, often, a clause in a scheme you are certified to. Tracking '
            'that fan-out by hand is why documentation drifts out of date between audits.',
            'In this walkthrough a change to a food safety procedure is followed all the '
            'way out: what it affects, who has to review it, what they said, and who needs '
            'retraining as a result. Responses are collected against the change itself '
            'rather than in a mailbox, so the state of a revision is a fact you can read '
            'rather than a question you have to go and ask.',
        ],
        bullets=[
            'One document change traced to everything it touches',
            'Review and acknowledgement collected against the change itself',
            'Retraining raised for the people the revision actually affects',
        ],
    ),
    dict(
        key='forms', num='05', slug='digital-forms-production-records',
        arcade='tij5FFovUpB2Osh5YYAp', aspect='49.296875',
        title='Digital Forms &amp; Production Records Demo | CERTI',
        metadesc='Watch a batch record completed on the line and a COA hold resolved '
                 'without paper. Interactive demo of CERTI digital forms, no signup '
                 'required.',
        body=[
            'Paper records fail in a particular way: the gap and the discovery are months '
            'apart. A missed check is invisible on the day and undeniable at year end, by '
            'which point the batch has shipped and the only available response is an '
            'explanation rather than a correction.',
            'The forms here keep the layout your operators already know, so there is '
            'nothing to relearn, but they refuse an entry that would be wrong instead of '
            'accepting it and leaving the problem for review. This walkthrough runs a '
            'batch record from the line through to a certificate hold resolved against the '
            'batch it belongs to.',
        ],
        bullets=[
            'A batch record completed at the point of work',
            'Mistakes blocked at entry rather than found at review',
            'A COA hold worked through against the batch it belongs to',
        ],
    ),
    dict(
        key='recall', num='06', slug='recall-readiness-traceability',
        arcade='MRaUY6TfTm2sm5CWczbA', aspect='52.96875',
        title='Recall Readiness &amp; Traceability Demo | CERTI',
        metadesc='See a production lot traced forward and back in minutes and the recall '
                 'audit record assembled from data you already hold. Interactive demo.',
        body=[
            'Traceability is only ever tested when it matters, and by then the exercise is '
            'timed. Working out where a lot went and what went into it means walking '
            'several systems and a filing cabinet, and the honest answer to whether the '
            'trace was complete is usually that nobody can be certain.',
            'This walkthrough follows a production lot in both directions &mdash; back to '
            'the incoming materials it was made from, forward to where it shipped &mdash; '
            'and assembles the audit record from what is already held. The point is not '
            'speed for its own sake. It is that the trace is reproducible, so a mock '
            'recall measures your process rather than your filing.',
        ],
        bullets=[
            'One lot traced back to incoming materials and forward to despatch',
            'The auditor-ready record assembled from existing data',
            'Gaps in the trace flagged before an auditor tests it',
        ],
    ),
    dict(
        key='label', num='07', slug='label-spec-validation',
        arcade='bP7Y8IEhBHDzW04BhAvw', aspect='49.296875',
        title='Label &amp; Spec Validation Software Demo | CERTI',
        metadesc='See an allergen mismatch caught between a supplier spec and a finished '
                 'label before it prints. Interactive demo of CERTI label and spec '
                 'validation.',
        body=[
            'Label errors rarely begin at the label. They begin upstream &mdash; a '
            'supplier reformulates, relabels its own product and never issues an updated '
            'specification &mdash; so the finished artwork is perfectly faithful to a spec '
            'that is no longer true, and every downstream check dutifully confirms it.',
            'This walkthrough starts from exactly that mismatch: an incoming label and '
            'certificate that disagree with the specification of record, and the systemic '
            'reasons it was able to reach a finished pack. What comes out of it is not '
            'just the catch, but the controls whose absence let it through.',
        ],
        bullets=[
            'A finished label checked against the specification of record',
            'An undeclared allergen traced to a supplier spec never superseded',
            'The missing controls named, not just the single error',
        ],
    ),
    dict(
        key='em', num='08', slug='environmental-monitoring',
        arcade='NCucpfdBEH56vbGUBlxQ', aspect='52.96875',
        title='Environmental Monitoring Program Demo | CERTI',
        metadesc='See the swab schedule run to plan, results trended by zone, and a '
                 'corrective response raised the moment a positive lands. Interactive '
                 'demo.',
        body=[
            'An environmental monitoring programme is a schedule, a set of limits and a '
            'trend. Most sites run the schedule reliably and lose the trend, because '
            'results land as individual certificates rather than as evidence about a zone '
            'over time. The pattern becomes visible only once it is big enough to be a '
            'problem.',
            'This walkthrough shows the programme&rsquo;s tasks managed to plan and '
            'results held against the programme itself, so a positive arrives with its '
            'history attached and the corrective response starts with it rather than after '
            'someone notices. That is the difference between reacting to one result and '
            'seeing a site drift.',
        ],
        bullets=[
            'The monitoring schedule managed as tasks rather than reminders',
            'Results trended by zone instead of filed as loose certificates',
            'A corrective response raised as soon as a positive lands',
        ],
    ),
    dict(
        key='buyer', num='09', slug='buyer-requirements-questionnaires',
        arcade='I9RyGunscamGLALWY4BO', aspect='52.96875',
        title='Buyer Questionnaire &amp; RFI Automation Demo | CERTI',
        metadesc='See retailer questionnaires and RFIs answered from your own records, '
                 'every answer cited to its source, and nothing sent without your '
                 'approval.',
        body=[
            'Buyer questionnaires ask the same twenty things in twenty different shapes. '
            'The answers already exist in your certificates, procedures and records; the '
            'cost is finding them again for every new format, and the risk is that a '
            'rushed answer claims something your records do not actually support.',
            'Here each question is answered from your own documentation with the source '
            'cited beside the answer, so the claim and its evidence travel together. '
            'Nothing goes out on your behalf &mdash; the draft waits for approval, which '
            'is the only sane default when the recipient is a customer deciding whether to '
            'list you.',
        ],
        bullets=[
            'Questionnaires and RFIs answered from records you already hold',
            'Every answer cited to the document it came from',
            'Drafts held for your approval before a buyer sees anything',
        ],
    ),
]


def load_cards():
    """Read tag / name / quote / lede / img / alt from the homepage quickstart cards.

    index.html is the source of truth for that copy. Reading it here means editing a card
    cannot silently leave these pages behind, and the two stay character-identical without
    anyone having to remember. Any structural mismatch is a hard failure rather than a
    silently half-built page.
    """
    html = io.open(os.path.join(ROOT, 'index.html'), encoding='utf-8').read()
    section = html[html.index('id="quickstarts"'):html.index('id="contact"')]
    articles = re.findall(r'<article class="mcard".*?</article>', section, re.S)
    if len(articles) != len(DEMOS):
        raise SystemExit('index.html has %d quickstart cards but DEMOS lists %d. Fix the '
                         'mismatch before generating.' % (len(articles), len(DEMOS)))

    def grab(block, pattern, what):
        m = re.search(pattern, block, re.S)
        if not m:
            raise SystemExit('could not read the %s out of a quickstart card' % what)
        return m.group(1).strip()

    for d, block in zip(DEMOS, articles):
        d['img'] = grab(block, r'<img src="(?:img/)?([^"]+)"', 'image')
        d['alt'] = grab(block, r'alt="([^"]+)"', 'alt text')
        d['tag'] = grab(block, r'class="mcard__tag">(.*?)</span>', 'tag')
        d['name'] = grab(block, r'class="mcard__name">(.*?)</h3>', 'name')
        d['quote'] = grab(block, r'class="mcard__quote">(.*?)</p>', 'quote')
        d['lede'] = grab(block, r'class="mcard__desc">(.*?)</p>', 'description')
        num = re.search(r'class="mcard__num">(\d+)</span>', block)
        if num and num.group(1) != d['num']:
            raise SystemExit('card numbering disagrees for %r: index.html says %s, DEMOS '
                             'says %s' % (d['key'], num.group(1), d['num']))


# ── Shared fragments ──────────────────────────────────────────────────────────────────

HEAD = '''<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{metadesc}" />
  <link rel="canonical" href="{canonical}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="theme-color" content="#F7F6F2" />
  <link rel="icon" type="image/png" href="/img/favicon.png" />
  <link rel="apple-touch-icon" href="/img/favicon.png" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="CERTI" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{metadesc}" />
  <meta property="og:image" content="{ogimage}" />
  <meta property="og:image:width" content="{ogw}" />
  <meta property="og:image:height" content="{ogh}" />
  <meta property="og:image:alt" content="{ogalt}" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{metadesc}" />
  <meta name="twitter:image" content="{ogimage}" />

  <link rel="preload" href="/fonts/ApfelGrotezk-Fett.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/InstrumentSerif-400i-latin.woff2" as="font" type="font/woff2" crossorigin />
  <link rel="preload" href="/fonts/Switzer-400.woff2" as="font" type="font/woff2" crossorigin />

  <link rel="stylesheet" href="/css/style.css?v={ver}" />

{jsonld}
</head>
<body>
  <div class="grain" aria-hidden="true"></div>
'''

# Deliberately smaller than the homepage footer: these are leaf pages whose job is to
# answer one question and hand the reader onward.
FOOTER = '''
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


def strip_tags(s):
    return re.sub(r'<[^>]+>', '', s)


def attr(s):
    """Copy here uses &rsquo;/&mdash; rather than literal characters, so only the double
    quote needs handling before it goes into an attribute."""
    return s.replace('"', '&quot;')


def arcade_embed(d):
    """Arcade's official wrapper, reproduced verbatim.

    The padding-bottom carries this demo's own ratio plus 41px for the player's control
    bar, which is where its fullscreen, copy-link and step controls live. Nothing of ours
    may set the iframe's width, height or aspect-ratio: that mis-scales the player's
    interactive layer and clips the control strip. Only the outer box is ours.
    """
    return (
        '<div class="dpage__frame" style="--qs-aspect:{ratio}">\n'
        '          <div style="position:relative;padding-bottom:calc({aspect}% + 41px);height:0;width:100%">\n'
        '            <iframe src="https://demo.arcade.software/{id}{params}"\n'
        '              title="{name} interactive demo"\n'
        '              frameborder="0" loading="lazy"\n'
        '              webkitallowfullscreen mozallowfullscreen allowfullscreen\n'
        '              allow="clipboard-write; fullscreen"\n'
        '              style="position:absolute;top:0;left:0;width:100%;height:100%;color-scheme:light"></iframe>\n'
        '          </div>\n'
        '        </div>'
    ).format(ratio=float(d['aspect']) / 100, aspect=d['aspect'], id=d['arcade'],
             params=ARCADE_PARAMS, name=attr(strip_tags(d['name'])))


def demo_page(d):
    canonical = '%s/demos/%s' % (SITE, d['slug'])
    others = [x for x in DEMOS if x['key'] != d['key']]

    jsonld = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "CANONICAL",
        "url": "CANONICAL",
        "name": "NAME",
        "description": "DESC",
        "isPartOf": { "@id": "SITE/#website" },
        "primaryImageOfPage": { "@type": "ImageObject", "url": "SITE/img/IMG" },
        "about": { "@id": "SITE/#organization" },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "SITE/" },
          { "@type": "ListItem", "position": 2, "name": "Demos", "item": "SITE/demos/" },
          { "@type": "ListItem", "position": 3, "name": "NAME" }
        ]
      }
    ]
  }
  </script>'''
    jsonld = (jsonld.replace('CANONICAL', canonical)
                    .replace('NAME', strip_tags(d['name']).replace('&amp;', '&'))
                    .replace('DESC', strip_tags(d['metadesc']).replace('&rsquo;', "'"))
                    .replace('IMG', d['img'])
                    .replace('SITE', SITE))

    head = HEAD.format(
        title=attr(strip_tags(d['title'])), metadesc=attr(strip_tags(d['metadesc'])),
        canonical=canonical, ogimage='%s/img/%s' % (SITE, d['img']),
        ogw='900', ogh='600', ogalt=attr(d['alt']), ver=VER, jsonld=jsonld)

    bullets = '\n'.join('            <li>%s</li>' % b for b in d['bullets'])
    body = '\n'.join('          <p>%s</p>' % p for p in d['body'])
    more = '\n'.join(
        '            <li><a href="/demos/%s"><span class="dpage__moren">%s</span>'
        '<span>%s</span></a></li>' % (x['slug'], x['num'], x['name']) for x in others)

    return head + '''
  <header class="container legal__head dpage__head">
    <a href="/" aria-label="CERTI home">
      <img class="legal__logo" src="/img/logo-horizontal.webp" alt="Certi" width="900" height="307" />
    </a>

    <nav class="dpage__crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
      <a href="/demos/">Demos</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">%(name)s</span>
    </nav>

    <span class="legal__kicker">Quickstart %(num)s &middot; %(tag)s</span>
    <h1 class="legal__title">%(name)s<span class="accent">.</span></h1>
    <p class="dpage__lede">%(lede)s</p>
  </header>

  <main class="dpage">
    <div class="container">

      <figure class="dpage__demo">
        %(embed)s
        <figcaption class="dpage__cap">
          Click through it at your own pace. It runs on sample records, nothing is
          installed, and no signup is needed.
        </figcaption>
      </figure>

      <div class="dpage__cols">
        <div class="dpage__prose">
          <blockquote class="dpage__quote">%(quote)s</blockquote>
%(body)s
        </div>

        <aside class="dpage__aside">
          <h2 class="dpage__asideh">In this walkthrough</h2>
          <ul class="dpage__list">
%(bullets)s
          </ul>
          <a href="/book-a-demo" class="btn btn--plum dpage__asidebtn">
            <span class="btn__label" data-text="Book a demo">Book a demo</span>
            <span class="btn__arrow" aria-hidden="true">&rarr;</span>
          </a>
        </aside>
      </div>

      <section class="dpage__cta">
        <h2>See it on your own quality processes<span class="accent">.</span></h2>
        <p>
          A recorded walkthrough only goes so far. Thirty minutes with the team covers your
          schemes, your records, and where a quickstart would land first.
        </p>
        <a href="/book-a-demo" class="btn btn--plum">
          <span class="btn__label" data-text="Book a demo">Book a demo</span>
          <span class="btn__arrow" aria-hidden="true">&rarr;</span>
        </a>
      </section>

      <nav class="dpage__more" aria-label="Other quickstart demos">
        <h2>The other eight quickstarts</h2>
        <ul>
%(more)s
        </ul>
      </nav>

    </div>
  </main>
''' % dict(name=d['name'], num=d['num'], tag=d['tag'], lede=d['lede'],
           embed=arcade_embed(d), quote=d['quote'], body=body,
           bullets=bullets, more=more) + FOOTER


def hub_page():
    canonical = SITE + '/demos/'
    title = 'Interactive Product Demos | CERTI'
    desc = ('Nine interactive walkthroughs of CERTI: CAPA and investigations, supplier '
            'quality, GFSI audits, document control, traceability, labels, environmental '
            'monitoring and buyer questionnaires.')

    items = ',\n'.join(
        '''          {
            "@type": "ListItem",
            "position": %d,
            "url": "%s/demos/%s",
            "name": "%s"
          }''' % (i + 1, SITE, d['slug'], strip_tags(d['name']).replace('&amp;', '&'))
        for i, d in enumerate(DEMOS))

    jsonld = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": "CANONICAL",
        "url": "CANONICAL",
        "name": "Interactive product demos",
        "description": "DESC",
        "isPartOf": { "@id": "SITE/#website" },
        "inLanguage": "en-US"
      },
      {
        "@type": "ItemList",
        "name": "CERTI quickstart demos",
        "numberOfItems": NUM,
        "itemListOrder": "https://schema.org/ItemListOrderAscending",
        "itemListElement": [
ITEMS
        ]
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "SITE/" },
          { "@type": "ListItem", "position": 2, "name": "Demos" }
        ]
      }
    ]
  }
  </script>'''
    jsonld = (jsonld.replace('CANONICAL', canonical).replace('DESC', desc)
                    .replace('NUM', str(len(DEMOS))).replace('ITEMS', items)
                    .replace('SITE', SITE))

    head = HEAD.format(
        title=attr(title), metadesc=attr(desc), canonical=canonical,
        ogimage=SITE + '/img/og-image.png', ogw='1200', ogh='630',
        ogalt='CERTI: Grow, uninterrupted.', ver=VER, jsonld=jsonld)

    cards = '\n'.join('''        <li class="dhub__item">
          <a href="/demos/%(slug)s">
            <figure class="dhub__media">
              <img src="/img/%(img)s" alt="%(alt)s" width="900" height="600" loading="%(loading)s" decoding="async" />
              <span class="dhub__num">%(num)s</span>
            </figure>
            <div class="dhub__body">
              <span class="dhub__tag">%(tag)s</span>
              <h2 class="dhub__name">%(name)s</h2>
              <p class="dhub__desc">%(lede)s</p>
              <span class="dhub__cta">View demo <i>&rarr;</i></span>
            </div>
          </a>
        </li>''' % dict(slug=d['slug'], img=d['img'], alt=attr(d['alt']), num=d['num'],
                        tag=d['tag'], name=d['name'], lede=d['lede'],
                        loading='eager' if i < 3 else 'lazy')
        for i, d in enumerate(DEMOS))

    return head + '''
  <header class="container legal__head dpage__head">
    <a href="/" aria-label="CERTI home">
      <img class="legal__logo" src="/img/logo-horizontal.webp" alt="Certi" width="900" height="307" />
    </a>

    <nav class="dpage__crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">Demos</span>
    </nav>

    <span class="legal__kicker">Interactive demos</span>
    <h1 class="legal__title">See it <em>working<span class="accent">.</span></em></h1>
    <p class="dpage__lede">
      Nine quickstarts, each one a single quality job. Every walkthrough below is the
      product itself running on sample records: click through it at your own pace, no
      signup, nothing installed.
    </p>
  </header>

  <main class="dpage">
    <div class="container">
      <ul class="dhub">
''' + cards + '''
      </ul>

      <section class="dpage__cta">
        <h2>Rather see it on your own processes<span class="accent">?</span></h2>
        <p>
          Thirty minutes with the team, against your schemes and your records. No slide
          deck, and no obligation.
        </p>
        <a href="/book-a-demo" class="btn btn--plum">
          <span class="btn__label" data-text="Book a demo">Book a demo</span>
          <span class="btn__arrow" aria-hidden="true">&rarr;</span>
        </a>
      </section>
    </div>
  </main>
''' + FOOTER


CAL_SCRIPT = '''
  <script>
  /* Cal.com's official queue stub. window.Cal must exist BEFORE embed.js runs: embed.js
     does not define it, it flushes the queue this stub creates, and invoking the stub is
     what fetches the script. Same configuration as the homepage modal (month_view, plum
     brand) so the two read as one product. */
  (function (C, A, L) {
    var p = function (a, ar) { a.q.push(ar); };
    var d = C.document;
    C.Cal = C.Cal || function () {
      var cal = C.Cal, ar = arguments;
      if (!cal.loaded) {
        cal.ns = {}; cal.q = cal.q || [];
        d.head.appendChild(d.createElement('script')).src = A;
        cal.loaded = true;
      }
      if (ar[0] === L) {
        var api = function () { p(api, arguments); };
        var namespace = ar[1];
        api.q = api.q || [];
        if (typeof namespace === 'string') {
          cal.ns[namespace] = cal.ns[namespace] || api;
          p(cal.ns[namespace], ar);
          p(cal, ['initNamespace', namespace]);
        } else { p(cal, ar); }
        return;
      }
      p(cal, ar);
    };
  })(window, 'https://app.cal.com/embed/embed.js', 'init');

  (function () {
    var mount = document.getElementById('calMount');
    if (!mount) return;

    function fallback() {
      mount.classList.remove('is-loading');
      mount.innerHTML =
        '<div class="dbook__fallback"><p>The calendar could not load here.</p>' +
        '<a class="btn btn--plum" href="https://cal.com/certi/demo" target="_blank" rel="noopener">' +
        '<span class="btn__label">Open the booking page</span></a></div>';
    }

    try {
      Cal('init', { origin: 'https://app.cal.com' });
      Cal('inline', {
        elementOrSelector: '#calMount',
        calLink: 'certi/demo',
        config: { layout: 'month_view' },
      });
      Cal('ui', {
        layout: 'month_view',
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { 'cal-brand': '#51344D' },
          dark: { 'cal-brand': '#CCCCFF' },
        },
      });
    } catch (e) {
      fallback();
      return;
    }

    /* Watchdog: if Cal never paints an iframe, show the direct link rather than a
       spinner that never resolves. */
    var waited = 0;
    var tick = setInterval(function () {
      waited += 250;
      if (mount.querySelector('iframe')) {
        mount.classList.remove('is-loading');
        clearInterval(tick);
      } else if (waited >= 12000) {
        clearInterval(tick);
        fallback();
      }
    }, 250);
  })();
  </script>
'''


def booking_page():
    canonical = SITE + '/book-a-demo'
    title = 'Book a CERTI Demo | AI-Native QMS for Food Manufacturers'
    desc = ('Pick a time with the CERTI team and see the AI-native quality management '
            'system on your own processes. Thirty minutes, no slide deck, no obligation.')

    jsonld = '''  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "CANONICAL",
        "url": "CANONICAL",
        "name": "Book a demo",
        "description": "DESC",
        "isPartOf": { "@id": "SITE/#website" },
        "inLanguage": "en-US"
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          { "@type": "ListItem", "position": 1, "name": "Home", "item": "SITE/" },
          { "@type": "ListItem", "position": 2, "name": "Book a demo" }
        ]
      }
    ]
  }
  </script>'''
    jsonld = (jsonld.replace('CANONICAL', canonical).replace('DESC', desc)
                    .replace('SITE', SITE))

    head = HEAD.format(
        title=attr(title), metadesc=attr(desc), canonical=canonical,
        ogimage=SITE + '/img/og-image.png', ogw='1200', ogh='630',
        ogalt='CERTI: Grow, uninterrupted.', ver=VER, jsonld=jsonld)

    page = head + '''
  <header class="container legal__head dpage__head">
    <a href="/" aria-label="CERTI home">
      <img class="legal__logo" src="/img/logo-horizontal.webp" alt="Certi" width="900" height="307" />
    </a>

    <nav class="dpage__crumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      <span aria-hidden="true">/</span>
      <span aria-current="page">Book a demo</span>
    </nav>

    <span class="legal__kicker">Book a demo</span>
    <h1 class="legal__title">Thirty minutes, <em>no deck<span class="accent">.</span></em></h1>
    <p class="dpage__lede">
      Pick a time below and we will walk CERTI against your own schemes, your own records,
      and whichever quality job is costing you most right now.
    </p>
  </header>

  <main class="dpage">
    <div class="container dbook">
      <div class="dbook__cal">
        <!-- Cal.com inline embed. This page exists in order to book, so unlike the
             homepage modal the calendar initialises on load rather than on a click. -->
        <div class="dbook__mount is-loading" id="calMount"></div>
        <noscript>
          <p class="dbook__nojs">
            The calendar needs JavaScript.
            <a href="https://cal.com/certi/demo" target="_blank" rel="noopener">Open the booking page on cal.com</a>.
          </p>
        </noscript>
      </div>

      <aside class="dbook__aside">
        <h2 class="dpage__asideh">What to expect</h2>
        <ul class="dpage__list">
          <li>A working product, not slides</li>
          <li>Your schemes and your records, not a generic dataset</li>
          <li>A straight answer on where a quickstart would land first</li>
          <li>Thirty minutes, and no obligation afterwards</li>
        </ul>

        <h2 class="dpage__asideh dbook__asideh2">Prefer to look first?</h2>
        <p class="dbook__asidep">
          All nine quickstart walkthroughs are online and need no signup.
        </p>
        <a href="/demos/" class="btn btn--ink dpage__asidebtn">
          <span class="btn__label" data-text="Browse the demos">Browse the demos</span>
          <span class="btn__arrow" aria-hidden="true">&rarr;</span>
        </a>
      </aside>
    </div>
  </main>
''' + FOOTER
    return page.replace('</body>', CAL_SCRIPT + '</body>')


def sitemap():
    urls = [('/', 'weekly', '1.0'), ('/demos/', 'monthly', '0.9')]
    urls += [('/demos/%s' % d['slug'], 'monthly', '0.8') for d in DEMOS]
    urls += [('/book-a-demo', 'monthly', '0.9'),
             ('/privacy-policy', 'yearly', '0.3'),
             ('/terms', 'yearly', '0.3')]
    body = '\n'.join(
        '  <url>\n    <loc>%s%s</loc>\n    <lastmod>%s</lastmod>\n'
        '    <changefreq>%s</changefreq>\n    <priority>%s</priority>\n  </url>'
        % (SITE, u, TODAY, cf, pr) for u, cf, pr in urls)
    return ('<?xml version="1.0" encoding="UTF-8"?>\n'
            '<!--\n'
            '  Sitemap for getcerti.com.\n'
            '\n'
            '  There is no build step in this repo, so this file is maintained by\n'
            '  assets-src/gen-pages.py: add a demo to the DEMOS list there and re-run,\n'
            '  rather than hand-editing here.\n'
            '\n'
            '  Every URL below must return 200 and be self-canonical. A sitemap that\n'
            '  lists redirects, fragments or noindex pages is worse than no sitemap:\n'
            '  it spends crawl budget teaching Google what not to trust.\n'
            '-->\n'
            '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
            + body + '\n</urlset>\n'), len(urls)


def write(path, content):
    full = os.path.join(ROOT, path)
    parent = os.path.dirname(full)
    if parent:
        os.makedirs(parent, exist_ok=True)
    io.open(full, 'w', encoding='utf-8', newline='\n').write(content)
    print('  %-50s %6.1f KB' % (path, len(content.encode('utf-8')) / 1024.0))


def main():
    load_cards()
    print('Demo pages:')
    for d in DEMOS:
        write('demos/%s.html' % d['slug'], demo_page(d))
    print('Hub and booking:')
    write('demos/index.html', hub_page())
    write('book-a-demo.html', booking_page())
    print('Sitemap:')
    sm, n = sitemap()
    write('sitemap.xml', sm)
    print('\n%d demo pages + hub + booking, %d sitemap urls' % (len(DEMOS), n))


if __name__ == '__main__':
    main()
