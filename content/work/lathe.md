+++
title = "Lathe"
description = "A document-processing engine in Zig that turns PDFs, Office files, HTML, and text into normalised Markdown and chunked NDJSON for Weave's ingestion, with byte-identical output guaranteed by goldens."
summary = "A zero-runtime Zig CLI that routes by media type to external extractors, merges to Markdown, and chunks structurally: 89 documents a second on one core, 250 with a process per core, 85,780 real documents processed on Lambda for $0.52."
date = 2026-09-03
weight = 3
number = "03"
status = "Causal Security · sole author"
role = "Systems · Zig"
period = "Aug 2026 — present"
featured = true
tags = ["Zig", "Rust", "NDJSON"]
question = "Can document ingestion be fast, deterministic, and cheap enough that re-processing a whole corpus is routine rather than a project?"
hypothesis = "Keep the engine native with no interpreter, resolve extractor backends once per process, and treat output determinism as a test invariant, not a hope."
evaluation = "sha256 goldens enforce byte-identical output across the Zig engine, a Rust reference implementation, and repeated runs; a 29-file hostile corpus (61 of 61 checks pass); mutation testing on the chunker's boundary guards; fuzz targets for chunking, parsing, and subprocess classification."
result = "89 documents per second in a single process and 250 per second with one process per M2 performance core, about 8 ms median PDF latency. A real S3 and Lambda run processed 85,780 documents (45 GB) at 60.5 documents per second on 9 workers, 92.4% successful, for $0.52."
failure = "Parsers are deliberately external subprocesses rather than embedded, so the engine is only as robust as anydoc and the HTML extractor, and OCR is opt-in with a warn-only default, which means scanned PDFs pass through as empty unless asked for."
next_step = "Bundle the HTML extractor as a static library, and turn the Lambda run into a scheduled re-index so corpora never drift from the extractor version."

[params]
build = "Zig 0.16 with no runtime; a Rust reference engine on a separate branch; subprocess extractors (anydoc for PDF, Office, and CSV; a Rust HTML extractor); NDJSON protocol over stdio; a structural chunker; goldens, fuzzers, and zentinel mutation testing."

[cover_art]
motif = "lathe"
density = 6
rotation = 0
label = "LATHE / ZIG"
+++

Lathe is the machine that feeds Weave. A document goes in, and normalised Markdown chunks come out in a form the graph can ingest.

```
 file ──▶ media type?
            ├── text/markdown/json ──▶ pass through
            ├── html ──▶ lathe-html-extract (Rust)
            └── pdf/office/csv ──▶ anydoc
                        │
                        ▼
                normalised markdown ──▶ structural chunker ──▶ NDJSON (protocol 1)
```

Removing the Bun-based wrapper around the PDF extractor saved 30 to 45 MB of resident memory per worker and cut latency three to ten times. The Rust branch exists so that two independent implementations must agree byte for byte before either is trusted.
