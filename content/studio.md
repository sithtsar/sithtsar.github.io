+++
title = "Cover Studio"
description = "How the portfolio turns constrained data into lightweight annual-report graphics."
kicker = "System / visual grammar"
show_motifs = true
+++

The covers are data, not uploaded illustrations. Each project chooses an allowlisted motif, label, density, and rotation in its front matter. Hugo converts those fields into a deterministic inline SVG at build time.

This keeps the public website unusually cheap: no canvas runtime, no animation loop, no hydration, and no image request for the main project art. The same content record can appear on an index, a project report, or a future social card without drifting into a different visual language.

## Agent-painted source material

For more organic graphics, an agent can author a small **p5.brush** sketch offline, choose a seed, render several candidates, and commit only the selected SVG or compressed image. The library is a studio tool, not a visitor tax.

The main site does not ship p5.brush. A future `/studio/` experiment may lazy-load it only after explicit interaction, isolated from the portfolio’s critical path. WebAssembly is deferred too: without a measured CPU bottleneck, it would add transfer and initialization cost without making this document faster.

## The constraint set

- Six inks, including the paper ground.
- Three motifs: orbit, signal, and grid.
- Simple geometry that survives monochrome printing.
- Text remains HTML; art never carries the only copy of meaning.
- Unknown motif values fall back to the grid instead of becoming executable markup.
