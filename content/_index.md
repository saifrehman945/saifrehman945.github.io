---
title: ''
summary: 'Computational engineering and research across numerical simulation, optimization, scientific computing, computational mechanics, and data-driven modelling.'
date: 2026-01-05
type: landing

sections:
  - block: dev-hero
    id: hero
    content:
      username: me
      greeting: "Hi, I'm"
      show_status: true
      show_scroll_indicator: true
      scroll_target: "#computational-domains"
      typewriter:
        enable: true
        prefix: "I work on"
        strings:
          - "Physics-based simulations"
          - "Numerical method development"
          - "Simulation-driven optimization"
          - "Data-driven modelling"
          - "Computational mechanics"
          - "Scientific computing"
        type_speed: 70
        delete_speed: 40
        pause_time: 2500
      cta_buttons:
        - text: Selected Work
          url: "#selected-work"
          icon: arrow-down
        - text: Publications
          url: "/publications/"
          icon: book-open
        - text: CV
          url: "/uploads/saif-ur-rehman-cv.pdf"
          icon: document-arrow-down
    design:
      style: centered
      avatar_shape: circle
      animations: true
      background:
        color:
          light: "#fafafa"
          dark: "#0a0a0f"
      spacing:
        padding: ["6rem", "0", "4rem", "0"]

  - block: research-grid
    id: computational-domains
    content:
      # eyebrow: Research & computational domains
      title: "Research & computational domains"
      # subtitle: "My work spans academic numerical research and industrial computational engineering. These domains are connected by a common emphasis on verification, reproducibility, and interpretable numerical evidence."
      items:
        - title: Fluid Dynamics
          text: "Unsteady and turbulent CFD, vortex shedding, multiphase flow, cavitation, hydrodynamics, and thermal-fluid simulation."
          meta: Numerical simulation
        - title: Computational Mechanics
          text: "Structural FEA, static and modal responses, solver coupling, sensitivities, multiphysics, and mechanical-system simulation."
          meta: Mechanics
        - title: Optimization
          text: "Adjoint methods, node-based shape optimization, parameterisation, DOE, multi-objective optimization, and design under uncertainty."
          meta: Computational design
        - title: Scientific Computing
          text: "Python and C++, HPC execution, numerical workflows, automated simulation campaigns, verification, and reproducible computational tools."
          meta: Methods & infrastructure
        - title: Data-Driven Modelling
          text: "CFD surrogates, KAN time-series prediction, statistical and ML models, simulation-generated datasets, and uncertainty-aware prediction."
          meta: Simulation data
    design:
      variant: cards
      columns: 5

  - block: portfolio
    id: selected-work
    content:
      title: "Selected Work"
      subtitle: "Research studies, numerical-method investigations, and computational frameworks across fluid mechanics, optimization, data-driven modelling, and scientific software."
      count: 6
      sort_by: Weight
      sort_ascending: true
      filters:
        folders: [projects]
      buttons:
        - name: All
          tag: '*'
      archive:
        enable: true
        text: "View all computational projects"
    design:
      columns: 3
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  - block: research-publications
    id: publications
    content:
      title: "Publications"
      subtitle: "Formal academic outputs with the study, methodology, principal finding, publication status, and documented contribution stated separately."
      folders: [publications]
      limit: 2
      archive_url: /publications/
      archive_text: View publication details
    design:
      columns: 1

  - block: research-grid
    id: trajectory
    content:
      # eyebrow: Research & professional trajectory
      title: "From Independent simulations to integrated computational engineering"
      # subtitle: "This progression describes completed work rather than a proposed future direction."
      items:
        - meta: Academic numerical work
          title: Fluid, thermal, and structural simulation
          text: "Projects included bluff-body wake dynamics, ventilated supercavitation, thermal-fluid analysis, and finite-element modelling of a zirconia dental prosthesis."
        - meta: Simulation-to-data workflows
          title: Predictive models built from numerical evidence
          text: "CFD time-series supported KAN drag prediction, while systematic aerodynamic campaigns supported surrogate comparison and uncertainty-aware inference."
        - meta: Industrial computational engineering
          title: Optimization, mechanics, and simulation infrastructure
          text: "Production-scale work covered adjoint sensitivities, structural and CFD solver integration, geometry processing, meshing, HPC execution, and reusable scientific software."
        - meta: Cross-cutting practice
          title: Verification and reproducibility
          text: "Across these areas, the common work is establishing convergence, meaningful comparisons, defensible tolerances, and traceable computational results."
    design:
      variant: trajectory
      columns: 4

  - block: tech-stack
    id: computational-methods
    content:
      title: "Computational Methods & Tools"
      subtitle: "Software and numerical methods used across the portfolio's fluid, structural, optimization, and data-driven work."
      categories:
        - name: Fluid Simulation
          items:
            - name: ANSYS Fluent
              icon: devicon/ansys
            - name: OpenFOAM
              icon: custom/openfoam
            - name: STAR-CCM+
              icon: custom/starccm
            - name: RANS / URANS / VOF
              icon: hero/arrows-right-left
        - name: Structural & Multiphysics
          items:
            - name: Abaqus
              icon: hero/cube-transparent
            - name: OptiStruct
              icon: custom/optistruct
            - name: LS-DYNA
              icon: custom/ls-dyna
            - name: Kratos Multiphysics
              icon: custom/kratos
        - name: Optimization
          items:
            - name: Adjoint Sensitivities
              icon: hero/arrow-path
            - name: Shape Optimization
              icon: hero/arrows-pointing-out
            - name: DOE & Sampling
              icon: hero/table-cells
            - name: Multi-Objective Optimization
              icon: hero/chart-bar
        - name: Scientific & Data Computing
          items:
            - name: Python
              icon: devicon/python
            - name: C++
              icon: devicon/cplusplus
            - name: NumPy / SciPy
              icon: devicon/numpy
            - name: scikit-learn
              icon: devicon/scikitlearn
        - name: HPC & Automation
          items:
            - name: Linux
              icon: devicon/linux
            - name: OpenMPI
              icon: hero/server-stack
            - name: Bash / GNU Parallel
              icon: devicon/bash
            - name: Batch Simulation
              icon: hero/queue-list
        - name: Geometry & Meshing
          items:
            - name: Gmsh
              icon: hero/cube
            - name: ANSA
              icon: hero/wrench-screwdriver
            - name: ICEM-CFD
              icon: hero/squares-2x2
            - name: Automated Preprocessing
              icon: hero/cog-6-tooth
    design:
      style: grid
      show_levels: false
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # - block: research-grid
  #   id: computational-practice
  #   content:
  #     eyebrow: Cross-cutting computational practice
  #     subtitle: "These activities connect fluid simulation, computational mechanics, optimization, and scientific software rather than belonging to only one application area."
  #     items:
  #       - title: Numerical verification
  #         text: "Convergence assessment, experimentally derived tolerances, solver-version comparison, floating-point reproducibility, distinguishing missing outputs from valid zero responses, and identifying non-comparable numerical quantities."
  #       - title: Geometry & CAE automation
  #         text: "ANSA Python scripting, feature recognition, automated meshing, middle-surface and hole processing, RBE generation, geometry validation, and CAD-to-CAE operations."
  #       - title: Multi-solver workflows
  #         text: "Repeatable preprocessing, solver execution, response extraction, sensitivity handling, and optimization across structural, fluid, and multiphysics solvers."
  #         url: /projects/adjoint-shape-optimization/
  #         link_text: Read the sanitized optimization case study
  #   design:
  #     variant: experience
  #     columns: 3

  - block: resume-experience
    id: experience
    content:
      title: "Experience & Education"
      username: me
      date_format: Jan 2006
    design:
      columns: '1'
      background:
        color:
          light: "#f5f5f5"
          dark: "#08080c"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  - block: contact-info
    id: contact
    content:
      title: Contact
      subtitle: "For research, technical collaboration, and computational-engineering enquiries."
      username: me
      connect_title: "Get in touch"
      text: "Email is the most direct way to reach me. My code, publications, and research profiles are linked below."
      email: saifurrehman945@outlook.com
    design:
      columns: '1'
      background:
        color:
          light: "#f5f5f5"
          dark: "#08080c"
      spacing:
        padding: ["4rem", "0", "5rem", "0"]
---
