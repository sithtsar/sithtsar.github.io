+++
title = "Locus"
description = "Causal Security's code-intelligence engine: a hardened fork of the open-source codebase-memory-mcp, pure C with tree-sitter parsers for 158 languages, embedded as Weave's indexer."
summary = "A native MCP server that parses a repository into a persistent graph of files, symbols, calls, and configuration in SQLite, with an openCypher read subset and a custom type-resolution layer, indexing the Linux kernel's 28 million lines in three minutes."
date = 2026-09-02
weight = 4
number = "04"
status = "Causal Security · fork of codebase-memory-mcp"
role = "Systems · C"
period = "Feb 2026 — present"
featured = true
tags = ["C", "tree-sitter", "SQLite"]
question = "What does an agent need to know about a codebase to answer structural questions without reading the files, and how cheap can building that be?"
hypothesis = "A tree-sitter pass over every language plus a targeted type-resolution layer for the ten that matter yields call graphs good enough for security reasoning, at native speed and with no runtime to ship."
evaluation = "Benchmarks across 63 languages and real repositories: Linux kernel (28M lines, 75K files) indexed in about 3 minutes into 4.81M nodes and 7.72M edges; Django in about 6 seconds into 49K nodes; Cypher queries under a millisecond."
result = "Locus is the engine Weave shells out to for every ingest. The fork carries our integration commits and build hardening on top of the upstream project, whose pipeline, daemon, Louvain community detection, and hybrid LSP layer do the heavy lifting."
failure = "This is a fork, not a from-scratch parser: the vast majority of the code is upstream work by the codebase-memory-mcp maintainers, and my commits are integration, packaging, and fixes. The Cypher subset also excludes writes, MERGE, CALL, and comprehensions, and many listed languages are unbenchmarked."
next_step = "Upstream the integration fixes, pin the grammar set Weave actually needs, and add security-specific edge types (taint sources, sinks, auth boundaries) on top of the call graph."

[params]
build = "Pure C with vendored tree-sitter grammars for 158 languages, embedded SQLite, mimalloc, xxhash, yyjson, LZ4 for RAM-first indexing, 15 JSON-RPC MCP tools, an openCypher read-subset engine, a git-polling watcher, and a 3D graph UI."

[cover_art]
motif = "locus"
density = 7
rotation = 0
label = "LOCUS / CMM"
+++

Locus is where a repository becomes a graph. Weave asks it to index a clone, and it returns a SQLite database of symbols and relationships that the knowledge graph links into the organisation's brain.

```
 repo ──▶ tree-sitter (158 grammars) ──▶ structure ──▶ definitions ──▶ calls
                                                            │
                                     hybrid LSP (10 languages) refines CALLS edges
                                                            │
                                                            ▼
                                   SQLite graph + Louvain communities ──▶ Cypher / MCP
```

Credit where it belongs: the parsing pipeline is upstream open-source work. What is ours is the integration into Weave as a leased subprocess, the packaging, and the fixes that came out of running it against real customer repositories.
