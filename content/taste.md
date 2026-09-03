+++
title = "Taste"
description = "The opinionated stack I reach for, and the evidence for it across sixty-odd repositories."
kicker = "Preferences / 2026"
paint = true
+++

Taste is what you pick when nobody’s making you. This is mine, checked against my actual repos instead of what I’d like to claim. Strong opinions, loosely held. Okay, mostly held.

{{< board >}}

## Python: uv, ruff, ty, marimo

- **uv for everything.** Twelve of my fourteen Python projects lock with uv. No conda, no poetry, no requirements drift. A fresh clone is `uv sync` and done.
- **ruff for lint and format,** one tool, one config, milliseconds.
- **ty for types.** Annotated code or nothing. If a function's signature cannot say what it takes and returns, it is not finished.
- **marimo over Jupyter.** Notebooks are Python files, cells run as a dependency graph, and the same file is an app, a slide deck, or a script. The thesis figures and the stochastic-transport project are marimo. The 38 `.ipynb` files still in my tree are coursework from before I switched, and none of them will get a successor.

## Go, and the joy of one binary

Gopher, unapologetically. My favourite deployable is a single Go binary that is an API, a job queue, and a scheduler in one process, and ships as one file. Chi for routing, SQLite without CGO, OpenTelemetry. Go's boredom is the feature: a year later the code still reads the same.

## Zig over Rust, for now

I wrote a lot of Rust, ten Cargo projects' worth. The last large native thing I built is Zig, with a Rust version kept as a reference that has to agree byte for byte. The reason is not safety or ergonomics, it is the edit-compile-test loop: Zig's build cache and compile times keep me in flow on a large native codebase in a way Rust's did not. Rust still gets the job when the library is already there.

## C where it has to be

I do not start projects in C. I do keep them there when the constraint is real: tree-sitter is C, and an index that has to run anywhere with no runtime ends up C too.

## SQLite first

One SQLite file per unit of work, whether that is a repository or a cricket league. cricheros is SQLite. The habit: start with one file you can copy, back up, and diff. Reach for Postgres when there are tenants and concurrent writers, and DuckDB when the question is analytical.

## Elixir for swarms

When agents need supervision, mailboxes, and restart strategies, the BEAM already solved it thirty years ago. piexie is an Elixir control plane for LLM agents with real `one_for_one` and `rest_for_one` trees. I would rather borrow OTP than reinvent a scheduler.

## Web, sparingly

- Next.js when a product needs it. Svelte remains the framework I like; Bun is the runtime I pick when I have a choice.
- Plain HTML, CSS, and a static generator for anything that is a document. This site is Hugo with a 6.5 KB critical bundle and about 3 KB of JavaScript, and it runs the same on a potato phone and a workstation.

## Repositories that agents can read

Eleven of my repositories carry a `CLAUDE.md` and six an `AGENTS.md`. Structured output goes through BAML schemas rather than prompt-and-pray. Code intelligence is a graph behind an MCP server rather than grep. I treat the repository as the interface an agent will use, and write it down the way I would for a new colleague.

## Ops that fail loudly

Docker in thirteen projects, GitHub Actions in nearly all of them. The parts I am proudest of are the gates: mutation testing and cyclomatic ceilings, sha256 goldens and a hostile-file suite, generated docs that fail CI when they drift. Tailscale for anything internal. If a check can be a tool instead of a review comment, it becomes a tool.

## The desk

Arch Linux, Hyprland on Wayland, rofi for launching. The config lives in [sithtsar/dotfiles](https://github.com/sithtsar/dotfiles), which the README honestly describes as "may or may not work". On the Mac I run the same terminal stack and pretend.

- **Ghostty** is the terminal: ayu theme, JetBrains Mono with ligatures off, generous padding, a bar cursor, and the pointer hidden while typing. GPU-rendered and it stays out of the way.
- **herdr** is where the agents live: a terminal workspace manager built for AI coding agents, one pane per agent with its label on the border, sessions I can attach to over SSH. tmux still runs underneath for everything that is not an agent.
- **Neovim** on LazyVim, with Helix and Zed on standby. The editor should open in the time it takes to think of the file name.
- lazygit, btop, fish with a zsh fallback, and fastfetch for vanity.

## Annual reports

The visual language of this site comes from mid-century corporate annual reports, and specifically from the [Annual Report Archive](https://annualreport.gallery/): 3,002 scanned covers from 1945 to 2023, most of them 1950s to 1980s, with Paul Rand, Chermayeff and Geismar, Lester Beall, Saul Bass, and George Tscherny among the credited designers. I crawled it properly, cover by cover, before deciding what to keep.

What the good ones do:

- **The year is the hero.** Eddy Paper 1949, Cummins 1976, Intermetco 1980: numerals so large they leave the page. The outlined "26" on my Work and Notes indexes is that.
- **A letter, signed.** IBM 2001 is a plain "Dear fellow investor" letter with an inked signature and nothing else. The homepage closes with a letter for the same reason.
- **Two inks, one mark.** Alberta Opportunity Company ran an orange and green pinwheel for years. The six-ink palette here, ivory, carbon, vermilion, ultramarine, harvest, moss, is a limit I keep on purpose.
- **Charts as art.** Tandy 1964 set a rising line graph as the cover. Every case study here carries its mechanism as a diagram rather than a stock image.
- **Gold on black.** GE 1984, Goodyear 1946, John Labatt 1982. The ink theme (toggle in the header) is the closest a screen gets to that paper.
- **Type on a circle.** La Sauvegarde 1973 ran its title around a mark. The department seals on About do the same with an SVG text path.
- **Restraint by era.** 1950s gouache and serifs, 1960s geometry, 1970s die-cuts and giant letterforms, 1980s metallic monograms, 2000s a single confident sentence. I borrow the discipline, not any one decade.

The archive itself is well made: one static page, no framework, a fixed rail instead of a header, CSS multi-column masonry with real cover aspect ratios, a Fisher-Yates shuffle so every visit is fresh, and a Copy-for-AI button on every cover. It also exposes a free MCP server, which is how an archive should behave in 2026. The Copy-for-AI button on my case studies is borrowed from there.

## Things I refuse to do

- Jupyter notebooks committed to a repository.
- A framework for a site that is a document.
- Package managers that need a lockfile-of-lockfiles. The seven `package-lock.json` files left in my tree are older projects and are not multiplying.
- Abstractions with one implementation, and config for values that never change.
