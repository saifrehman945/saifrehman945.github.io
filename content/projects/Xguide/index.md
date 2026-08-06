---
title: "XGuide"
date: 2026-08-06
weight: 90
summary: "A drag-and-drop CAE workflow for DOE, design optimization, multi-objective optimization, and Monte Carlo studies."
tags:
  - cae
  - doe
  - optimization
  - process-automation
tech_stack:
  - Python
  - pyDOE
  - FEM/CAE Integration
featured: true
highlights:
  - "DOE, optimization, MOO, and Monte Carlo in one environment"
  - "Visual drag-and-drop process creation"
  - "Automated simulation execution and response extraction"
  - "Integrated statistical and Pareto post-processing"
---

XGuide is a process-automation platform for simulation-driven engineering. It replaces disconnected scripts and repetitive CAE tasks with a visual workflow: the engineer connects reusable plugins, selects a study method, and runs the complete process automatically.

## Building the Engineering Process

![XGuide Discover workspace showing a connected CAE workflow](image.png)

The image shows the **Discover** workspace, where the engineering process is assembled.

The story begins at `InputArray1`, which supplies the design candidates. These may be DOE combinations, designs proposed by an optimizer, or random samples used in a Monte Carlo study. The `Inputfile` plugin converts each candidate into a solver-ready model.

The workflow then branches into two analyses:

- `Static_Simulation` evaluates structural responses.
- `Dynamic_Simulation` evaluates time-dependent or modal behavior.

Their output files are collected automatically. Response plugins then extract Stresses, Displacement, Mass, and First_Mode. Additional nodes reduce the raw results into engineering quantities such as Max_Stress and Max_Displacement. Finally, these responses enter the Cost node, where they become objectives or constraints.

This graph makes the complete calculation traceable:

`Inputs -> CAE models -> Simulations -> Responses -> Decision metric`

Because every operation is a plugin, the same process can be extended with CFD, thermal, fatigue, acoustics, manufacturing, or custom Python components.

## One Workflow, Four Types of Study

The toolbar above the graph allows the engineer to apply different computational methods to the same process.

### DOE and Taguchi

DOE selects informative combinations of design variables so that their effects can be understood with fewer simulations. XGuide uses **pyDOE** to generate experimental designs and sampling plans. Taguchi methods provide an additional structured approach for studying factor levels and robustness against noise.

### Design Optimization

The optimizer proposes a design, executes the connected CAE process, reads the responses, and proposes an improved design. The loop continues until convergence or until the available simulation budget is reached.

### Multi-Objective Optimization

When objectives conflict—such as minimizing mass and cost while limiting stress and displacement—the platform retains multiple responses and searches for non-dominated solutions. The result is a **Pareto front** showing the best available engineering trade-offs.

### Monte Carlo Analysis

Monte Carlo methods propagate uncertain inputs, such as material scatter, manufacturing tolerances, loads, or friction, through the same simulation process. The resulting distributions reveal performance variability and the probability of violating a requirement.

## Turning Runs into Engineering Evidence

![XGuide Post workspace showing analysis and visualization options](image_2.png)

The second image shows the **Post** workspace. Once the automated runs are complete, the engineer can move directly from raw results to interpretation.

The available tools include:

- tables for input and response data;
- scatter and correlation plots for relationships between variables;
- distributions for Monte Carlo results;
- effects plots for DOE studies;
- diagnostics for checking model and result quality; and
- response-surface and Pareto views for optimization studies.

Together, the two workspaces tell the complete product story. **Discover** defines and executes the engineering process; **Post** explains what the results mean.

XGuide therefore connects the full simulation-driven design cycle in one reusable workflow:

`DOE -> CAE Automation -> Optimization -> Uncertainty -> Engineering Decision`
