# Personal Annual Report — Design Specification

Date: 2026-09-03  
Status: Proposed for implementation  
Owner: Sarthak Mishra

## 1. Purpose

Create a fast, memorable personal portfolio for recruiters, founders, and researchers at high-growth AI startups and research labs. The site should communicate technical depth and personal taste within the first viewport, provide inspectable evidence within one click, and earn repeat visits through durable technical notes and artifacts.

The visual language takes inspiration from mid-century corporate annual reports: individually art-directed covers, limited inks, editorial typography, diagrams, halftones, registration marks, and precise metadata. The information architecture is adapted for evaluating one person rather than browsing an archive.

## 2. Success criteria

Visitors must be able to:

1. Understand Sarthak's technical focus and current direction without scrolling.
2. Reach the strongest project, its evidence, or direct contact in one action.
3. Distinguish Sarthak's exact contribution from team or institutional work.
4. Browse selected work, technical notes, and personal context on any screen size.
5. Use the complete site when JavaScript is unavailable.

The finished implementation must meet these budgets on the homepage before project imagery:

| Constraint | Budget |
| --- | ---: |
| HTML + CSS + JavaScript, compressed | <= 35 KB |
| JavaScript, compressed | <= 3 KB |
| Self-hosted fonts, combined | <= 50 KB |
| Render-blocking third-party requests | 0 |
| Cumulative Layout Shift | <= 0.02 |
| Lighthouse mobile performance | >= 95 |
| Lighthouse accessibility | 100 target |

These are engineering budgets, not promised field timings. Real LCP and INP depend on hosting, network, hardware, and final imagery.

## 3. Audience and desired reaction

Primary audience:

- Research and engineering leaders at frontier AI labs.
- Founders and early technical hires at high-growth AI startups.
- Technical recruiters evaluating research engineers, systems builders, or high-agency generalists.

Secondary audience:

- Researchers and engineers looking for useful explanations, experiments, and tools.
- Potential collaborators.

The first visit should produce: "This person has a point of view, builds real things, measures them honestly, and is easy to contact."

A return visit should be justified by useful material: a technical note, reproducible benchmark, annotated reading list, small tool, or research update. Visual novelty alone is not considered bookmark value.

## 4. Product principles

1. **Evidence before adjectives.** Every important capability claim should link to code, a demo, a paper, a benchmark, a merged contribution, or a clearly labelled case study.
2. **One strong artifact before breadth.** The strongest work appears first. The site will not compensate for missing evidence with more cards.
3. **Annual-report graphics, contemporary reading behavior.** Use archival visual devices without imitating the reference site's masonry layout.
4. **Progressive enhancement.** Links and documents work first; transitions, clipboard actions, and small conveniences enhance them.
5. **Performance is part of the identity.** No hydration, client router, animation library, analytics script, or decorative canvas.
6. **Honest incompleteness.** Missing metrics or confidential details are labelled instead of invented.

## 5. Information architecture

### Routes

| Route | Purpose |
| --- | --- |
| `/` | Cover, positioning, strongest evidence, latest note, direct contact |
| `/work/` | Selected project register |
| `/work/<slug>/` | Individual project report |
| `/notes/` | Reverse-chronological technical notes |
| `/notes/<slug>/` | Individual technical note |
| `/about/` | Biography, working principles, selected timeline, contact |

There is no separate contact page. Contact details remain visible in the site header/footer and on the homepage.

### Homepage hierarchy

1. Identity and precise technical thesis.
2. Availability/status and direct email.
3. One flagship project cover with one measurable or inspectable result.
4. Two additional selected projects.
5. Latest technical note.
6. Short personal statement and footer.

### Project report hierarchy

1. Art-directed project cover.
2. Executive summary: problem, role, date, status.
3. Evidence chain: question, hypothesis, build, evaluation, result, failure, next step.
4. System or research explanation.
5. Benchmarks and limitations.
6. Links to code, demo, paper, data, or relevant contribution.
7. Previous/next work navigation and direct contact.

## 6. Visual direction

### Concept: The Personal Annual Report

The overall site is one annual report about a body of work. Each project is a separately art-directed report cover within that system. The surrounding interface remains quiet so the covers can vary without making the site incoherent.

Annual-report elements to use:

- Limited two- or three-ink compositions.
- Abstract geometric graphics derived from each project's subject.
- Cropped or duotone project photography when real imagery exists.
- Halftone treatment for appropriate raster imagery.
- Oversized project numerals, years, and short titles.
- Hairline rules, folio marks, registration marks, issue labels, and colophons.
- Technical diagrams that explain real systems rather than decorate empty space.

Elements not to use:

- Fake paper tears, coffee stains, distressed overlays, or nostalgia filters.
- Generic AI imagery, glowing orbs, neural-network stock art, or robot heads.
- Gratuitous 3D, WebGL, particle fields, smooth-scroll replacements, or custom cursors.
- A uniform SaaS card grid.

