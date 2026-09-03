+++
title = "Taste"
description = "The opinionated stack I reach for, and the evidence for it across sixty-odd repositories."
kicker = "Preferences / 2026"
+++

Taste is what you choose when nobody is making you. This page is what I choose, checked against what is actually in my repositories rather than what I would like to claim.

## Python: uv, ruff, ty, marimo

- **uv for everything.** Twelve of my fourteen Python projects lock with uv. No conda, no poetry, no requirements drift. A fresh clone is `uv sync` and done.
- **ruff for lint and format,** one tool, one config, milliseconds.
- **ty for types.** Annotated code or nothing. If a function's signature cannot say what it takes and returns, it is not finished.
- **marimo over Jupyter.** Notebooks are Python files, cells run as a dependency graph, and the same file is an app, a slide deck, or a script. The thesis figures and the stochastic-transport project are marimo. The 38 `.ipynb` files still in my tree are coursework from before I switched, and none of them will get a successor.

## Go, and the joy of one binary

Gopher, unapologetically. Weave is a single Go binary that runs an HTTP API, an MCP endpoint, a job queue, a reaper, and a snapshot scheduler in one process, and it deploys as one file. Chi for routing, modernc SQLite so there is no CGO, the official MCP SDK, OpenTelemetry. Go's boredom is the feature: a year later the code still reads the same.

## Zig over Rust, for now

I wrote a lot of Rust, ten Cargo projects' worth. Lathe, the document engine, is Zig, with the Rust version kept as a reference implementation that has to agree byte for byte. The reason is not safety or ergonomics, it is the edit-compile-test loop: Zig's build cache and compile times keep me in flow on a large native codebase in a way Rust's did not. Rust still owns the HTML extractor, because the library was already there.

## C where it has to be

Locus is C because tree-sitter is C and the index has to run anywhere with no runtime. I do not start projects in C. I do keep them there when the constraint is real.

## SQLite first

Every repository in Weave is its own SQLite file. cricheros is SQLite. The habit: start with one file you can copy, back up, and diff. Reach for Postgres when there are tenants and concurrent writers (Atlas has both, plus pgvector), and DuckDB when the question is analytical.

## Elixir for swarms

When agents need supervision, mailboxes, and restart strategies, the BEAM already solved it thirty years ago. piexie is an Elixir control plane for LLM agents with real `one_for_one` and `rest_for_one` trees. I would rather borrow OTP than reinvent a scheduler.

## Web, sparingly

- Next.js when a product needs it, and Atlas does. Svelte remains the framework I like; Bun is the runtime I pick when I have a choice.
- Plain HTML, CSS, and a static generator for anything that is a document. This site is Hugo with a 6.5 KB critical bundle and about 3 KB of JavaScript, and it runs the same on a potato phone and a workstation.

## Repositories that agents can read

Eleven of my repositories carry a `CLAUDE.md` and six an `AGENTS.md`. Structured output goes through BAML schemas rather than prompt-and-pray. Code intelligence is an MCP server (Locus) rather than grep. I treat the repository as the interface an agent will use, and write it down the way I would for a new colleague.

## Ops that fail loudly

Docker in thirteen projects, GitHub Actions in nearly all of them. The parts I am proudest of are the gates: mutation testing and cyclomatic ceilings on Weave, sha256 goldens and a hostile-file suite on Lathe, generated docs that fail CI when they drift. Tailscale for anything internal. If a check can be a tool instead of a review comment, it becomes a tool.

## The desk

Arch Linux, Hyprland on Wayland, rofi for launching, alacritty or ghostty for the terminal, tmux, lazygit, Neovim (with Helix and Zed on standby), fish with a zsh fallback, btop, fastfetch for vanity. The config lives in [sithtsar/dotfiles](https://github.com/sithtsar/dotfiles), which the README honestly describes as "may or may not work". On the Mac I run the same terminal stack and pretend.

## Things I avoid

- Jupyter notebooks committed to a repository.
- A framework for a site that is a document.
- Package managers that need a lockfile-of-lockfiles. The seven `package-lock.json` files left in my tree are older projects and are not multiplying.
- Abstractions with one implementation, and config for values that never change.
