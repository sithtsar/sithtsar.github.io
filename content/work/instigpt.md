+++
title = "InstiGPT"
description = "A retrieval-augmented assistant for IIT Bombay’s academic and campus information."
summary = "A campus RAG system combining retrieval, LoRA fine-tuning, and context caching to make institutional knowledge easier to query."
date = 2025-03-01
weight = 2
number = "02"
status = "AI Community · IIT Bombay"
role = "Retrieval systems"
period = "2024—2025"
tags = ["RAG", "LoRA", "Gemini"]
question = "How can students query fragmented academic and campus information without sacrificing grounding?"
hypothesis = "Retrieval, targeted fine-tuning, and cached context can reduce hallucination while keeping answers responsive."
evaluation = "Test answers across academic and event queries, with attention to source relevance and hallucination behavior."
result = "Built a RAG assistant for IIT Bombay and began integrating it with other student-built applications."
failure = "Campus information changes quickly; stale retrieval context can make a fluent answer confidently wrong."
next_step = "Add source-level freshness signals and publish a grounded-answer evaluation set."

[params]
build = "A RAG pipeline with LoRA fine-tuning, context caching, and Gemini 2.5 Pro for answer generation."

[cover_art]
motif = "retrieval"
density = 8
rotation = 0
label = "RAG / IITB"
+++

InstiGPT is designed around a practical campus problem: useful information exists, but it is distributed across documents, communities, and changing institutional sources.

The system uses retrieval-augmented generation, LoRA fine-tuning, and context caching to improve relevance and reduce hallucination. Work with IIT Bombay communities is expanding its reach into student-built applications.