### Palette

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F3EEDC` | Primary light background |
| Carbon | `#171713` | Primary text and strong rules |
| Vermilion | `#C83F2A` | Active state and selected cover ink |
| Ultramarine | `#28559A` | Links, diagrams, selected cover ink |
| Harvest | `#D1A326` | Occasional project-cover ink |
| Moss | `#5D7147` | Occasional project-cover ink |

Individual covers may choose Carbon plus any two chromatic inks. The interface outside covers uses Paper, Carbon, and Ultramarine. Vermilion is reserved for status and a small number of actions.

Dark mode is deferred from the first prototype. A deliberate dark palette is preferable to an automatic inversion and will be added only after the light design is approved.

### Typography

- **Display/editorial:** Newsreader Variable, self-hosted and Latin-subset WOFF2. Used for the name, project titles, and large editorial statements.
- **Interface/body:** system sans stack: `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`.
- **Code/data:** system monospace stack. No downloaded monospace font.

Typography must remain readable before Newsreader loads. Font fallback metrics will be tested for layout shift. Body copy is limited to approximately 68 characters per line.

### Layout

Desktop uses a 12-column grid. The homepage cover occupies the opening viewport, followed by alternating editorial spreads. Project imagery and typography may cross columns, but text measures remain controlled.

Mobile becomes a single-column reading order. Artwork remains prominent, project metadata moves below it, and all controls meet a 44px minimum touch target. No horizontal content is required to understand a project.

### Homepage sketch

```text
+------------------------------------------------------------+
| SARTHAK MISHRA                                      2026   |
|                                                            |
|          project-derived geometric cover artwork           |
|                                                            |
| RESEARCH / SYSTEMS / AI                                    |
| Precise technical thesis                    OPEN REPORT ->  |
+------------------------------------------------------------+
| CONTENTS                                                   |
| +------------------+  01 / Flagship project                |
| | project cover    |  Problem and inspectable result       |
| | composition      |  Code / Evaluation / Case study       |
| +------------------+                                       |
|                                                            |
| 02 / Project title ------------------------------- year     |
| 03 / Project title ------------------------------- year     |
+------------------------------------------------------------+
| FIELD NOTE / latest useful technical note                  |
+------------------------------------------------------------+
```

## 7. Interaction design

### Primary interaction: cover-to-report transition

Selecting a project cover performs an ordinary same-origin link navigation. Supporting browsers enhance it with CSS cross-document View Transitions so the chosen cover becomes the project report hero. Unsupported browsers receive normal navigation with no lost functionality.

The transition is short, uses only opacity and transform, and is disabled under `prefers-reduced-motion: reduce`.

### Evidence chain

Project reports expose reasoning through semantic `<details>` sections:

```text
Question -> Hypothesis -> Build -> Evaluation -> Result -> Failure -> Next step
```

The summary remains useful without expansion. JavaScript is not required.

### Small JavaScript enhancements

One deferred ES module may provide:

- Copy email or reproduction command with status feedback.
- Persisted acknowledgement after copying.
- Optional keyboard shortcut for opening the project index.

No client-side routing, filtering, scroll animation, theme system, or component runtime is included in the first prototype.

## 8. Exact technical stack

### Build-time stack

- **Static site generator:** Hugo `v0.164.0`, pinned for local and CI builds.
- **Content:** Markdown with TOML front matter.
- **Templates:** Hugo's standard Go templates.
- **Configuration:** `hugo.toml`.
- **Styles:** one handwritten modern CSS file processed by Hugo Pipes for fingerprinting and minification.
- **Scripts:** one optional handwritten ES module, fingerprinted and minified by Hugo Pipes.
- **Images:** Hugo image resources generate explicit dimensions and responsive WebP derivatives from checked-in originals. Original format remains the fallback when needed.
- **Local server:** `hugo server`.
- **Production build:** `hugo --minify --panicOnWarning`.

### Browser/runtime stack

- Semantic HTML5.
- CSS Grid, Flexbox, custom properties, container/media queries where useful, `aspect-ratio`, `content-visibility`, and `@view-transition` as progressive enhancement.
- Native `<details>`, `<summary>`, links, and clipboard APIs.
- At most one tiny vanilla JavaScript module.

### Explicitly excluded

- React, Vue, Svelte, Astro, Tailwind, component libraries, npm, bundlers, and CSS preprocessors.
- Datastar and htmx: there is no backend-driven UI or fragment-swapping requirement.
- WebAssembly: the site has no CPU-heavy workload. Wasm may be embedded later only for a real project demonstration whose computation benefits from it.
- Service workers and offline application behavior.
- Runtime CMS, database, search service, contact form backend, or analytics.

Hugo earns its place because multi-page templates, Markdown content, responsive image generation, fingerprints, and GitHub Pages-compatible static output are real requirements. It adds zero browser runtime.

## 9. Repository structure

