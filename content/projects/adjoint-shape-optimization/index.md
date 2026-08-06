---
title: "Adjoint-Based Shape Optimization Framework"
date: 2024-01-01
summary: "Large-scale adjoint-driven shape optimization spanning fluid, structural, and multi-physics problems."
tags:
  - optimization
  - cfd
  - fea
  - hpc
tech_stack:
  - C++
  - Python
  - Vertex Morphing
  - Adjoint Methods
featured: true
highlights:
  - "Vertex morphing for smooth, mesh-consistent geometry updates"
  - "Hybrid C++ + Python architecture for performance + flexibility"
  - "Integrated with Abaqus, OptiStruct, KratosMultiphysics, Star-CCM+"
---

Contributed to a large-scale **adjoint-driven shape optimization** framework spanning fluid, structural, and multi-physics applications. Combines **C++ optimization kernels** (mapping, search, linear algebra) with a **Python orchestration layer** for workflow management, solver coupling, and rapid prototyping.

Core optimization problem:

$$\min_{\mathbf{s}}\; J\big(\mathbf{X}_{\Gamma}(\mathbf{s}), \mathbf{Q}(\mathbf{X}_{\Gamma})\big)$$

$$\text{subject to } \mathbf{r}\big(\mathbf{X}_{\Gamma}(\mathbf{s}), \mathbf{Q}(\mathbf{X}_{\Gamma})\big) = 0$$

where $\mathbf{s}$ are design variables, $\mathbf{X}_{\Gamma}$ the surface geometry, and $\mathbf{Q}$ the state variables.

- **Vertex morphing** ensures smooth, mesh-consistent updates.
- **Adjoint gradients** enable scalable high-dimensional optimization.
- **Hybrid C++ + Python** architecture for performance + flexibility.
- Integrated with Abaqus, OptiStruct, KratosMultiphysics, Star-CCM+.

## The Framework design

![The design](design.png)