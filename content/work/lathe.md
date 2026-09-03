+++
title = "Lathe"
description = "A document engine in Zig: PDFs, Office files, HTML, and text in, normalised Markdown chunks out, byte-identical on every run."
summary = "A zero-runtime native engine: 89 documents a second on one core, 250 with a process per core, and a real 85,780-document corpus processed in the cloud for 52 cents."
date = 2026-09-03
weight = 3
number = "03"
status = "Causal Security · sole author"
role = "Systems · Zig"
period = "Aug 2026 — present"
featured = true
tags = ["Zig", "Rust", "Markdown"]
question = "Can document ingestion be fast, deterministic, and cheap enough that re-processing a whole corpus is routine rather than a project?"
hypothesis = "Keep the engine native with no interpreter, resolve extractors once per process, and treat output determinism as a test invariant, not a hope."
evaluation = "Checksummed goldens enforce byte-identical output across the Zig engine, a Rust reference implementation, and repeated runs; a hostile corpus of malformed files; mutation testing on the chunker; fuzz targets on every parser boundary."
result = "89 documents per second in one process, 250 per second with a process per core, about 8 ms median per PDF. A real cloud run processed 85,780 documents, 45 GB, at 60 documents a second across nine workers for $0.52."
failure = "Parsers are external on purpose, so the engine is only as robust as the extractors it wraps, and OCR is opt-in, so scanned PDFs pass through empty unless asked for."
next_step = "Bundle the HTML extractor statically, and make the cloud run a scheduled re-index so corpora never drift from the extractor version."

[timeline]
start = 2026.58
end = 2026.75

[params]
build = "Zig with no runtime; a Rust reference engine that must agree byte for byte; external extractors behind a line-delimited protocol; a structural chunker; goldens, fuzzers, and mutation testing."

[cover_art]
motif = "lathe"
density = 6
rotation = 0
label = "LATHE / ZIG"
+++

Lathe is the machine that feeds Weave. A document goes in, and normalised Markdown chunks come out in a form the graph can ingest.

```
 file ──▶ media type ──▶ extractor ──▶ normalised markdown ──▶ chunks
```

{{< stat value="250" unit="docs / s" label="with one Zig process per performance core; 89 in a single process, about 8 ms median per PDF" >}}
{{< stat value="$0.52" label="to process 85,780 documents (45 GB) on nine cloud workers at 60 documents a second" >}}

Dropping an interpreted wrapper around the PDF extractor saved 30 to 45 MB of memory per worker and cut latency three to ten times. The Rust branch exists so that two independent implementations must agree byte for byte before either is trusted.
