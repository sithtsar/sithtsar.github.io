+++
title = "Weave"
description = "The organisation knowledge graph behind Cipher: one service per tenant, one graph per repository, and a typed query language that tells the agent what it does not know."
summary = "A single Go binary per tenant: API, agent endpoint, job queue, and snapshots in one process, with every repository stored as its own embedded database."
date = 2026-09-03
weight = 2
number = "02"
status = "Causal Security · knowledge graph"
role = "Systems · graphs"
period = "Jan 2026 — present"
featured = true
tags = ["Go", "SQLite", "MCP"]
question = "How does an AI security engineer hold an organisation's code in its head without re-reading it on every question?"
hypothesis = "A per-tenant graph with a strict, typed query interface lets the agent ask structural questions cheaply, and a coverage signal stops it confusing 'not ingested' with 'not found'."
evaluation = "Nightly mutation testing at 97% efficacy, race-detector runs, a complexity ceiling enforced in CI, and generated docs that fail the build when they drift from the code."
result = "In production. Jobs run under leases so nothing is processed twice, every repository becomes its own graph linked into the organisation's, and a tenant restores from object storage in one step."
failure = "Two API generations coexist while clients migrate, and the remote-procedure path was deliberately deferred. Both are on the ledger, and neither is free."
next_step = "Retire the legacy surface, and push the coverage signal into the agent's planning loop so it asks for ingestion instead of guessing."

[params]
build = "Go; embedded SQLite, one database per repository; an MCP endpoint for agents; object storage for snapshots; OpenTelemetry throughout."

[cover_art]
motif = "graph"
density = 8
rotation = 0
label = "WEAVE / KG"
+++

Weave is the memory. I wrote most of it: the control plane, the job lease, the ingest dispatcher, the query language, the snapshot format, and the test gauntlet that keeps mutation efficacy above 97%.

```
 repository ──▶ index ──▶ one graph per repo ──▶ one graph per organisation
                                                          │
 agent ◀── typed answer + what was not ingested ◀─────────┘
```

The design decision I would give a talk about is the coverage block: every answer says what was and was not ingested, so an empty result is never silently mistaken for an absent fact.
