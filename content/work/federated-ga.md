+++
title = "Genetic client selection"
description = "FedGA: two published genetic-algorithm methods for federated learning, FedCSGA and GenFed, reimplemented and measured against random selection on non-IID MNIST for CS6007 under Prof. Avishek Ghosh."
summary = "A federated-learning simulator with pluggable client selection and aggregation, unit tests, and CI, where the measured result contradicted the expected one: GA-inspired aggregation won by ten points while GA client selection fell below random."
date = 2025-11-07
weight = 6
number = "06"
status = "Course project · CS6007 · IIT Bombay"
role = "Machine learning"
period = "Autumn 2025"
featured = true
guide = "Prof. Avishek Ghosh"
source = "https://github.com/sithtsar/FedGA"
tags = ["PyTorch", "Federated", "Genetic algorithms"]
question = "Do genetic algorithms help federated learning more at the client-selection stage or at the aggregation stage, once you run both against a plain random baseline on the same non-IID split?"
hypothesis = "Following the papers, GA-optimised selection should raise accuracy by five to ten points and cut convergence rounds by twenty to thirty percent against random selection; GA-inspired aggregation should add robustness."
evaluation = "Ten clients on MNIST partitioned non-IID with a Dirichlet α of 0.5, a 784-128-64-10 MLP, five local epochs, five clients per round, fifty rounds. Three arms: random selection with FedAvg, FedCSGA (tournament selection, single-point crossover with repair, adaptive mutation, fitness from local accuracy) with FedAvg, and GenFed (random selection, keep the top ρ models before averaging)."
result = "GenFed averaged 49.1% accuracy over the last ten rounds against 40.1% for the baseline, finishing at 51.0% versus 38.7%. FedCSGA averaged 32.6% and finished at 32.9%, below random selection throughout."
failure = "The GA selection collapsed onto the clients with the highest local accuracy, which under Dirichlet skew are the clients with the narrowest label distributions, so the global model saw fewer classes each round. The fitness function rewarded exactly the wrong thing for a non-IID setting."
next_step = "Replace local accuracy with a fitness that scores label coverage of the selected set, then re-run the sweep and add CIFAR-10, where the papers' gains were reported."

[timeline]
start = 2025.6
end = 2025.95

[params]
build = "Python with PyTorch, uv, pytest, ruff, and GitHub Actions CI. Modules for non-IID partitioning, the MLP, local training and FedAvg and GenFed aggregation, the GA in ga_selection.py (population 90, ten generations, tournament size 3, chromosome repair), and a logging main loop that writes per-round CSV and plots."

[cover_art]
motif = "federated"
density = 6
rotation = 0
label = "FEDGA / CS6007"
+++

The paper said GA client selection should win. The experiment said otherwise, and the repository keeps the CSV so anyone can check.

```
 round t:  local accs ──▶ GA (pop 90, 10 gens) ──▶ chromosome = 5 clients
                              tournament · crossover+repair · adaptive mutation
                                        │
                              train 5 epochs ──▶ FedAvg ──▶ global model
 GenFed:   random 5 ──▶ train ──▶ keep top ρ by accuracy ──▶ average
```

The lesson is about fitness functions, not genetic algorithms. Selecting for high local accuracy under label skew selects for narrow clients. GenFed sidesteps this because it filters after training, on the global test set, rather than before.
