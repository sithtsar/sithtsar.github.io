+++
title = "About"
description = "B.Tech Chemical Engineering, IIT Bombay ’26, with a minor in Artificial Intelligence and Data Science from C-MInDS."
kicker = "Profile / 2026"
story = true
+++

I graduated from IIT Bombay in 2026 with a B.Tech in Chemical Engineering and a minor in Artificial Intelligence and Data Science from C-MInDS.

I currently build agentic AI infrastructure at Causal Security, and my thesis work extends entropic lattice Boltzmann methods to two-phase and active-matter flows. I am most interested in problems where models must survive contact with physical systems or messy real-world information, and I am open to engineering and research roles where ambitious systems need rigorous implementation, clear evidence, and fast iteration.

## Education

### Indian Institute of Technology Bombay
2022 — 2026 · B.Tech, Chemical Engineering · Minor, Artificial Intelligence and Data Science, C-MInDS

### Krishna Public School, Bhilai
2007 — 2022 · CBSE · 92.6% (Class X) · 95.2% (Class XII)

## Experience

### Causal Security
Summer 2025 — present · Agentic AI platform and AWS ETL pipeline · remote

- Built Atlas, the core platform: a typed web client, Go services, Postgres with vector search, and integrations with the tools engineering teams already use.
- Wrote Weave, the per-tenant knowledge graph in Go that the agent queries: one graph per repository, jobs under leases, 97% mutation-testing efficacy.
- Wrote Lathe, a Zig document engine: PDFs, Office files, and HTML to Markdown chunks at 250 documents a second, byte-identical across runs.
- Integrated and hardened Locus, the C code-intelligence engine that turns repositories into graphs: 158 languages, the Linux kernel in about three minutes.
- Made the services Docker-native with CI/CD and image publishing, database-side audit and queueing, and a private network for internal traffic.
- Built the Python ETL that turns PDFs, video, images, and audio into structured training data: transcription, video-token pruning, PDF OCR, hash-based asset tracking, and checkpointed parallel workers.

### QNLP
Autumn 2024 · Intern under Dr. Darsh Shah, Massachusetts Institute of Technology · remote

- Built a Scrapy listener that scrapes quarterly reports of NSE-listed companies in real time.
- Experimented with OCR techniques including the mixtral-ocr API to convert PDF documents into Markdown.
- Processed files in parallel with the Gemini API to produce investment-decision macros and other KPIs.

### Zwilling Labs — Digital Twin Platform
Summer 2024 · Machine Learning Engineer · SINE, IIT Bombay · awarded a letter of recommendation

- Used Isolation Forest, KANs, and kPCA for outlier detection on IoT machine data in an unsupervised pipeline.
- Forecast maintenance needs and anomalies from time-series data on TimescaleDB.
- Co-built a REST API backend on PostgreSQL with row-level security and a SvelteKit dashboard, deployed on AWS EC2 with role-based access.

### Lechler India — Nozzle Spray Pattern Analysis Tool
Summer 2024 · Computer Vision Engineer · Prospace, IIT Bombay

- Built OpenCV software that automates 3D visualisation of a nozzle's water-level geometry and spray pattern.
- Used ArUco markers for proximity detection and scale transformation on frames from live video.
- Shipped a Tauri and Plotly GUI with multiple visualisation modes and a debug mode.

## Research

### CFD — Two-phase flows
Autumn 2025 · Bachelor thesis project · Prof. Amol Subhedar

- Validating the H-theorem for entropic lattice Boltzmann models in two-phase immiscible flows.
- Implementing colour-gradient lattice Boltzmann formulations to study interface dynamics and population interactions.
- Extending the lattice Boltzmann framework to active-matter systems for non-equilibrium behaviour.

### Federated learning with genetic algorithms
Autumn 2025 · CS6007 · Prof. Avishek Ghosh

- Reimplemented FedCSGA and GenFed and measured them against random selection on Dirichlet-split MNIST with tests and CI.
- Found GA-inspired aggregation ten points ahead of the baseline and GA client selection below it, and traced the cause to a fitness function that rewards narrow clients.

### Federated LoRA under drift (FedICU, in progress)
Autumn 2025 · Research project · MeDAL Lab · Prof. Amit Sethi

