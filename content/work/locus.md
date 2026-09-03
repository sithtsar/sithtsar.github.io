+++
title = "Locus"
description = "The code-intelligence engine: a hardened fork of an open-source project, pure C with parsers for 158 languages, embedded as Weave's indexer."
summary = "A native engine that parses a repository into a persistent graph of files, symbols, and calls, queryable in a Cypher subset, indexing the Linux kernel's 28 million lines in about three minutes."
date = 2026-09-02
weight = 4
number = "04"
status = "Causal Security · fork of an open-source engine"
role = "Systems · C"
period = "Feb 2026 — present"
featured = true
tags = ["C", "tree-sitter", "SQLite"]
question = "What does an agent need to know about a codebase to answer structural questions without reading the files, and how cheap can building that be?"
hypothesis = "A tree-sitter pass over every language plus a targeted type-resolution layer for the ones that matter yields call graphs good enough for security reasoning, at native speed and with no runtime to ship."
evaluation = "Benchmarks across 63 languages and real repositories: the Linux kernel, 28 million lines, indexed in about three minutes into 4.8 million nodes and 7.7 million edges; Django in about six seconds; queries under a millisecond."
result = "Locus is the engine behind every ingest. The fork carries our integration and build hardening on top of the upstream project, whose pipeline and analysis do the heavy lifting."
failure = "This is a fork, not a from-scratch parser: most of the code is the upstream maintainers' work, and my commits are integration, packaging, and fixes. The query subset is read-only, and many listed languages are unbenchmarked."
next_step = "Upstream the fixes, pin the grammar set we actually need, and add security-specific edges, sources, sinks, and auth boundaries, on top of the call graph."

[timeline]
start = 2026.08
end = 2026.75

[params]
build = "Pure C with vendored tree-sitter grammars for 158 languages, embedded SQLite, a read-only Cypher subset, and an MCP surface."

[cover_art]
motif = "locus"
density = 7
rotation = 0
label = "LOCUS / CMM"
+++

Locus is where a repository becomes a graph. Weave asks it to index a clone and gets back a database of symbols and relationships to link into the organisation's graph.

```
 repo ──▶ parse (158 grammars) ──▶ symbols ──▶ calls ──▶ graph ──▶ queries
```

{{< aside >}}Credit where it belongs: the parsing pipeline is upstream open-source work by the codebase-memory-mcp maintainers. What is ours is the integration as a leased subprocess, the packaging, and the fixes that came out of running it against real repositories.{{< /aside >}}
