+++
title = "InstiGPT"
description = "A retrieval-augmented assistant for IIT Bombay’s academic and campus information."
summary = "A campus RAG system combining retrieval, LoRA fine-tuning, and context caching to make institutional knowledge easier to query."
date = 2025-03-01
weight = 7
number = "07"
status = "AI Community · IIT Bombay"
role = "Retrieval systems"
period = "2024 — ongoing"
tags = ["RAG", "LoRA", "Inference routing"]
question = "How can students query fragmented academic and campus information without sacrificing grounding?"
hypothesis = "Retrieval, targeted fine-tuning, and cached context can reduce hallucination while keeping answers responsive."
evaluation = "Test answers across academic and event queries, with attention to source relevance and hallucination behavior."
result = "A campus assistant in real use, evaluated on reliability, cost, and user experience, with an in-house high-speed inference client and integrations into student-built apps."
failure = "Campus information changes quickly; stale retrieval context can make a fluent answer confidently wrong."
next_step = "Add source-level freshness signals and publish a grounded-answer evaluation set."

source = "https://github.com/sithtsar/InstiGPT"

[timeline]
start = 2024.0
end = 2026.75

[params]
build = "A RAG pipeline with custom LoRA fine-tuning for Gemini and a locally fine-tuned phi-3 mini, prompt templates, context caching, and an in-house inference client that routes each request to the best model."

[cover_art]
motif = "retrieval"
density = 8
rotation = 0
label = "RAG / IITB"
+++

InstiGPT is designed around a practical campus problem: useful information exists, but it is distributed across documents, communities, and changing institutional sources.

```
 student query
      │
      ▼
   embed ──▶ retrieve ──▶ rerank ──▶ context
                                        │
                        cache hit? ─────┤
                                        ▼
                    Gemini 2.5 Pro (LoRA-tuned)
                                        │
                                        ▼
                             grounded answer + sources
```

The system uses retrieval-augmented generation, LoRA fine-tuning, and context caching to improve relevance and reduce hallucination. An in-house client routes requests dynamically between Gemini and a locally fine-tuned phi-3 mini, and the assistant is evaluated on reliability, cost, and user experience as it integrates with student-built apps.
