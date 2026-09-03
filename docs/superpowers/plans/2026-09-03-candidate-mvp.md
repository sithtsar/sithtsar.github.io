# Candidate Portfolio MVP Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and locally serve a memorable, annual-report-inspired static portfolio MVP that demonstrates the visual system, evidence-led content model, and generative cover grammar.

**Architecture:** Hugo `v0.164.0` converts Markdown and TOML front matter into static multi-page HTML. Shared Go templates own structure, one CSS file owns the full visual system, and one tiny optional JavaScript module owns clipboard feedback only. Project cover data is rendered through an allowlisted Hugo partial into inline SVG; no generated script runs on the main site.

**Tech Stack:** Hugo `v0.164.0`, Go templates, Markdown/TOML, semantic HTML5, modern CSS, optional vanilla ES module.

**Spec:** `docs/superpowers/specs/2026-09-03-personal-annual-report-design.md`

## Global Constraints

- Homepage HTML + CSS + JavaScript compressed must remain <= 35 KB before project imagery.
- JavaScript compressed must remain <= 3 KB.
- No React, Vue, Svelte, Astro, Tailwind, npm, bundler, Datastar, htmx, WebAssembly, analytics, service worker, or runtime CMS.
- Main navigation and evidence disclosures must work without JavaScript.
- Every animation must stop under `prefers-reduced-motion: reduce`.
- The MVP must render without horizontal overflow at 320px.
- Do not invent employers, results, publications, testimonials, or metrics; representative copy must be visibly marked as provisional.

---

### Task 1: Buildable Hugo skeleton

**Files:**
- Create: `hugo.toml`
- Create: `.gitignore`
- Create: `README.md`
- Create: `layouts/_default/baseof.html`
- Create: `layouts/partials/header.html`
- Create: `layouts/partials/footer.html`
- Create: `layouts/index.html`
- Create: `content/_index.md`
- Create: `assets/css/site.css`
- Create: `tests/smoke.sh`

**Interfaces:**
- Consumes: Hugo `v0.164.0`.
- Produces: shared `baseof.html` blocks named `title`, `main`, and `scripts`; fingerprinted `assets/css/site.css`; a shell smoke-test entrypoint.

- [ ] **Step 1: Write the failing smoke test**

```sh
#!/bin/sh
set -eu
test -f public/index.html
grep -q '<meta name="viewport"' public/index.html
grep -q 'Skip to content' public/index.html
grep -q 'Sarthak Mishra' public/index.html
```

- [ ] **Step 2: Verify the test fails**

Run: `sh tests/smoke.sh`  
Expected: failure because `public/index.html` does not exist.

- [ ] **Step 3: Add the minimal Hugo configuration and shared page shell**

`hugo.toml` sets the title, language, disabled taxonomy pages, RSS outputs, and minification-compatible URLs. `baseof.html` includes metadata, skip link, shared header/footer, the CSS pipeline, and a `main#content` block. Add a minimal homepage template and content record so the shell smoke test exercises rendered output.

- [ ] **Step 4: Add foundational CSS**

Define the six approved color tokens, type stacks, focus style, 12-column page grid, readable text measure, and reduced-motion override. Do not style product-specific sections yet.

- [ ] **Step 5: Build and run the smoke test**

Run: `hugo --minify --panicOnWarning && sh tests/smoke.sh`  
Expected: PASS.

- [ ] **Step 6: Commit**

```sh
git add hugo.toml .gitignore README.md layouts assets/css/site.css tests/smoke.sh
git commit -m "build: add minimal Hugo site shell"
```

### Task 2: Homepage and generative project covers

**Files:**
- Modify: `content/_index.md`
- Create: `content/work/_index.md`
- Create: `content/work/agent-evaluation-ledger.md`
- Create: `content/work/codebase-memory.md`
- Create: `content/work/research-runtime.md`
- Modify: `layouts/index.html`
- Create: `layouts/_default/list.html`
- Create: `layouts/partials/project-cover.html`
- Create: `layouts/partials/cover-art.html`
- Create: `assets/fonts/newsreader-latin.woff2`
- Create: `assets/fonts/OFL.txt`
- Modify: `assets/css/site.css`
- Modify: `tests/smoke.sh`

**Interfaces:**
- Consumes: `.Params.cover_art` with `motif`, `density`, `rotation`, and `label`.
- Produces: `partial "cover-art.html" .` and `partial "project-cover.html" .`, used by the homepage and work list.

- [ ] **Step 1: Extend the failing smoke test**

```sh
grep -q 'Selected work' public/index.html
grep -q 'data-cover-motif="orbit"' public/index.html
grep -q 'Representative content' public/index.html
test -f public/work/index.html
```

- [ ] **Step 2: Verify the new assertions fail**

Run: `hugo --minify --panicOnWarning && sh tests/smoke.sh`  
Expected: failure on missing selected work or cover motif.

- [ ] **Step 3: Add representative content**

Create three project records with clearly provisional names and claims. Each record supplies a different allowlisted motif: `orbit`, `signal`, or `grid`. Empty external links are omitted. Add a Latin-subset Newsreader WOFF2 file and its OFL license from the upstream font distribution.

- [ ] **Step 4: Implement the cover partials**

