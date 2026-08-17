---
title: "AeroForge"
date: 2026-08-06
weight: 50
summary: "Scientific infrastructure for reproducible aerodynamic studies: parameterized geometry, controlled meshing, quality checks, solver monitoring, and repeatable OpenFOAM campaigns."
tags: [cfd, aerodynamics, openfoam, reproducibility, scientific-computing]
tech_stack: [Python, OpenFOAM, Gmsh, PyQt]
featured: true
highlights:
  - "Traceable geometry-to-force CFD pipeline"
  - "Mesh-quality and near-wall evidence before execution"
  - "Standardized convergence and force extraction"
  - "Latin Hypercube Sampling for repeatable campaigns"
links:
  - type: code
    url: https://github.com/saifrehman945/AeroForge
    label: Code
---

## Objective

AeroForge was built to preserve consistent geometry construction, meshing decisions, boundary conditions, convergence checks, and force extraction across aerodynamic parameter studies.

AeroForge is scientific infrastructure for controlled aerodynamic experimentation. The PyQt desktop interface is an implementation mechanism; the central contribution is the reproducible pipeline behind it:

`parameterized geometry → controlled meshing → quality and near-wall checks → solver execution → convergence monitoring → force extraction → repeatable CFD campaign`

## Parameterized geometry and controlled meshing

![Parameterized NACA geometry with angle-of-attack and surface-resolution controls](image_1.png "Geometry variables are made explicit before simulation so each generated case can be reproduced from its recorded inputs.")

NACA four-digit geometry is generated from thickness, camber, camber position, angle of attack, and surface resolution. Gmsh then constructs the solver mesh under common meshing rules. Cell count, non-orthogonality, skewness, aspect ratio, first-cell height, layer count, and growth are exposed as evidence about the numerical model rather than hidden behind a “mesh complete” status.

![Structured airfoil mesh accompanied by quality and near-wall checks](image_2.png "The quality gates make meshing assumptions comparable across cases and help prevent an invalid mesh from quietly entering the dataset.")

## Solver consistency and convergence evidence

![OpenFOAM setup with residual and force monitoring](image_3.png "Residual and aerodynamic-force histories are observed together so a case is assessed from convergence evidence rather than process completion alone.")

OpenFOAM case templates standardize boundary conditions and numerical settings while retaining expert controls. Residual and force histories are monitored during execution, and lift and drag are extracted in a consistent form for downstream comparison. This makes failed, unconverged, and numerically inconsistent cases easier to identify before their outputs contaminate a study.

## From one case to a reproducible campaign

![Latin Hypercube Sampling over airfoil and operating variables](image_4.png "Systematic sampling turns the controlled single-case pipeline into a traceable CFD campaign suitable for parameter studies or surrogate-data generation.")

Cases can be specified directly or sampled using Latin Hypercube Sampling across Reynolds number, angle of attack, thickness, and camber variables. Controlled parallel execution applies the same preprocessing, solver, and post-processing sequence to each design.

Automation matters scientifically because it reduces unintended differences between cases, records the assumptions used to create them, standardizes acceptance checks, and makes large simulation datasets repeatable. AeroForge does not make an OpenFOAM result valid by itself; it makes the steps needed to assess and reproduce that result more consistent.

## Limitations

The current pipeline is centered on NACA four-digit sections and the implemented OpenFOAM templates. Mesh and convergence checks are necessary but not sufficient for physical validation, which still requires appropriate benchmark data and model-form assessment for each flow regime.
