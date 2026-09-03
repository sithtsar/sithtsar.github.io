+++
title = "Lattice Boltzmann Flow"
description = "A modular C++ fluid solver exploring stable lattice-based simulation at higher Reynolds numbers."
summary = "A C++ and OpenMP solver using the BGK collision operator, entropic stabilization, and canonical CFD benchmarks."
date = 2025-04-01
weight = 1
number = "01"
status = "Course project · IIT Bombay"
role = "Scientific computing"
period = "Spring 2025"
featured = true
tags = ["C++", "OpenMP", "CFD"]
question = "Can a compact lattice solver recover canonical incompressible flow while remaining stable at higher Reynolds numbers?"
hypothesis = "Entropic stabilization can control subgrid-scale dissipation without abandoning the BGK formulation’s modular structure."
evaluation = "Validate Navier–Stokes recovery against canonical CFD cases, including the lid-driven cavity benchmark."
result = "The solver reproduced canonical benchmark behavior while supporting an experimental entropic LBM extension."
failure = "Higher-Reynolds-number flows expose numerical instability, making collision-model and stabilization choices central to the design."
next_step = "Extend the entropic formulation and publish comparative stability and scaling results."

[params]
build = "A modular C++ Lattice Boltzmann solver with BGK collision, OpenMP parallelization, and an entropic-stabilization prototype."

[cover_art]
motif = "flow"
density = 7
rotation = 0
label = "LBM / D2Q9"
+++

Built as a course project at IIT Bombay under Prof. Amol Subedar, this solver connects a microscopic lattice update to macroscopic fluid behavior.

The implementation uses the BGK collision operator and OpenMP parallelization. Entropic stabilization was integrated to explore numerical stability at higher Reynolds numbers and control subgrid-scale dissipation.
