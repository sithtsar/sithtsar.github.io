+++
title = "QNLP Financial Intelligence"
description = "A document pipeline for extracting and analysing sentiment across quarterly financial reports."
summary = "A high-throughput pipeline that collects 1,000+ NSE-listed organisations’ reports and turns inconsistent PDFs into analysable text."
date = 2025-02-01
weight = 3
number = "03"
status = "Machine-learning internship"
role = "NLP · data pipelines"
period = "Oct 2024—Feb 2025"
tags = ["Scrapy", "PDF", "NLP"]
question = "How can quarterly filings from more than a thousand organisations become a dependable corpus for sentiment analysis?"
hypothesis = "A staged pipeline combining deterministic extraction with language models can handle scale without treating every PDF as uniform."
evaluation = "Track collection coverage, extraction failures, and agreement between traditional NLP and language-model sentiment signals."
result = "Built scraping and multithreaded PDF-processing pipelines for reports from 1,000+ NSE-listed organisations."
failure = "Inconsistent document structures make extraction quality a prerequisite for any credible downstream sentiment signal."
next_step = "Publish corpus-quality diagnostics and validate sentiment outputs against a hand-labelled sample."

[params]
build = "A Scrapy collection layer, multithreaded PDF processing with regular expressions, and combined LLM and traditional NLP analysis."

[cover_art]
motif = "filings"
density = 6
rotation = 0
label = "NSE / 1K+"
+++

This internship project focused on the unglamorous layer beneath financial NLP: acquiring quarterly reports reliably and converting heterogeneous PDFs into a corpus that analysis can trust.

The pipeline combines Scrapy, multithreaded document processing, regular expressions, language models, and traditional NLP techniques to study sentiment across equity-related filings.
