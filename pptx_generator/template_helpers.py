"""
template_helpers.py
===================

Small helpers for filling the research_portfolio_template.pptx template.

Why this exists
---------------
The template's slide layouts define text styling (fonts, colors, sizes,
alignment) via PowerPoint's `<a:lstStyle>` mechanism. PowerPoint honors that
inheritance correctly. LibreOffice and some other viewers don't always honor
layout-level lstStyle for placeholder types (title/ctrTitle/body), and may
fall back to master defaults.

Setting a placeholder via `slide.placeholders[idx].text = "..."` replaces text
but creates an empty run that depends on inheritance. Using `set_text()` from
this module instead stamps the layout's text style directly onto the run,
guaranteeing correct rendering everywhere.

Usage
-----
    from pptx import Presentation
    from template_helpers import set_text, LAYOUTS

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

    # Insert an image
    insert_image(slide, "IMAGE", "/path/to/chart.png")

    prs.save("output.pptx")
"""
from copy import deepcopy
from pptx.oxml.ns import qn
from lxml import etree


class LAYOUTS:
    """Layout indices for the research portfolio template."""
    TITLE             = 0   # TITLE, SUBTITLE, FOOTER
    SECTION_DIVIDER   = 1   # TITLE, SUBTITLE
    CONTENT           = 2   # TITLE, BODY, FOOTER
    TWO_COLUMN        = 3   # TITLE, BODY_1, BODY_2, FOOTER
    SKILLS_GRID       = 4   # TITLE, BODY_1..BODY_6, FOOTER
    PROJECT_SHOWCASE  = 5   # TITLE, BODY_1, IMAGE, FOOTER
    TIMELINE          = 6   # TITLE, BODY, FOOTER
    DATA_RESULTS      = 7   # TITLE, IMAGE, BODY, FOOTER
    CONTACT           = 8   # TITLE, BODY, FOOTER


def _layout_ph_defrpr(slide, name):
    """
    Return the <a:defRPr> element from the matching layout placeholder's
    lstStyle. Used to copy run-level styling to the slide.
    """
    layout = slide.slide_layout
    for ph in layout.placeholders:
        if ph.name == name:
            txBody = ph.element.find(qn('p:txBody'))
            if txBody is None:
                return None
            lstStyle = txBody.find(qn('a:lstStyle'))
            if lstStyle is None:
                return None
            lvl1 = lstStyle.find(qn('a:lvl1pPr'))
            if lvl1 is None:
                return None
            return lvl1.find(qn('a:defRPr'))
    return None


def _find_ph(slide, name):
    """Find a placeholder by its name on the slide, falling back to the layout name."""
    for ph in slide.placeholders:
        if ph.name == name:
            return ph
    # If slide-level placeholder has a generic name (Title 1, Text Placeholder 2),
    # match by the layout's placeholder index instead.
    layout = slide.slide_layout
    target_idx = None
    for ph in layout.placeholders:
        if ph.name == name:
            target_idx = ph.placeholder_format.idx
            break
    if target_idx is None:
        return None
    for ph in slide.placeholders:
        if ph.placeholder_format.idx == target_idx:
            return ph
    return None


def _layout_ph_geometry(slide, name):
    """Return the <a:xfrm> from the matching layout placeholder, if any."""
    layout = slide.slide_layout
    for ph in layout.placeholders:
        if ph.name == name:
            spPr = ph.element.find(qn('p:spPr'))
            if spPr is None:
                return None
            return spPr.find(qn('a:xfrm'))
    return None


def _stamp_geometry(ph, xfrm):
    """Copy <a:xfrm> from layout onto the slide-level placeholder's spPr."""
    if xfrm is None:
        return
    spPr = ph.element.find(qn('p:spPr'))
    if spPr is None:
        return
    # Remove existing xfrm and prstGeom
    for tag in ('a:xfrm', 'a:prstGeom'):
        for old in spPr.findall(qn(tag)):
            spPr.remove(old)
    spPr.append(deepcopy(xfrm))
    # Add prstGeom rect
    prst = etree.fromstring(
        '<a:prstGeom xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" '
        'prst="rect"><a:avLst/></a:prstGeom>')
    spPr.append(prst)


def _layout_ph_lvl1ppr(slide, name):
    """Return the <a:lvl1pPr> element from the layout placeholder, if any.

    This carries paragraph-level defaults like algn and buNone.
    """
    layout = slide.slide_layout
    for ph in layout.placeholders:
        if ph.name == name:
            txBody = ph.element.find(qn('p:txBody'))
            if txBody is None:
                return None
            lstStyle = txBody.find(qn('a:lstStyle'))
            if lstStyle is None:
                return None
            return lstStyle.find(qn('a:lvl1pPr'))
    return None


def _layout_ph_bodypr(slide, name):
    """Return the <a:bodyPr> from the matching layout placeholder, if any."""
    layout = slide.slide_layout
    for ph in layout.placeholders:
        if ph.name == name:
            txBody = ph.element.find(qn('p:txBody'))
            if txBody is None:
                return None
            return txBody.find(qn('a:bodyPr'))
    return None


