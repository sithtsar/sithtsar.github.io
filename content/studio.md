+++
title = "Cover Studio"
description = "The covers on this site are a few numbers in a text file. Here is how they become pictures."
kicker = "How the covers work"
show_motifs = true
+++

The covers are not images. Each project picks a motif, a label, a density, and a rotation in its front matter, and Hugo turns those four values into an inline SVG at build time.

That keeps the site cheap: no image requests for the main art, no animation loop, nothing to hydrate. The same record can show up on the index, a case page, or a social card and still look like it belongs.

## Agent-painted source material

For more organic graphics, an agent can author a small **p5.brush** sketch offline, choose a seed, render several candidates, and commit only the selected SVG or compressed image. The library is a studio tool, not a visitor tax.

The main site does not ship p5.brush. A future `/studio/` experiment may lazy-load it only after explicit interaction, isolated from the portfolio’s critical path. WebAssembly is deferred too: without a measured CPU bottleneck, it would add transfer and initialization cost without making this document faster.

## The constraint set

- Six inks, including the paper ground.
- Three project diagrams: flow lattice, retrieval graph, and document pipeline.
- Simple geometry that survives monochrome printing.
- Text remains HTML; art never carries the only copy of meaning.
- Unknown motif values fall back to the flow diagram instead of becoming executable markup.

{{< plate motif="graph" label="STUDIO / PLATE" >}}A plate placed from Markdown with the `plate` shortcode: same grammar, same inks, no image file.{{< /plate >}}
