---
title: "Finite Element Analysis of Zirconia Dental Prosthesis"
date: 2023-05-01
weight: 80
summary: "Structural FEA of a three-unit zirconia dental prosthesis examining how cement stiffness and thickness alter stress transfer through the prosthesis, cement layer, and supporting bone."
tags: [fea, computational-mechanics, biomedical]
tech_stack:
  - ANSYS
  - Finite Element Analysis
  - Structural Mechanics
featured: false
highlights:
  - "Three-unit zirconia fixed dental prosthesis"
  - "Cement-layer thickness and elastic-modulus comparison"
  - "Resin and glass-ionomer cement cases"
  - "Stress transfer through prosthesis, cement, and bone"
---

## Problem and computational model

The structural performance of a three-unit zirconia fixed dental prosthesis depends not only on the ceramic structure but also on how its cement layer transfers load to the supporting region. This project used finite element analysis to compare how **cement-layer thickness** and **Young's modulus** affect the stress distribution through the prosthesis, cement, and supporting bone under distributed physiological loading.

![Finite-element geometry of the three-unit dental prosthesis and supporting region](dental_geometry.png "The model separates the zirconia prosthesis, cement layer, and supporting geometry so their load-transfer behaviour can be examined independently.")

## Comparative structural analysis

The computational study compared resin and glass-ionomer cement properties and varied the cement-layer configuration. Stress fields were evaluated across the zirconia crown, cement layer, interfaces, and supporting bone to identify how changes in stiffness and thickness redistribute structural demand.

![Computed stress distribution in the zirconia prosthesis](stress_distribution_cap.png "The result illustrates where the structural model concentrates stress under the applied loading and supports comparison between cement configurations.")

The calculations indicated that cement stiffness and thickness can materially change stress concentration and load transfer. The project therefore demonstrates a computational-mechanics application in which material selection and a thin geometric layer influence the response of the larger assembly.

## Scope and limitations

The repository does not contain a mesh-convergence record, experimental correlation, or enough model metadata to state a quantitative validation error. The result is presented as a comparative FEA investigation rather than a clinically predictive model. Stronger public documentation would require mesh-independence evidence, explicit material assumptions, boundary-condition details, and comparison with experimental or published structural data.
