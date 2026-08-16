---
title: "CamberLab"
date: 2026-08-06
weight: 30
summary: "Uncertainty-aware surrogate modelling built from a systematically sampled OpenFOAM dataset, with held-out testing and explicit warnings beyond the CFD evidence."
tags: [cfd, machine-learning, aerodynamics, surrogate-modeling]
tech_stack:
  - OpenFOAM 12
  - Python / scikit-learn
  - Gaussian Process / MLP / Kriging
  - Latin Hypercube Sampling
featured: true
highlights:
  - "Systematically sampled OpenFOAM cases across the design space"
  - "Regime-aware dataset generation and reference checks"
  - "Frozen train/test splits for surrogate comparison"
  - "Predictive uncertainty and explicit extrapolation warnings"
links:
  - type: code
    url: https://github.com/saifrehman945/CamberLab
    label: Code
  - type: site
    url: https://camberlab.streamlit.app/
    label: Research Demo
---

## Research question

How can expensive CFD evidence be transformed into a fast predictive model without hiding uncertainty or extrapolation?

An OpenFOAM calculation can provide physically interpretable aerodynamic evidence, but repeating it across geometry and operating conditions is costly. A surrogate predicts in milliseconds, yet that speed is useful only if the training evidence, test discipline, and limits of applicability remain visible.

## Building the CFD evidence

Latin Hypercube Sampling defines a systematic campaign across Reynolds number, angle of attack, thickness, and camber variables. Python generates the NACA geometries, Gmsh constructs regime-specific meshes, and OpenFOAM executes the sampled cases. Convergence and reference checks gate results before they enter surrogate training.

The workflow classifies flow conditions before simulation because attached turbulent flow, near-stall separation, lower-Reynolds-number behaviour, and higher-Reynolds-number attached flow do not justify one unexamined CFD setup. Regime-specific templates vary turbulence treatment, mesh density, wall treatment, and target y+; the regime label remains explicit in the dataset.

`design-space sampling → controlled CFD campaign → quality gates → structured dataset`

## Comparing surrogate models

Gaussian Process, Random Forest, multilayer perceptron, and Kriging models learn lift and drag from the accepted CFD cases. Frozen train/test indices and fixed random seeds keep model comparisons reproducible and prevent favourable resampling from masquerading as improvement. The deployed model artifacts are separate from OpenFOAM, so inference is fast while the provenance of the training evidence remains traceable.

## Showing where prediction can be trusted

![CamberLab view with lift and drag sweeps, uncertainty bands, nearby CFD samples, and extrapolation warnings](camberlab-dashboard.png "Predictions are shown beside uncertainty information and nearby CFD samples. Unsupported regions are marked instead of being presented with the same confidence as interpolated results.")

Confidence bands expose predictive uncertainty, nearby CFD samples show local evidence density, and warnings identify points outside the trained envelope. Unsupported camber can fall back to a symmetric geometry, stall-region predictions are flagged as extrapolation, and incomplete regimes receive lower confidence. The Streamlit interface is a presentation layer for these research choices, not the central contribution.

## Validation and limitations

The surrogate evaluation uses held-out CFD cases, while the underlying simulation campaign is checked against reference aerodynamic behaviour. The prediction is therefore conditional on both layers: the surrogate can reproduce its CFD dataset and the CFD must remain credible for the sampled regime.

CamberLab is a research preview. Its uncertainty estimate does not remove CFD model-form error, sparse regimes remain less reliable, and extrapolation warnings do not make extrapolated values valid. The current geometry family and mostly steady aerodynamic outputs also limit the physics represented.

## Research questions this work motivates

Future extensions include active learning that selects the next informative CFD case, multi-fidelity datasets, physics-aware constraints on surrogate behaviour, more complex geometries, and unsteady-flow prediction. These capabilities have not been presented as completed features.

`validated CFD dataset → surrogate comparison → uncertainty awareness → trustworthy accelerated prediction`
