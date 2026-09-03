# Sarthak Mishra — portfolio

A zero-runtime-by-default portfolio built with Hugo, semantic HTML, and CSS.

## Local development

Install Hugo `v0.164.0`, then run:

```sh
hugo server --renderToMemory --disableFastRender
```

Build and verify:

```sh
hugo --minify --panicOnWarning
sh tests/smoke.sh
```

## Exact stack

- Hugo `v0.164.0`, pinned for reproducible static builds.
- Go templates and Markdown/TOML content records.
- Semantic HTML, one minified CSS resource, one optional vanilla ES module.
- Deterministic inline SVG project art; no runtime drawing dependency.
- One local 24 KB Newsreader WOFF2; system sans-serif and monospace fallbacks.
- No npm, client framework, hydration, canvas loop, analytics, CMS, or service worker.

## Shortcodes

Tailored elements for Markdown, rendered to plain HTML and inline SVG at build time:

```
{{< stat value="250" unit="docs / s" label="one process per core" >}}
{{< plate motif="flow" label="LBM / D2Q9" >}}optional caption{{< /plate >}}
{{< aside >}}a margin note{{< /aside >}}
```

## Repository structure

```text
assets/
  css/site.css             complete visual system
  fonts/                   local Newsreader subset + OFL
  js/site.js               optional clipboard feedback
data/
  register.toml            further projects from the CV
content/
  _index.md                homepage record
  work/                    project report records
  notes/                   field notes
  about.md                 profile
  taste.md                 opinionated stack
  studio.md                generative-art method
layouts/
  _default/                shared list, page, and document shell
  shortcodes/              stat, plate, aside
  notes/                    note article template
  work/                     evidence-led project report
  partials/                navigation, project cards, SVG art, evidence
static/                     favicon and robots policy
tests/smoke.sh              build output, routes, semantics, budgets
hugo.toml                   site and output configuration
```

Deployment is intentionally deferred until the design and real content are approved.

When deployment is approved, pass the final absolute site URL explicitly so canonical feed and subpath links are correct:

```sh
hugo --minify --panicOnWarning --baseURL https://example.com/portfolio/
```
