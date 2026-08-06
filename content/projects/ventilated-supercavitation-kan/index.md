---
title: "Ventilated Supercavitation"
date: 2026-08-06
summary: "A three-phase CFD study of how injected air forms a ventilated cavity around an underwater projectile and changes its drag."
tags:
  - cfd
  - multiphase-flow
  - cavitation
  - hydrodynamics
tech_stack:
  - ANSYS Fluent 2020 R1
  - Volume of Fluid
  - RANS
  - CutCell Meshing
featured: true
highlights:
  - "Unsteady compressible three-phase simulation"
  - "Time-resolved cavity formation and shedding"
  - "Ventilated and non-ventilated drag comparison"
  - "Validation against experimental and published numerical data"
links:
  - type: code
    url: https://github.com/saifrehman945/VentilatedSupercavitation
    label: Code
---

Moving quickly underwater means fighting a dense fluid across the vehicles entire wetted surface. Ventilated supercavitation proposes a striking alternative: inject air near the nose, grow a cavity around the body, and replace much of that water contact with gas.

This project asks whether that protective envelope can form, remain useful, and reduce drag and whether the CFD can reproduce the pressure behavior seen in published work.

## Watching the Cavity Grow

![Four stages showing ventilated air and vapor forming around the projectile](media/cavity-evolution.png)

<video controls autoplay muted loop playsinline width="100%">
  <source src="media/cavity-evolution.mp4" type="video/mp4">
</video>

The simulation follows an unsteady, compressible, three-phase flow using a Volume-of-Fluid formulation with RANS turbulence. Air enters through a 1 mm ventilation slot near the projectile nose. The visual sequence captures the first cavitation bubbles, the expanding air envelope, cavity shedding, and the developed flow by 0.2 seconds.

## Seeing the Drag Mechanism

![Ventilated and non-ventilated projectile flows with their reported drag coefficients](media/ventilated-vs-nonventilated.png)

<video controls autoplay muted loop playsinline width="100%">
  <source src="media/ventilated-vs-nonventilated.mp4" type="video/mp4">
</video>

The side-by-side result makes the mechanism tangible. Without ventilation, water remains in contact with the body. With ventilation, the cavity surrounds much of the projectile. The reported drag coefficient changes from **0.02759** without ventilation to **0.01669** with ventilation, connecting the evolving flow structure to the engineering objective.

## Resolving the Flow Where It Matters

![CutCell mesh refined around the underwater projectile and its wake](media/computational-mesh.png)

The 0.59-million-cell CutCell mesh concentrates resolution around the nose, body, ventilation region, and wake while coarsening toward the domain boundaries. A target y+ of 50 supports the wall-function treatment used in the turbulent simulation.
