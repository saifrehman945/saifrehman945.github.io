---
title: "AeroForge"
date: 2026-08-06
weight: 100
summary: "A PyQt desktop workflow that turns NACA airfoil inputs into meshed, solved, and repeatable OpenFOAM studies."
tags:
  - cfd
  - aerodynamics
  - openfoam
  - simulation-automation
tech_stack:
  - Python
  - PyQt
  - OpenFOAM
  - Gmsh
featured: true
highlights:
  - "Guided geometry-to-results CFD workflow"
  - "Automated airfoil meshing with visible quality checks"
  - "Live solver monitoring with expert controls"
  - "Latin Hypercube Sampling for batch studies"
links:
  - type: code
    url: https://github.com/saifrehman945/AeroForge
    label: Code
---

AeroForge began with a familiar CFD problem: evaluating one airfoil requires far more than choosing its shape. Geometry must be generated correctly, flow conditions translated into solver settings, a boundary-layer mesh built and checked, and every OpenFOAM case kept consistent. Repeating that process across several designs turns engineering work into file management.

I built AeroForge to make that journey visible and repeatable. After first exploring a browser-based interface with NiceGUI, I migrated the application to **PyQt**, creating a focused desktop workspace for local simulation work.

## Start with the Airfoil

![AeroForge geometry workspace previewing a NACA 0012 airfoil at four degrees angle of attack](image_1.png)

The workflow opens with the design itself. Thickness, camber, camber position, angle of attack, and surface resolution define a NACA four-digit section. The preview updates the geometry before any expensive computation begins, exposing mistakes while they are still easy to fix.

## Make the Mesh Defensible

![AeroForge mesh workspace showing the structured airfoil grid and mesh-quality gates](image_2.png)

Next, AeroForge builds the solver-ready case and brings mesh decisions into the interface. Boundary-layer growth, layer count, wall treatment, and surface sampling remain adjustable, while cell count, non-orthogonality, skewness, aspect ratio, and first-cell height are reported beside the mesh. The engineer sees not only that a mesh exists, but whether it is credible enough to run.

## Run Without Hiding the Physics

![AeroForge solver workspace with OpenFOAM controls and convergence plots](image_3.png)

The solver stage keeps OpenFOAM accessible. Recommended defaults provide a safe starting point, while advanced controls expose iteration limits, correction schemes, relaxation factors, and parallel processes. Residual and force histories are monitored in the same workspace, so convergence becomes part of the decision rather than a terminal window left in the background.

## Turn One Case into a Study

![AeroForge batch workspace generating airfoil cases with Latin Hypercube Sampling](image_4.png)

The final step changes the scale of the problem. Cases can be added manually or generated with **Latin Hypercube Sampling** across Reynolds number, angle of attack, thickness, and camber variables. AeroForge queues, builds, and runs them with controlled parallelism, turning the same traceable workflow into a small aerodynamic design campaign.

The result is not a wrapper that conceals CFD. It is a guided path through it:

`Airfoil definition → Flow setup → Mesh evidence → Solver convergence → Design study`
