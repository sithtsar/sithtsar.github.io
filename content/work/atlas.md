+++
title = "Atlas"
description = "The core web platform behind Cipher, Causal Security's AI security engineer: connectors, findings, documents, and a knowledge-graph UI on a Go and Next.js stack."
summary = "A multi-service security platform: Next.js 16 client, Go API and connector services, a Python AI service, Postgres with pgvector, and OAuth connectors to GitHub, GitLab, Jira, Confluence, Google Drive, and Slack."
date = 2026-08-11
weight = 1
number = "01"
status = "Causal Security · core platform"
role = "Platform engineering"
period = "May 2025 — present"
featured = true
tags = ["Go", "Next.js", "Postgres"]
question = "Can one platform ingest an organisation's engineering context, run AI pentest work over it, and hand security teams findings they can actually navigate and edit?"
hypothesis = "Split the system by trust and workload: a thin Next.js client, a Go API that owns auth and data, a separate connector service for third-party OAuth and webhooks, and a Python service for the AI work, joined by delegation tokens rather than shared secrets."
evaluation = "API and concurrent-load stress scripts, migration-based schema with per-package test databases, an OpenAPI-documented server, and runbooks for every deploy path."
result = "The platform runs the product end to end: SSO via WorkOS, JWT plus CSRF sessions, six connector integrations, task execution through the Cipher backend, embeddings for retrieval, and a D3 knowledge graph and Milkdown editor over the results. I am the largest contributor across client and server."
failure = "The deferred-work ledger is long. Per-finding timestamps wait on the execution backend, dashboards are not personalised server-side, test databases can pollute each other across packages, and the host CI does not yet run with the race detector."
next_step = "Finish the execution-backend contract so findings carry their own timeline, and move the remaining cross-service calls onto the delegation-token path."

[params]
build = "Next.js 16 with React 19 and TypeScript (Radix UI, AG Grid, D3, Milkdown, Tailwind); Go 1.25 with Chi for the API and connector services; a Python 3.13 AI service; PostgreSQL 16 with pgvector; Redis; S3, SES, SQS, and KMS; Docker Compose for local parity."

[cover_art]
motif = "atlas"
density = 7
rotation = 0
label = "CIPHER / ATLAS"
+++

Atlas is the application security teams see when they use Cipher. Everything else in this register, the knowledge graph, the document engine, the code index, exists to feed it.

```
 browser ──▶ Next.js ──▶ Go API ──▶ Postgres + pgvector
                          │  │
                          │  └──▶ connector service ──▶ GitHub · GitLab · Jira
                          │                              Confluence · Drive · Slack
                          └──▶ Cipher backend (task execution) ──▶ findings
```

I built the frontend migration from Svelte 5 to Next.js 15 and then 16, the Go API's auth and delegation layer, the Postgres triggers that audit and enqueue work, and the Docker and GitHub Actions path that publishes images. The knowledge-graph view and the document editor are where the platform's data model becomes something a person can read.
