# Research / Engineering Portfolio Template

A clean, automation-friendly PowerPoint template designed for python-pptx.

## Files

- `research_portfolio_template.pptx` — the template itself, with 9 layouts and a styled slide master. Includes 9 demo slides showing each layout in use.
- `template_helpers.py` — optional helper module that makes filling placeholders robust across viewers (PowerPoint, LibreOffice, Keynote).

## Design system

| Token       | Value           | Usage                                  |
|-------------|-----------------|----------------------------------------|
| Primary     | `#0B3C5D`       | Title text, section divider background |
| Accent      | `#328CC1`       | Subtitle text, accent dots             |
| Secondary   | `#D9B310`       | Underline accents, decorative squares  |
| Background  | `#F4F6F7` / white | Slide backgrounds, card backgrounds  |
| Text        | `#1B1B1B`       | Body text                              |
| Title font  | Montserrat (fallback Calibri) | All titles               |
| Body font   | Open Sans (fallback Calibri)  | All body text            |
| Mono font   | Consolas        | Code blocks                            |

## Layouts

The template defines exactly 9 layouts. Use the `LAYOUTS` constants in `template_helpers.py` or reference by index:

| Index | Layout name       | Placeholders                                                                |
|-------|-------------------|-----------------------------------------------------------------------------|
| 0     | Title Slide       | `TITLE` (idx 0), `SUBTITLE` (idx 1), `FOOTER` (idx 10)                      |
| 1     | Section Divider   | `TITLE` (idx 0), `SUBTITLE` (idx 1)                                         |
| 2     | Content           | `TITLE` (idx 0), `BODY` (idx 1), `FOOTER` (idx 10)                          |
| 3     | Two Column        | `TITLE` (idx 0), `BODY_1` (idx 1), `BODY_2` (idx 2), `FOOTER` (idx 10)      |
| 4     | Skills Grid       | `TITLE` (idx 0), `BODY_1`–`BODY_6` (idx 1–6), `FOOTER` (idx 10)             |
| 5     | Project Showcase  | `TITLE` (idx 0), `BODY_1` (idx 1), `IMAGE` (idx 2), `FOOTER` (idx 10)       |
| 6     | Timeline          | `TITLE` (idx 0), `BODY` (idx 1), `FOOTER` (idx 10)                          |
| 7     | Data Results      | `TITLE` (idx 0), `IMAGE` (idx 1), `BODY` (idx 2), `FOOTER` (idx 10)         |
| 8     | Contact           | `TITLE` (idx 0), `BODY` (idx 1), `FOOTER` (idx 10)                          |

Placeholder indices are stable. Names match the spec exactly: `TITLE`, `SUBTITLE`, `BODY`, `BODY_1/2/...`, `IMAGE`, `IMAGE_1/2`, `FOOTER`.

## Quick start

### Option A — using the helper (recommended)

```python
from pptx import Presentation
from template_helpers import set_text, insert_image, LAYOUTS

prs = Presentation("research_portfolio_template.pptx")

# Add a title slide
slide = prs.slides.add_slide(prs.slide_layouts[LAYOUTS.TITLE])
set_text(slide, "TITLE", "Jane Doe")
set_text(slide, "SUBTITLE", "ML Research Engineer")

# Add a content slide with multi-line body
slide = prs.slides.add_slide(prs.slide_layouts[LAYOUTS.CONTENT])
set_text(slide, "TITLE", "Methodology")
set_text(slide, "BODY", [
    "We trained a 7B parameter model on the corpus.",
    "",
    "Evaluation used three benchmarks: MMLU, HellaSwag, ARC.",
])

# Add a project showcase with image
slide = prs.slides.add_slide(prs.slide_layouts[LAYOUTS.PROJECT_SHOWCASE])
set_text(slide, "TITLE", "Sparse Attention")
set_text(slide, "BODY_1", "Problem\n...\n\nSolution\n...\n\nTech Stack\n...")
insert_image(slide, "IMAGE", "diagram.png")

prs.save("output.pptx")
```

### Option B — plain python-pptx

```python
from pptx import Presentation
prs = Presentation("research_portfolio_template.pptx")

slide = prs.slides.add_slide(prs.slide_layouts[2])  # Content
slide.placeholders[0].text = "Methodology"
slide.placeholders[1].text = "We trained a 7B parameter model on the corpus."

prs.save("output.pptx")
```

PowerPoint renders this correctly. LibreOffice may not pick up some layout-level styling for title/body placeholders on dark-background layouts (Section Divider, Contact, Title Slide). If you need pixel-perfect rendering across viewers, use Option A.

## Demo slides

The template ships with 9 demo slides — one per layout — populated with bracketed placeholder text like `[ Slide Title ]` so you can immediately see what each layout looks like. These are intended to be deleted or replaced during automation.
