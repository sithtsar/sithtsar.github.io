+++
title = "Weave"
description = "The organisation knowledge graph Cipher queries: one Go service per tenant that ingests repositories into SQLite graphs and answers a typed query language over MCP and HTTP."
summary = "A single Go binary that runs the HTTP and MCP API, a leased job queue, the ingest dispatcher, a reaper, and snapshot scheduling, storing each repository as its own SQLite graph cross-linked into a per-organisation brain."
date = 2026-09-03
weight = 2
number = "02"
status = "Causal Security · cipher-kg"
role = "Systems · graphs"
period = "Jan 2026 — present"
featured = true
tags = ["Go", "SQLite", "MCP"]
question = "How does an AI security engineer hold an organisation's code in its head without re-reading it on every question?"
hypothesis = "A per-tenant graph service with a strict, typed query interface will let the agent ask structural questions cheaply, and a coverage signal will stop it confusing 'not ingested' with 'not found'."
evaluation = "63.9% test coverage, 97.47% mutation-testing efficacy on nightly runs, race-detector tests, a cyclomatic ceiling (max 22, mean 4.19) enforced by a gauntlet, and CI tests that fail when generated docs or config drift from the struct tags they come from."
result = "Weave serves the platform in production: jobs are claimed under a lease, repositories are shallow-cloned and indexed by the Locus engine as a subprocess, every repo becomes its own database linked into the organisation's brain database, and snapshots restore from object storage by manifest generation."
failure = "gRPC was deliberately deferred in an architecture decision record, and the first ingest and graph-query routes are now deprecated redirects, which means two API generations coexist until clients move."
next_step = "Retire the legacy routes, and push the coverage block from the query response into the agent's planning loop so it asks for ingestion instead of guessing."

[params]
build = "Go 1.27; modernc SQLite with an optional Postgres control plane; the MCP Go SDK; AWS SDK v2 for S3 and SQS; OpenTelemetry; Ed25519 delegation JWTs; a typed query IR with field validation and a coverage block; manifest-plus-gzip snapshot generations."

[cover_art]
motif = "graph"
density = 8
rotation = 0
label = "WEAVE / KG"
+++

Weave is the memory. I wrote most of it: the control plane, the job lease, the ingest dispatcher, the query IR, the snapshot format, and the test gauntlet that keeps mutation efficacy above 97%.

```
 POST /v1/jobs ──▶ control.db (leased queue)
                      │ shallow clone
                      ▼
               locus index ──▶ repo.db ─┐
                                        ├──▶ brain.db
               repo.db · repo.db ───────┘    (per org)
                                        │
 POST /v1/query ◀── typed IR + coverage ◀── /mcp
```

The most useful design decision was the coverage block: every answer says what was and was not ingested, so an empty result is never silently mistaken for an absent fact.
