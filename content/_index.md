---
title: ''
summary: 'Computational fluid dynamics research in turbulent and multiphase flow, scientific machine learning, and simulation-driven optimization.'
date: 2026-01-05
type: landing

sections:
  - block: dev-hero
    id: hero
    content:
      username: me
      greeting: "COMPUTATIONAL FLUID DYNAMICS · RESEARCH PORTFOLIO"
      show_status: false
      show_scroll_indicator: true
      scroll_target: "#research-focus"
      cta_buttons:
        - text: Research Projects
          url: "#selected-research"
          icon: arrow-down
        - text: Publications
          url: "/publications/"
          icon: book-open
        - text: Research CV
          url: "/uploads/saif-ur-rehman-cv.pdf"
          icon: document-arrow-down
    design:
      style: centered
      avatar_shape: circle
      animations: false
      background:
        color:
          light: "#fafafa"
          dark: "#0a0a0f"
      spacing:
        padding: ["6rem", "0", "4rem", "0"]

  - block: research-grid
    id: research-focus
    content:
      eyebrow: Research focus
      title: "Flow physics, predictive models, and computational design"
      subtitle: "My research foundation is CFD. I extend it with data-driven modelling, optimization, and reproducible scientific computing where those methods help answer a physical or numerical question."
      items:
        - title: Turbulent & Unsteady Flows
          text: "Wake dynamics, vortex shedding, separated flows, near-wall behaviour, transient forces, pressure fluctuations, and spectral analysis."
          meta: Fluid dynamics
        - title: Multiphase & Cavitating Flows
          text: "VOF-based multiphase modelling, ventilated cavitation, cavity dynamics, gas-liquid interfaces, underwater hydrodynamics, and drag."
          meta: Multiphase CFD
        - title: Data-Driven Fluid Mechanics
          text: "CFD surrogate modelling, time-series prediction, uncertainty and extrapolation awareness, and accelerated physics-based prediction."
          meta: Scientific ML
        - title: Simulation-Driven Design
          text: "Adjoint sensitivities, shape optimization, geometry parameterisation, multi-solver workflows, and numerical verification."
          meta: Computational methods
    design:
      variant: cards
      columns: 4

  - block: research-grid
    id: research-questions
    content:
      eyebrow: Doctoral direction
      title: "Questions I want to pursue"
      subtitle: "These are future research interests arising from completed work, not claims of methods already mastered."
      items:
        - title: Unsteady flow physics
          text: "How can coherent structures, vortex shedding, and pressure fluctuations be predicted and interpreted more accurately across turbulent flow regimes?"
        - title: Multiphase and cavitation physics
          text: "How do cavity dynamics, turbulent structures, and vortex-interface interactions determine unsteady hydrodynamic loads and flow stability?"
        - title: Physics-aware reduced modelling
          text: "How much governing flow physics can an accelerated predictive model preserve, and how can it signal when a prediction is no longer trustworthy?"
    design:
      variant: questions
      columns: 3

  - block: portfolio
    id: selected-research
    content:
      title: "Selected Research"
      subtitle: "Validated investigations and computational-method work, ordered by the research trajectory they establish."
      count: 4
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
      columns: 2
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
      subtitle: "Peer-reviewed and under-review outputs, with the research problem, evidence, principal finding, and my contribution stated separately."
      folders: [publications]
      limit: 2
      archive_url: /publications/
      archive_text: View publication details
    design:
      columns: 1

  - block: research-grid
    id: trajectory
    content:
      eyebrow: Research trajectory
      title: "A progression from flow physics to computational research methods"
      items:
        - meta: Academic CFD research
          title: Turbulent, unsteady, and multiphase flows
          text: "Vortex shedding and transient loads led into ventilated supercavitation and cavity dynamics."
        - meta: Data-driven extension
          title: Simulation evidence as predictive data
          text: "CFD time-series informed KAN drag prediction; systematic CFD campaigns informed uncertainty-aware surrogate modelling."
        - meta: Industrial computational methods
          title: Adjoints, solver integration, and verification
          text: "Production-scale work developed depth in sensitivities, parameterisation, optimization, HPC execution, and numerical comparison."
        - meta: Doctoral direction
          title: Deeper computational fluid mechanics
          text: "Turbulent and multiphase CFD, data-driven fluid mechanics, reduced modelling, and simulation-driven design."
    design:
      variant: trajectory
      columns: 4

  - block: research-grid
    id: computational-methods
    content:
      eyebrow: Computational methods
      title: "Methods and infrastructure supporting the research"
      subtitle: "Software is listed here as implementation context; validation evidence and physical interpretation remain the primary outputs."
      items:
        - title: Fluid mechanics
          text: "OpenFOAM · ANSYS Fluent · STAR-CCM+ · RANS · URANS · VOF · turbulence modelling · spectral analysis"
        - title: Scientific computing
          text: "Python · C++ · NumPy · SciPy · scikit-learn · Bash"
        - title: HPC & reproducibility
          text: "Linux · OpenMPI · GNU Parallel · automated batch CFD campaigns · convergence monitoring"
        - title: Mechanics & optimization
          text: "Abaqus · OptiStruct · LS-DYNA · adjoint sensitivities · FEA · shape optimization"
        - title: Geometry & meshing
          text: "Gmsh · ANSA · ICEM-CFD · automated meshing · geometry processing · mesh-quality checks"
    design:
      variant: methods
      columns: 3

  - block: research-grid
    id: industrial-research
    content:
      eyebrow: Industrial computational research experience
      title: "Numerical infrastructure around simulation"
      subtitle: "After academic CFD research, I moved into production-scale computational engineering. This work developed the less visible skills required to make simulations comparable, repeatable, and useful across solvers and computing environments."
      items:
        - title: Adjoint and sensitivity methods
          text: "Core contributions to a node-based adjoint-driven shape-optimization framework, including response and sensitivity handling, parameterisation, vertex morphing, and geometry updates."
        - title: Multi-solver scientific computing
          text: "Python orchestration and performance-critical C++ components connecting structural and CFD solvers through repeatable computational processes."
        - title: Numerical verification
          text: "Investigations of normal formulations, tolerance selection, floating-point reproducibility, solver-version differences, and whether sensitivity fields are mathematically comparable."
          url: /projects/adjoint-shape-optimization/
          link_text: Read the sanitized method case study
    design:
      variant: experience
      columns: 3

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
      subtitle: "Research conversations and computational-science collaborations are welcome."
      username: me
      connect_title: "Get in touch"
      text: "I am interested in doctoral research opportunities in computational fluid mechanics and computational engineering. Email is the most direct way to reach me; my code and research profiles are linked below."
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
