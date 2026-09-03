+++
title = "QNLP Financial Intelligence"
description = "A document pipeline for extracting and analysing sentiment across quarterly financial reports."
summary = "A high-throughput pipeline that collects 1,000+ NSE-listed organisations’ reports and turns inconsistent PDFs into analysable text."
date = 2025-02-01
weight = 3
number = "03"
status = "Internship · Dr. Darsh Shah, MIT"
role = "NLP · data pipelines"
period = "Autumn 2024"
tags = ["Scrapy", "OCR", "Gemini"]
question = "How can quarterly filings from more than a thousand organisations become a dependable corpus for sentiment analysis?"
hypothesis = "A staged pipeline combining deterministic extraction with language models can handle scale without treating every PDF as uniform."
evaluation = "Track collection coverage, extraction failures, and agreement between traditional NLP and language-model sentiment signals."
result = "A real-time Scrapy listener over 1,000+ NSE-listed companies, OCR including mixtral-ocr for PDF to Markdown, and parallel Gemini processing that emits investment-decision macros and KPIs."
failure = "Inconsistent document structures make extraction quality a prerequisite for any credible downstream sentiment signal."
next_step = "Publish corpus-quality diagnostics and validate sentiment outputs against a hand-labelled sample."

source = "https://github.com/sithtsar/QNLP"

[params]
build = "A Scrapy listener that collects quarterly reports as they land, OCR experiments including mixtral-ocr for PDF to Markdown, multithreaded regex extraction, and parallel Gemini API runs combined with traditional NLP."

[cover_art]
motif = "filings"
density = 6
rotation = 0
label = "NSE / 1K+"
+++

This internship project focused on the unglamorous layer beneath financial NLP: acquiring quarterly reports reliably and converting heterogeneous PDFs into a corpus that analysis can trust.

```
 NSE-listed orgs (1,000+)
      │  Scrapy
      ▼
 quarterly report PDFs ──▶ worker pool ×N
                                │  regex extraction
                                ▼
                        normalised text corpus
                          │             │
                 classical NLP        LLM read
                          │             │
                          └──▶ sentiment ◀──┘
```

The pipeline combines a Scrapy listener, OCR (including mixtral-ocr for PDF to Markdown), multithreaded regex extraction, and parallel Gemini API processing with traditional NLP to produce sentiment, investment-decision macros, and KPIs across equity-related filings.
