---
# Leave the homepage title empty to use the site title
title: ''
summary: ''
date: 2026-01-05
type: landing

sections:
  # Developer Hero - Gradient background with name, role, social, and CTAs
  - block: dev-hero
    id: hero
    content:
      username: me
      greeting: "Hi, I'm"
      show_status: true
      show_scroll_indicator: true
      scroll_target: "#projects"
      typewriter:
        enable: true
        prefix: "I work on"
        strings:
          - "External Aerodynamics"
          - "Design Optimization"
          - "Process Automation"
        type_speed: 70
        delete_speed: 40
        pause_time: 2500
      cta_buttons:
        - text: View My Work
          url: "#projects"
          icon: arrow-down
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

  # Filterable Portfolio - Alpine.js powered project filtering
  - block: portfolio
    id: projects
    content:
      title: "Featured Projects"
      count: 4
      filters:
        folders:
          - projects
      buttons:
        - name: All
          tag: '*'
      default_button_index: 0
      archive:
        enable: true
        text: "View All Projects"
    design:
      columns: 2
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Visual Tech Stack - Icons organized by category
  - block: tech-stack
    id: skills
    content:
      title: "Tech Stack"
      subtitle: "Tools and methods I use for simulation, optimization, and AI"
      categories:
        - name: CFD & Simulation
          items:
            - name: ANSYS Fluent
              icon: devicon/ansys
            - name: OpenFOAM
              icon: custom/openfoam
            - name: STAR-CCM+
              icon: custom/starccm
        - name: FEA & Structural
          items:
            - name: Abaqus
              icon: custom/abaqus
            - name: LS-DYNA
              icon: custom/ls-dyna
            - name: OptiStruct
              icon: custom/optistruct
            - name: KratosMultiphysics
              icon: custom/kratos
        - name: AI & ML
          items:
            - name: Python
              icon: devicon/python
            - name: NumPy
              icon: devicon/numpy
            - name: Pandas
              icon: devicon/pandas
            - name: PyTorch
              icon: devicon/pytorch
            - name: Jupyter
              icon: devicon/jupyter
        - name: Programming
          items:
            - name: C++
              icon: devicon/cplusplus
            - name: CMake
              icon: devicon/cmake
            - name: Bash
              icon: devicon/bash
            - name: Git
              icon: devicon/git
        - name: HPC & Computing
          items:
            - name: Linux
              icon: devicon/linux
            - name: HPC Clusters
              icon: hero/server-stack
            - name: Solver APIs
              icon: hero/wrench-screwdriver
    design:
      style: grid
      show_levels: false
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Interactive career journey
  - block: site-map
    id: career-journey
    content:
      title: "Career Journey"
      subtitle: "Navigate the professional and academic milestones behind the portfolio."
      items:
        - label: Work Experiences
          description: Engineering and research roles.
          detail: My professional work includes simulation automation, HPC execution pipelines, solver coupling, hybrid C++/Python architecture, and multiphase CFD research.
          meta: SOCO Engineers + NUST SMME
          url: "#experience"
          cta: View Experience
          icon: hero/briefcase
        - label: Education
          description: Mechanical engineering background.
          detail: B.S. Mechanical Engineering from SMME, NUST, with coursework in computational fluid mechanics, finite element analysis, numerical methods, and heat transfer.
          meta: B.S. Mechanical Engineering, SMME NUST
          url: "#experience"
          cta: View Education
          icon: hero/academic-cap
        - label: Publications
          description: Peer-reviewed and in-review research.
          detail: Open the publications page for research outputs related to CFD, KAN-based surrogate modeling, cavitation, and heat-transfer applications.
          meta: Dedicated publications page
          url: "/publications/"
          cta: View Publications
          icon: hero/book-open
        - label: Certifications
          description: Training credentials and issuing organizations.
          detail: Certificates include neural networks and deep learning, ANSYS training, OpenFOAM workshop training, and CFD training at SMME NUST.
          meta: AI, CFD, ANSYS, OpenFOAM
          url: "#certifications"
          cta: View Certifications
          icon: hero/shield-check
    design:
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["3rem", "0", "3rem", "0"]

  # Experience & Education Timeline (pulled from author profile)
  - block: resume-experience
    id: experience
    content:
      title: Experience
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

  # Certifications
  - block: resume-awards
    id: certifications
    content:
      title: Certifications
      username: me
    design:
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Languages
  - block: resume-languages
    id: languages
    content:
      title: Languages
      username: me
    design:
      background:
        color:
          light: "#f5f5f5"
          dark: "#08080c"
      spacing:
        padding: ["2rem", "0", "4rem", "0"]

  # Recent Blog Posts
  - block: collection
    id: blog
    content:
      title: Recent Posts
      subtitle: 'Notes on CFD, optimization, and physics-AI'
      text: ''
      filters:
        folders:
          - blog
        exclude_featured: false
      count: 3
      order: desc
    design:
      view: card
      columns: 3
      background:
        color:
          light: "#ffffff"
          dark: "#0d0d12"
      spacing:
        padding: ["4rem", "0", "4rem", "0"]

  # Contact
  - block: contact-info
    id: contact
    content:
      title: Contact
      subtitle: "For collaboration, or simulation engineering inquiries."
      username: me
      connect_title: "Contact"
      text: "The fastest way to reach me is by email. You can also find my technical work and research profiles below."
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