- A federated instruction-tuning harness splitting each client's LoRA update into consensus and divergence, aggregated by similarity, toward a DoRA variant.
- Pipeline verified end to end against FedAvg, FedProx, and SCAFFOLD baselines with an MT-Bench evaluator; the full sweep is still to run.

## Positions of responsibility

### Community Manager, AI Community
April 2024 — April 2025 · Institute Technical Council, IIT Bombay

- Managed and mentored a team of 7 junior engineers through hackathons and AI product development.
- Worked with industry and academia on AI products, research, and consulting.
- Maintained InstiGPT and Et.al under high inference demand.

### Department Academic Mentor
May 2024 — present · Student Mentorship Program, IIT Bombay

- One of 20+ mentors chosen from 125 applicants through interviews and peer review.
- Mentor for undergraduates and ARP students on academic and general questions.
- Maintained the DAMP resources and blog subgroup, now heading the web subgroup.

### Teaching Assistant, SC653 Optimisation for Large-Scale Machine Learning
July — November 2024 · Prof. Avishek Ghosh · IIT Bombay

- Sole undergraduate TA, selected on a top AA-grade performance in the previous iteration.
- Graded assignments and exams and supported a cohort of 50+ students.

### Convener, Design Team
March 2023 — March 2024 · Institute Technical Council, IIT Bombay

- Led templates, posters, graphics, and merchandise for multiple teams and events in Figma, Canva, Photoshop, and Illustrator.

## Scholastic achievements

- 99.3 percentile in JEE Advanced 2022 among 0.16 million+ candidates.
- 99.749 percentile in JEE Mains 2022 among 0.8 million+ candidates.
- INSPIRE scholarship for top 1% marks at state level, 2022.
- Two AA grades for exceptional performance in ML optimisation and design courses, 2023–24.

## Technical skills

- **Languages:** proficient in C/C++, Python, and Go; familiar with JavaScript, TypeScript, and Rust.
- **Libraries:** PyTorch, TensorFlow, Keras, scikit-learn, NumPy, Pandas, Matplotlib, OpenCV, Pocketflow, LangChain, LangGraph.
- **Web and software:** HTML5, CSS, Node.js, Svelte, Next.js, Express, Bun, PostgreSQL.
- **Cloud:** AWS EC2, S3, Lambda, RDS, IAM, Bedrock, SageMaker; Azure VMs and AI Foundry.
- **Tools:** Git and GitHub, Docker, MATLAB, Fusion 360, Figma.

## Coursework

- **Mathematics:** Calculus I and II, Differential Equations, Linear Algebra, Numerical Methods, AI and DS.
- **Data science and AI/ML:** Large-Scale Optimization in Machine Learning, Statistical Machine Learning and Data Mining, Programming in Data Science, Random Processes in Learning and Control, NLP and Web, MAML, Online ML and Bandits.
- **Computer science and interdisciplinary:** Computer Programming and Utilization, Advanced Methods in Satellite Image Processing, Introduction to Management, Economics, Makerspace, Design Innovation and Thinking.
- **Chemical engineering:** Introduction to Chemical Engineering, Materials and Energy Balances, Transport Phenomena, Fluid Transport, Thermodynamics, Process Control, Chemical Process, Chemical Process Design, Chemical Engineering Lab I and II.

## Beyond coursework

- 4th of 100+ teams in SARCasm Crypthunt, IIT Bombay, December 2022.
- Built medical image segmentation models for Hostel 9 in the AI/ML Hostel General Championship, March 2024.
- Designed merchandise for WnCC's Codewars and mentored a group of undergraduates for the competition, March 2024.
- Organised IIT Bombay's Tech RnD Expo, October 2023.
- Organised Techfest, Asia's largest technical festival, December 2022.
- 80+ hours with the NSS Educational Outreach Programme, teaching basic sciences to underprivileged children through two NGOs, 2022–23.

## Working principles

**Make the evidence inspectable.** A confident claim without a route back to its source is decoration.

**Prefer small systems with clear seams.** Performance, accessibility, and maintainability are design materials, not cleanup tasks.

**Write down the failure.** The limits of an approach often reveal more judgment than the polished result.
