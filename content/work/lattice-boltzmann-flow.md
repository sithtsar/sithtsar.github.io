+++
title = "Lattice Boltzmann Flow"
description = "An entropic Lattice Boltzmann solver in C++, built as my bachelor thesis, that stays stable where BGK breaks down and extends to two-phase and active-matter flows."
summary = "A header-only C++17 ELBM solver with H-theorem enforcement, D2Q9 and D3Q19 lattices, and a validation suite comparing BGK against entropic collisions from Re 10 to 1000."
date = 2025-11-25
weight = 5
number = "05"
status = "Bachelor thesis project · IIT Bombay"
role = "Scientific computing"
period = "2025 — 2026"
featured = true
tags = ["C++17", "ELBM", "Two-phase"]
question = "Can an entropic collision operator keep a lattice Boltzmann solver stable at Reynolds numbers where the standard BGK operator fails?"
hypothesis = "Enforcing the discrete H-theorem through a two-step collision, an iso-entropic α-relaxation followed by β-dissipation, gives unconditional stability without abandoning the BGK structure."
evaluation = "Rectangular pipe flow at Re ≈ 10, 100, and 1000, analytical Couette, Poiseuille, and Taylor–Green cases, and lid-driven cavity and cylinder benchmarks, each run with BGK and ELBM side by side."
result = "The solver reproduced the thesis figures comparing BGK and ELBM stability, recovered the analytical profiles, and extended to active-matter swarms coupled to the fluid."
failure = "Stability is not free: every entropic collision solves a Newton–Raphson problem for α in each cell, and BGK runs at high Reynolds number diverge before a like-for-like comparison is even possible."
next_step = "Validate the H-theorem for two-phase immiscible flows with a colour-gradient formulation, then push the framework into active-matter systems and publish the BGK-versus-ELBM comparison."

guide = "Prof. Amol Subhedar"
source = "https://github.com/sithtsar/BTP"

[timeline]
start = 2025.0
end = 2026.4

[params]
build = "A header-only C++17 solver with BGK and entropic collision operators, D2Q9 and D3Q19 lattices, bounce-back and Zou–He boundaries, optional OpenMP, and Marimo notebooks that generate the validation figures."

[cover_art]
motif = "flow"
density = 7
rotation = 0
label = "ELBM / D2Q9"
+++

This was my undergraduate bachelor thesis project (BTP-1) at IIT Bombay, guided by Prof. Amol Subhedar. It grew out of an earlier CL469 course solver (Spring 2025, same guide) built around the BGK collision operator, and implements the entropic formulation of Hosseini et al. (2023) so that the discrete entropy H = Σ fᵢ ln(fᵢ / wᵢ) is never allowed to grow.

```
D2Q9 velocity set            two-step entropic collision

    6     2     5            f*  = f + α (f_eq − f)
      ╲   │   ╱                    with H(f*) = H(f)
   3 ──── 0 ──── 1
      ╱   │   ╲              f'  = (1 − β) f + β f*
    7     4     8
                             ν   = c_s² (1/αβ − 1/2) Δt
```

The collision runs in two steps: an α-relaxation solved by Newton–Raphson so entropy is conserved, then a β-dissipation that sets the viscosity. The same code paths drive the BGK comparison, the analytical and benchmark test suites, and an active-matter extension with run-and-tumble particles coupled bidirectionally to the flow. The current phase validates the H-theorem for two-phase immiscible flows using a colour-gradient lattice Boltzmann formulation to study interface dynamics.

Source: [github.com/sithtsar/BTP](https://github.com/sithtsar/BTP).
