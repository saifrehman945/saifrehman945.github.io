# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About This Project

Personal portfolio site for Saif ur Rehman, built on the [modern-resume-theme](https://github.com/sproogen/modern-resume-theme) (v2.0.10). The site is deployed at https://saifrehman945.github.io/ via GitHub Pages.

All portfolio content (work experience, publications, education, projects, etc.) lives exclusively in `_config.yml`. No separate data files are needed — the theme's version 2 architecture reads everything inline from the config.

## Build & Development

**Serve locally with live-reload:**
```bash
bundle exec jekyll serve --livereload
```

**Serve via Docker (port 4000):**
```bash
docker-compose up
```

**Validate HTML output:**
```bash
bundle exec htmlproofer ./_site
```

Dependencies are declared in `modern-resume-theme.gemspec`; run `bundle install` to set up.

## Architecture

### Content Flow

All content flows from `_config.yml` → Liquid templates → static HTML:

```
_config.yml (site.content array)
    ↓
_layouts/default.html  (loops over site.content)
    ├── _includes/head.html
    ├── _includes/header.html     (name, title, social icons)
    ├── _includes/about.html      (profile image + bio)
    ├── _includes/section-list.html  (for layout: list sections)
    ├── _includes/section-text.html  (for layout: text sections)
    └── _includes/footer.html
```

### Adding or Editing Content

Everything is in `_config.yml` under the `content:` key. Each section has a `layout` (`list` or `text`) and a `content` array. List items support these sub-layouts: `left`, `right`, `top`, `top-middle`, `top-right`.

Current sections (in order): Work Experience → Publications → Education → Projects → Extra-Curricular Activities → Volunteering → Languages.

**List item fields:**
- `layout` — sub-layout for the item
- `title`, `sub_title`, `caption` — heading fields
- `link`, `link_text` — optional URL
- `additional_links` — array of `{title, icon, url}` for badge links
- `quote` — short italic callout
- `description` — full Markdown body (supports HTML tables, inline images)

### Styling

SCSS lives in `_sass/`, compiled via Jekyll's built-in SASS. Key files:
- `modern-resume-theme.scss` — master import and layout rules
- `dark.scss` — dark mode overrides (activated by `body.dark` class)
- `base.scss` — Bootstrap 3 grid, reset, print stylesheet

Dark mode is controlled by `darkmode: true` in `_config.yml`. When `true`, the body always renders dark. When absent/`false`, JS in `assets/js/index.js` detects `prefers-color-scheme: dark` and applies the `.dark` class.

### Social Links & Icons

Configured in `_config.yml` under named keys (`github_username`, `linkedin_username`, etc.) and `additional_links`. Icons are FontAwesome 5 classes. The `_includes/header.html` iterates a hardcoded list of platform keys to render icon buttons — adding a new platform requires adding both the config key and an entry in that include.

## Installing Packages
Use Micromamba environment optimization if not exists create one. DONOT install in system / base environment

## GitHub Pages Deployment

Pushing to `main` deploys automatically. The `_config.yml` sets `repository: saifrehman945/saifrehman945.github.io`. Files excluded from the build are listed under `exclude:` in `_config.yml` (Gemfile, docker files, scripts/, lib/, etc.).
