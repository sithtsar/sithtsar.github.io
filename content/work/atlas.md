+++
title = "Atlas"
description = "The platform a security team lives in: where an AI security engineer's findings, documents, and organisational context come together on one screen."
summary = "The core web platform at Causal Security: a typed web client over Go services and Postgres, connected to the tools engineering teams already use."
date = 2026-08-11
weight = 1
number = "01"
status = "Causal Security · core platform"
role = "Platform engineering"
period = "May 2025 — present"
featured = true
tags = ["Go", "Next.js", "Postgres"]
question = "Can one platform hold an organisation's engineering context, run AI security work over it, and hand people findings they can actually navigate and edit?"
hypothesis = "Split the system by trust and workload: a thin client, a service that owns identity and data, integrations kept in their own box, and the AI work at arm's length, so each part can fail and scale on its own."
evaluation = "Load and concurrency scripts, a migration-based schema with isolated test databases, a documented API, and a runbook for every deploy path."
result = "It runs the product end to end: single sign-on, a half-dozen integrations with the places engineering teams keep their work, findings flowing back from the analysis engine, and a graph view and editor over the results. I am the largest contributor across client and server."
failure = "The ledger of deferred work is honest and long. Some timelines and personalisation still live client-side, and the test suite has cross-package hygiene left to fix."
next_step = "Give every finding its own timeline, and finish moving all internal traffic onto the scoped-credential path."

[params]
build = "TypeScript and React on the client; Go services; PostgreSQL with vector search; Redis; the usual cloud building blocks; Docker for local parity."

[cover_art]
motif = "atlas"
density = 7
rotation = 0
label = "CIPHER / ATLAS"
+++

Atlas is the application security teams see. Everything else in this register, the knowledge graph, the document engine, the code index, exists to feed it.

```
 people ──▶ client ──▶ services ──▶ data
                          │
                          ├──▶ integrations
                          └──▶ analysis engine ──▶ findings
```

I built the client migration, the service layer that owns identity and data, the database-side audit and queueing, and the path that ships images. The graph view and the editor are where the data model becomes something a person can read.