```text
portfolio/
├── hugo.toml
├── README.md
├── .gitignore
├── assets/
│   ├── css/
│   │   └── site.css
│   ├── js/
│   │   └── site.js
│   ├── fonts/
│   │   └── newsreader-latin.woff2
│   └── images/
│       └── work/
│           └── <project-slug>/
│               ├── cover.<source-format>
│               └── <supporting-image>.<source-format>
├── content/
│   ├── _index.md
│   ├── work/
│   │   ├── _index.md
│   │   └── <project-slug>.md
│   ├── notes/
│   │   ├── _index.md
│   │   └── <note-slug>.md
│   └── about.md
├── layouts/
│   ├── _default/
│   │   ├── baseof.html
│   │   ├── list.html
│   │   └── single.html
│   ├── index.html
│   ├── work/
│   │   └── single.html
│   ├── notes/
│   │   └── single.html
│   └── partials/
│       ├── header.html
│       ├── footer.html
│       ├── project-cover.html
│       └── evidence-chain.html
├── static/
│   ├── favicon.svg
│   └── robots.txt
└── docs/
    └── superpowers/
        └── specs/
            └── 2026-09-03-personal-annual-report-design.md
```

`public/` is generated output and is not committed. No empty directories or placeholder abstractions will be created unless the first prototype uses them.

## 10. Content model

Project front matter:

```toml
+++
title = "Project title"
date = 2026-09-03
summary = "One factual sentence."
status = "shipped"
role = "Exact individual contribution"
featured = true
weight = 1
inks = ["carbon", "ultramarine", "harvest"]
cover = "cover.png"
result = "Measured or inspectable outcome"
code_url = ""
demo_url = ""
paper_url = ""
+++
```

The Markdown body uses ordinary headings matching the evidence chain. Missing URLs remain absent; the template does not render empty controls.

Note front matter:

```toml
+++
title = "Note title"
date = 2026-09-03
summary = "What the reader will learn."
tags = ["agents", "evaluation"]
+++
```

Hugo generates RSS for notes and the site root using its built-in output formats.

## 11. Data flow and ownership

```text
Markdown + images
       |
       v
Hugo templates -- Hugo Pipes/image processing
       |
       v
Static HTML, CSS, JS, fonts, responsive images
       |
       v
Local server now; static hosting later
```

Content files own facts and prose. Templates own repeated structure. CSS owns presentation and motion. The optional JavaScript file owns only enhancements that cannot be expressed accessibly with HTML/CSS.

There is no server-side state, client state store, API, database, or consistency model.

## 12. Accessibility and resilience

- Semantic landmarks and one visible `<h1>` per page.
- Skip link and visible keyboard focus.
- Meaningful alternative text for explanatory imagery; empty alternative text for purely decorative imagery.
- Cover graphics never contain the only copy of essential information.
- Color is not the only status indicator.
- All animations respect reduced-motion preferences.
- Pages remain readable if the custom font, CSS, images, or JavaScript fail independently.
- Native controls retain their semantics; no clickable `<div>` elements.

## 13. Metadata and discovery

- Unique title and description for every page.
- Canonical URLs once the final domain is known.
- Open Graph image generated after the visual design and real identity copy stabilize.
- Person and CreativeWork JSON-LD only when populated with verified facts.
- Sitemap, RSS, and robots file generated or served statically.
- No fabricated metrics, affiliations, testimonials, publications, or outcomes.

## 14. Validation

The first implementation is complete when:

1. `hugo --minify --panicOnWarning` succeeds.
2. Home, work index, one project, notes index, one note, and about page return successfully from the local server.
3. Navigation and evidence disclosures work with JavaScript disabled.
4. Keyboard focus order is sensible and visible.
5. Reduced-motion mode removes non-essential transitions.
6. Mobile layouts at 320px and 390px have no horizontal overflow.
7. Images include dimensions and responsive candidates.
8. The homepage meets the asset budgets in Section 2 before final project imagery.
9. A Lighthouse mobile run meets the performance and accessibility targets, or any miss is measured and explained.

## 15. Prototype scope

The locally served prototype will include:

- All five route types using clearly marked representative content.
- One fully composed flagship project cover and two simpler cover treatments.
- One example evidence chain.
- One example technical note.
- Responsive desktop and mobile layouts.
- Native cross-document transition where supported.

The prototype will not include deployment, a custom domain, analytics, a CMS, live search, dark mode, or WebAssembly. These are reconsidered only after the visual direction and real content justify them.

## 16. Trade-offs and remaining risk

- **Chosen:** Hugo instead of hand-duplicated HTML. **Cost:** one build-time binary. **Benefit:** shared layouts, Markdown content, responsive images, and zero client runtime.
- **Chosen:** project-specific visual covers. **Cost:** each important project needs art direction rather than automatic card generation. **Benefit:** memorability and subject-specific identity.
- **Chosen:** no client framework. **Cost:** complex application-like interactions would require later architectural reconsideration. **Benefit:** immediate rendering, accessibility, and longevity.
- **Chosen:** light mode only for the prototype. **Cost:** no theme preference initially. **Benefit:** one fully art-directed palette instead of an unfinished inversion.

The largest risk is not technical: placeholder content can prove the design system but cannot create genuine hiring signal. The final site's impact depends on a precise personal thesis and a small number of real, inspectable artifacts.
