+++
title = "Federated LoRA under drift"
description = "FedICU: a federated instruction-tuning harness where each client's LoRA update is split into consensus and divergence and aggregated by similarity, built toward a DoRA variant, with the MeDAL Lab under Prof. Amit Sethi."
summary = "A PyTorch and PEFT federated SFT harness with pluggable aggregation: FedAvg, FedProx, SCAFFOLD, the adaptive FedOpt family, and FedICU's similarity-weighted consensus and divergence split, evaluated through an MT-Bench pipeline."
date = 2025-11-07
weight = 6
number = "06"
status = "Research project · MeDAL Lab · IIT Bombay"
role = "Machine learning research"
period = "Autumn 2025"
featured = true
guide = "Prof. Amit Sethi"
source = "https://github.com/sithtsar/FedGA"
tags = ["PyTorch", "PEFT", "Federated"]
question = "Can federated fine-tuning of a language model on non-IID client data keep the shared capability every client needs while still absorbing each client's genuine divergence?"
hypothesis = "Decompose each client's LoRA delta into a consensus component and a divergence component, weight aggregation by inter-client cosine similarity through a low-temperature softmax, and the model forgets less than plain averaging at high heterogeneity."
evaluation = "MT-Bench single-answer and pairwise grading with a GPT-4 judge across FedICU and the baseline aggregators over communication rounds and client counts; a separate course study (FedGA) compares genetic-algorithm client selection against random selection on Dirichlet-split MNIST with 10 clients over 50 rounds."
result = "The harness runs end to end after repairing the original codebase's import errors, undefined variables, and incomplete aggregation; FedICU is implemented as a peer of the baselines; the DoRA magnitude-vector path exists in the aggregator. The FedGA study ships with tests and CI."
failure = "No full-scale training run has produced MT-Bench numbers yet, DoRA is scaffolded but not switched on in the default config, and the FedGA improvements are stated as expected rather than measured. This page will carry the tables when they exist."
next_step = "Run the sweep: vary Dirichlet heterogeneity and client count, enable DoRA to complete the BiDoRa idea, and publish the FedICU-versus-baseline MT-Bench comparison here."

[params]
build = "Python 3.11, PyTorch, Hugging Face transformers and peft, trl for SFT, non-IID dataset splitting, Alpaca and Vicuna templates, aggregation in fed_global.py with a DoRA-aware code path, and an MT-Bench evaluation wrapper."

[cover_art]
motif = "federated"
density = 6
rotation = 0
label = "FEDICU / MEDAL"
+++

This is research in progress, and the evidence chain says so plainly. The interesting part is the aggregator: instead of averaging client updates, it measures how much each client agrees with the others and trusts agreement more, while keeping a channel for real divergence.

```
 client 1 ─ ΔLoRA ─┐
 client 2 ─ ΔLoRA ─┤   cosine similarity ──▶ softmax(τ = 0.1) ──▶ weights
 client k ─ ΔLoRA ─┘            │
                                ▼
            consensus component  +  divergence component  ──▶ global adapter
```

The companion study, FedGA, was a course project under Prof. Avishek Ghosh reimplementing two published genetic-algorithm client-selection methods (FedCSGA and GenFed) against random selection.
