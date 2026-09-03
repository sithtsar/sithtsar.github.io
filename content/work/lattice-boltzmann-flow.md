+++
title = "Lattice Boltzmann Flow"
description = "An entropic Lattice Boltzmann solver in C++, built as my bachelor thesis, that stays stable where standard BGK collisions break down."
summary = "A header-only C++17 ELBM solver with H-theorem enforcement, D2Q9 and D3Q19 lattices, and a validation suite comparing BGK against entropic collisions from Re 10 to 1000."
date = 2025-11-25
weight = 1
number = "01"
status = "Bachelor thesis project · IIT Bombay"
role = "Scientific computing"
period = "2025"
featured = true
tags = ["C++17", "ELBM", "OpenMP"]
question = "Can an entropic collision operator keep a lattice Boltzmann solver stable at Reynolds numbers where the standard BGK operator fails?"
hypothesis = "Enforcing the discrete H-theorem through a two-step collision, an iso-entropic α-relaxation followed by β-dissipation, gives unconditional stability without abandoning the BGK structure."
evaluation = "Rectangular pipe flow at Re ≈ 10, 100, and 1000, analytical Couette, Poiseuille, and Taylor–Green cases, and lid-driven cavity and cylinder benchmarks, each run with BGK and ELBM side by side."
result = "The solver reproduced the thesis figures comparing BGK and ELBM stability, recovered the analytical profiles, and extended to active-matter swarms coupled to the fluid."
failure = "Stability is not free: every entropic collision solves a Newton–Raphson problem for α in each cell, and BGK runs at high Reynolds number diverge before a like-for-like comparison is even possible."
next_step = "Extend the two-phase and active-nematic branches and publish the BGK-versus-ELBM stability and scaling comparison."

[params]
build = "A header-only C++17 solver with BGK and entropic collision operators, D2Q9 and D3Q19 lattices, bounce-back and Zou–He boundaries, optional OpenMP, and Marimo notebooks that generate the validation figures."

[cover_art]
motif = "flow"
density = 7
rotation = 0
label = "ELBM / D2Q9"
+++

This was my undergraduate bachelor thesis project (BTP-1) at IIT Bombay. It grew out of an earlier CL469 course solver built around the BGK collision operator, and implements the entropic formulation of Hosseini et al. (2023) so that the discrete entropy H = Σ fᵢ ln(fᵢ / wᵢ) is never allowed to grow.

The collision runs in two steps: an α-relaxation solved by Newton–Raphson so entropy is conserved, then a β-dissipation that sets the viscosity. The same code paths drive the BGK comparison, the analytical and benchmark test suites, and an active-matter extension with run-and-tumble particles coupled bidirectionally to the flow.

Source: [github.com/sithtsar/BTP](https://github.com/sithtsar/BTP).
