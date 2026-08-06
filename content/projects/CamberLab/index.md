---
title: "CamberLab"
date: 2026-08-06
summary: "A flow-physics-aware CFD surrogate that predicts NACA airfoil performance in milliseconds while exposing uncertainty and extrapolation."
tags:
  - cfd
  - machine-learning
  - aerodynamics
  - surrogate-modeling
tech_stack:
  - Python
  - Streamlit
  - OpenFOAM 12
  - scikit-learn
  - Gmsh
featured: true
highlights:
  - "Millisecond predictions for lift, drag, and aerodynamic efficiency"
  - "Flow-regime-aware OpenFOAM pipeline"
  - "Gaussian Process uncertainty and explicit extrapolation warnings"
  - "Reference validation and reproducible DOE splits"
links:
  - type: code
    url: https://github.com/saifrehman945/CamberLab
    label: Code
  - type: site
    url: https://camberlab.streamlit.app/
    label: Live Demo
---

It began with a basic trade-off. OpenFOAM can reveal how an airfoil behaves, but a single RANS simulation may take minutes or hours. A surrogate model can answer in milliseconds, yet speed becomes dangerous when the model quietly predicts beyond the CFD evidence that trained it.

I built CamberLab around a stricter idea: **a fast prediction should also explain how far it can be trusted**.

## One Dashboard, Two Layers of Evidence

![CamberLab dashboard showing a NACA airfoil, lift and drag sweeps, uncertainty bands, and nearby CFD samples](camberlab-dashboard.png)

The dashboard turns an aerodynamic question into an interactive study. The engineer selects airfoil thickness, Reynolds number, an angle-of-attack sweep, and a surrogate family. CamberLab responds with lift, drag, lift-to-drag ratio, and a drag polar, while the airfoil preview keeps the geometry visible.

The curves are only the first layer. Confidence bands show predictive uncertainty, orange markers reveal nearby CFD training cases, and warnings identify sweep points outside the trained envelope. Instead of smoothing over missing knowledge, the interface makes it part of the result.

## Different Flow, Different Physics

The central problem is that one CFD recipe cannot represent the entire design space. Attached turbulent flow, near-stall separation, transitional low-Reynolds flow, and high-Reynolds attached flow require different turbulence models, mesh densities, wall treatments, and target y+ values.

CamberLab therefore classifies each design into a flow regime before simulation. Dedicated OpenFOAM templates generate the evidence for that regime, and the regime label becomes an explicit surrogate input rather than an assumption hidden inside the dataset.

## From Expensive Simulations to Reusable Models

Latin Hypercube Sampling defines the CFD campaign. Python generates NACA geometry, Gmsh builds regime-specific structured meshes, and OpenFOAM runs the cases in parallel. Results pass convergence and reference-validation gates before entering the training dataset.

Four model families—Gaussian Process, Random Forest, MLP, and Kriging—learn lift and drag from the harvested cases. Frozen train/test indices and fixed random seeds keep comparisons reproducible. The deployed Streamlit app reads only the resulting model artifacts, so prediction does not require OpenFOAM.

CamberLab remains a research preview and says so plainly: unsupported camber falls back to a symmetric airfoil, stall predictions are flagged as extrapolation, and incomplete regimes receive lower confidence. That honesty is the project’s defining feature.

`Flow classification → Validated CFD → Surrogate training → Uncertainty-aware prediction`