`cover-art.html` switches only across the three known motifs and emits SVG circles, lines, rectangles, and text using palette tokens. `project-cover.html` supplies the accessible title and metadata around the art. Unknown motifs fall back to `grid` rather than executing supplied markup.

- [ ] **Step 5: Implement the homepage and work register**

Render the cover-like opening viewport, visible provisional-content notice, one flagship spread, two compact project rows, latest note slot, and direct `mailto:` contact placeholder.

- [ ] **Step 6: Complete responsive cover styling**

Use CSS Grid on wide screens and document-order single column below 760px. Set `view-transition-name` only on unique project cover links. Ensure artwork is decorative when adjacent text carries the title.

- [ ] **Step 7: Build and run tests**

Run: `hugo --minify --panicOnWarning && sh tests/smoke.sh`  
Expected: PASS.

- [ ] **Step 8: Commit**

```sh
git add content layouts assets/css/site.css tests/smoke.sh
git commit -m "feat: add annual report homepage and covers"
```

### Task 3: Project report, notes, about, and studio routes

**Files:**
- Create: `layouts/_default/single.html`
- Create: `layouts/work/single.html`
- Create: `layouts/notes/single.html`
- Create: `layouts/partials/evidence-chain.html`
- Create: `content/notes/_index.md`
- Create: `content/notes/why-evidence-beats-demos.md`
- Create: `content/about.md`
- Create: `content/studio.md`
- Modify: `assets/css/site.css`
- Modify: `tests/smoke.sh`

**Interfaces:**
- Consumes: project page parameters `question`, `hypothesis`, `build`, `evaluation`, `result`, `failure`, and `next_step`.
- Produces: accessible native `<details>` evidence rows and complete route content.

- [ ] **Step 1: Add failing route and semantics checks**

```sh
for page in public/work/agent-evaluation-ledger/index.html public/notes/index.html public/notes/why-evidence-beats-demos/index.html public/about/index.html public/studio/index.html; do
  test -f "$page"
done
grep -q '<details' public/work/agent-evaluation-ledger/index.html
grep -q 'p5.brush' public/studio/index.html
```

- [ ] **Step 2: Verify the checks fail**

Run: `hugo --minify --panicOnWarning && sh tests/smoke.sh`  
Expected: failure on the missing routes.

- [ ] **Step 3: Implement project report and evidence chain**

Render the selected cover, executive metadata, provisional status, evidence disclosures, article body, and adjacent-project navigation. Keep `<summary>` text meaningful when collapsed.

- [ ] **Step 4: Implement notes and about pages**

Use the generic list template for notes and a readable single template for note/about content. Include RSS discovery metadata through Hugo's built-in output.

- [ ] **Step 5: Implement the static studio explanation**

Explain the allowlisted SVG cover grammar, pre-rendered `p5.brush` workflow, performance boundary, and future lazy-loaded interactive route. Display the three cover motifs as the working demonstration; do not ship `p5.brush` in the MVP.

- [ ] **Step 6: Build and run tests**

Run: `hugo --minify --panicOnWarning && sh tests/smoke.sh`  
Expected: PASS.

- [ ] **Step 7: Commit**

```sh
git add content layouts assets/css/site.css tests/smoke.sh
git commit -m "feat: add report notes about and studio pages"
```

### Task 4: Progressive enhancement, validation, and local handoff

**Files:**
- Create: `assets/js/site.js`
- Create: `static/favicon.svg`
- Create: `static/robots.txt`
- Modify: `layouts/_default/baseof.html`
- Modify: `assets/css/site.css`
- Modify: `tests/smoke.sh`
- Modify: `README.md`

**Interfaces:**
- Consumes: elements with `[data-copy]` and their `data-copy` string.
- Produces: copied text plus an `aria-live` status update; the page remains functional without it.

- [ ] **Step 1: Add failing asset and budget checks**

```sh
test -f public/favicon.svg
test -f public/robots.txt
gzip -9 -c public/index.html > /tmp/portfolio-index.html.gz
test "$(wc -c < /tmp/portfolio-index.html.gz)" -le 35840
```

- [ ] **Step 2: Verify the new checks fail**

Run: `hugo --minify --panicOnWarning && sh tests/smoke.sh`  
Expected: failure because final assets are missing.

- [ ] **Step 3: Add the optional clipboard enhancement**

Use one delegated click listener. On success, update a single polite live region. On failure, leave the visible email or command selectable. Do not intercept links.

- [ ] **Step 4: Add metadata and static assets**

Add favicon, robots file, descriptions, RSS discovery link, and provisional Open Graph text without inventing a public canonical domain or social image.

- [ ] **Step 5: Run build and deterministic checks**

Run: `hugo --minify --panicOnWarning && sh tests/smoke.sh`  
Expected: PASS with compressed homepage below 35 KB.

- [ ] **Step 6: Run browser review**

Start: `hugo server --bind 127.0.0.1 --port 1313 --disableFastRender`  
Using agent-browser, open `http://127.0.0.1:1313/`, verify the visible first viewport, follow one project, expand one evidence row, open `/studio/`, and check a 320px mobile viewport for overflow.

- [ ] **Step 7: Commit**

```sh
git add assets layouts static tests README.md
git commit -m "feat: finish candidate portfolio MVP"
```