def _apply_lvl1ppr_to_paragraph(paragraph, lvl1pPr):
    """Copy lvl1pPr's paragraph-level properties (algn, buNone, etc.) onto a paragraph."""
    if lvl1pPr is None:
        return
    p_el = paragraph._p
    pPr = p_el.find(qn('a:pPr'))
    if pPr is None:
        pPr = etree.SubElement(p_el, qn('a:pPr'))
        # pPr must be the first child of <a:p>
        p_el.remove(pPr)
        p_el.insert(0, pPr)
    # Copy attributes (algn, indent, marL etc.)
    for k, v in lvl1pPr.attrib.items():
        pPr.set(k, v)
    # Ensure buNone child if present in lvl1pPr
    if lvl1pPr.find(qn('a:buNone')) is not None:
        # Remove any existing bullet config
        for tag in ('a:buChar', 'a:buAutoNum', 'a:buNone'):
            for old in pPr.findall(qn(tag)):
                pPr.remove(old)
        pPr.append(etree.fromstring(
            '<a:buNone xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main"/>'))


def set_text(slide, name, text):
    """
    Set a placeholder's text by name, stamping layout style and position.

    Args:
        slide: the slide object (from prs.slides.add_slide(...))
        name:  placeholder name — e.g. "TITLE", "BODY", "BODY_1"
        text:  string, or list of strings (one per paragraph)

    Multi-paragraph text can also be passed as a string with "\\n" separators.
    """
    ph = _find_ph(slide, name)
    if ph is None:
        raise KeyError(f"No placeholder named {name!r} on this slide.")

    if isinstance(text, str):
        lines = text.split("\n")
    else:
        lines = list(text)

    # Stamp position and bodyPr from the layout
    xfrm = _layout_ph_geometry(slide, name)
    _stamp_geometry(ph, xfrm)

    bodyPr_layout = _layout_ph_bodypr(slide, name)
    if bodyPr_layout is not None:
        txBody = ph.element.find(qn('p:txBody'))
        if txBody is not None:
            bodyPr_old = txBody.find(qn('a:bodyPr'))
            if bodyPr_old is not None:
                txBody.replace(bodyPr_old, deepcopy(bodyPr_layout))

    # Get the layout's defRPr for run styling and lvl1pPr for paragraph styling
    defRPr = _layout_ph_defrpr(slide, name)
    lvl1pPr = _layout_ph_lvl1ppr(slide, name)

    # Rename slide-level placeholder to match
    cNvPr = ph.element.find(qn('p:nvSpPr')).find(qn('p:cNvPr'))
    cNvPr.set('name', name)

    # Set text
    tf = ph.text_frame
    tf.clear()
    p0 = tf.paragraphs[0]
    p0.text = lines[0] if lines else ""
    _apply_lvl1ppr_to_paragraph(p0, lvl1pPr)
    if defRPr is not None and p0.runs:
        _apply_defrpr_to_run(p0.runs[0], defRPr)
    for line in lines[1:]:
        p = tf.add_paragraph()
        p.text = line
        _apply_lvl1ppr_to_paragraph(p, lvl1pPr)
        if defRPr is not None and p.runs:
            _apply_defrpr_to_run(p.runs[0], defRPr)
    return ph


def _apply_defrpr_to_run(run, defRPr):
    """Copy <a:defRPr> attributes and children onto a run's <a:rPr>."""
    rPr = run._r.find(qn('a:rPr'))
    if rPr is None:
        rPr = etree.SubElement(run._r, qn('a:rPr'))
        run._r.insert(0, rPr)
    # Copy attributes (sz, b, i, etc.)
    for k, v in defRPr.attrib.items():
        rPr.set(k, v)
    # Replace solidFill, latin/ea/cs typeface children
    for tag in ('a:solidFill', 'a:latin', 'a:ea', 'a:cs'):
        # Remove existing child of this tag
        for old in rPr.findall(qn(tag)):
            rPr.remove(old)
    # Append children from defRPr
    for child in defRPr:
        rPr.append(deepcopy(child))


def insert_image(slide, name, image_path):
    """
    Insert an image into a picture placeholder by name.

    Args:
        slide: the slide
        name:  placeholder name — e.g. "IMAGE", "IMAGE_1"
        image_path: path to the image file

    Note: this replaces the placeholder with a picture, which is the standard
    PowerPoint behavior for picture placeholders.
    """
    ph = _find_ph(slide, name)
    if ph is None:
        raise KeyError(f"No placeholder named {name!r} on this slide.")
    return ph.insert_picture(image_path)


def list_placeholders(layout):
    """Pretty-print the placeholders on a layout for debugging."""
    print(f"Layout {layout.name}:")
    for ph in layout.placeholders:
        print(f"  idx={ph.placeholder_format.idx:2d}  name={ph.name!r}")


if __name__ == "__main__":
    # Quick demo
    from pptx import Presentation
    prs = Presentation("research_portfolio_template.pptx")
    print(f"Template has {len(prs.slide_layouts)} layouts:\n")
    for i, lay in enumerate(prs.slide_layouts):
        list_placeholders(lay)
        print()
