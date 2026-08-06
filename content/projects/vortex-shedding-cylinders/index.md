---
title: "Vortex Shedding"
date: 2026-08-06
summary: "An unsteady RANS study of vortex shedding, oscillating forces, and surface pressure around an underwater circular cylinder."
tags:
  - cfd
  - vortex-shedding
  - fluid-structure-interaction
  - hydrodynamics
tech_stack:
  - ANSYS Fluent 2020 R1
  - RANS
  - SST Turbulence Model
  - Transient CFD
featured: true
highlights:
  - "Time-resolved von Karman vortex street"
  - "Lift and drag histories through wake development"
  - "Pressure-coefficient validation against experimental data"
  - "High-Reynolds-number underwater cylinder study"
links:
  - type: code
    url: https://github.com/saifrehman945/FluentVortexShedding
    label: Code
---

A circular cylinder looks simple until water begins to move around it. At a Reynolds number of **10,000**, the separated shear layers do not remain symmetric. They roll into alternating vortices, creating a wake that repeatedly pushes the cylinder from side to side - the foundation of vortex-induced vibration.

This project follows that instability from startup to a developed shedding cycle, then connects the flow pattern to the forces and surface pressures an underwater structure must withstand.

## A Wake Becomes Periodic

![Velocity contours at 50, 100, 200, and 450 seconds showing the wake developing behind the cylinder](media/velocity-timestamps.png)

<video controls autoplay muted loop playsinline width="100%">
  <source src="media/velocity-vortex-shedding.mp4" type="video/mp4">
</video>

The early wake is almost symmetric. As the transient RANS solution advances, disturbances amplify, the shear layers roll up, and vortices detach alternately from the upper and lower surfaces. Velocity and vorticity animations reveal the same event from two perspectives: the changing momentum deficit and the rotating structures that organize it into a von Karman street.

## The Flow Leaves a Force Signature

![Lift coefficient growing from small disturbances into a sustained periodic oscillation](media/lift-coefficient.png)

The lift history records the symmetry breaking directly. Small early oscillations grow until the wake reaches a stable limit cycle, after which the alternating vortices produce a nearly constant-amplitude transverse load. This repeating force is what can drive structural vibration when its frequency approaches a natural frequency.

![Drag coefficient settling toward a mean value with smaller periodic fluctuations](media/drag-coefficient.png)

Drag tells a complementary story. After its startup transient, the coefficient approaches a mean near 0.95 with a smaller oscillation superimposed. Lift changes sign with each shed vortex; drag remains positive and fluctuates around its developed mean.

## Checking the Surface Physics

![Computed cylinder pressure coefficient compared with published experimental measurements](media/pressure-coefficient.png)

The final figure compares the simulated pressure coefficient around the cylinder with experimental measurements. The SST turbulence model reproduces the broad pressure fall from the stagnation region, the suction minimum around the side of the cylinder, and the pressure behavior across the separated rear surface. Differences remain, but the comparison makes the model's accuracy visible rather than relying on wake imagery alone.

Together, the results connect cause to consequence:

`Boundary-layer separation -> Alternating vortices -> Oscillating lift and drag -> Vibration risk`
