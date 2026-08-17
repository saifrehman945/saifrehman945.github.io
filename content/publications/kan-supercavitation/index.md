---
title: "KAN-Enhanced CFD Modeling of Drag Reduction in Ventilated Super-Cavities Around Underwater Projectiles"
authors:
  - "Umer Farooq"
  - me
date: 2025-01-01
publication_types: ["article-journal"]
publication:
  name: "Engineering Applications of Artificial Intelligence"
status: "Under review · repository status"
research_problem: "Predict transient cavity and drag behaviour around ventilated underwater bodies, then test whether CFD time-series can support faster repeated drag evaluation."
methodology: "Validated transient RANS-VOF for disk- and cone-cavitator cases; KAN drag prediction compared with ANN and SVM baselines."
finding: "The investigated cases report approximately 26% average drag reduction and up to about 27%; the KAN model reports R² ≈ 0.99 on the study's CFD-derived prediction task."
contribution: "My work included modelling ventilated-supercavitation cases, running transient multiphase CFD, and integrating the KAN surrogate with CFD time-series data."
abstract: >
  The study investigates unsteady ventilated supercavitation around underwater bodies using transient RANS with a VOF multiphase formulation and data-driven drag prediction. Disk- and cone-cavitator cases are compared with published experimental and numerical evidence. CFD time-series then support a Kolmogorov-Arnold Network model evaluated against ANN and SVM alternatives.
tags: [cfd, scientific-ml, multiphase, surrogate-modeling]
links:
  - type: pdf
    url: https://drive.google.com/file/d/1wJRxRz8vNWx0Ypg2suM9dwwO6ZPbcZaa/view
    label: Manuscript
---

## Research problem

The paper asks how controlled ventilation changes cavity development and drag around underwater bodies, and whether transient CFD evidence can support an accelerated predictive model without disconnecting the prediction from the simulated physics.

## Method and principal finding

The study uses **transient RANS-VOF**, not DNS or LES, for disk- and cone-cavitator configurations and compares the numerical behaviour with external experimental and published numerical references. Across the investigated manuscript cases, the reported drag reduction is approximately **26% on average** and up to about **27%**. A Kolmogorov-Arnold Network is trained on CFD time-series for transient drag-coefficient prediction and compared with ANN and SVM baselines; the study reports KAN performance of **R² ≈ 0.99** for this prediction task.

![Published experimental cavity behaviour compared with the numerical result](cavitation_comparison_exp.png "Cavity comparison provides external evidence for the multiphase calculation before its time-series are used for predictive modelling.")

![KAN prediction compared with the CFD drag-coefficient time series](kan_drag_prediction.jpg "The predictive model is evaluated against CFD-generated transient evidence rather than presented as a general replacement for multiphase simulation.")

## My contribution

My work included modelling ventilated-supercavitation cases, conducting transient multiphase CFD, and integrating the KAN surrogate with CFD time-series data. I do not attribute unlisted authorship roles to myself.

## Scope

The URANS closure does not resolve all turbulent scales, and the predictive model inherits the geometry, operating-range, and model-form bounds of its CFD dataset. Results outside those conditions require new physical evidence rather than automatic extrapolation.
