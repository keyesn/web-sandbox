# Layout Design

Overview of web page layout design principles and structure.

---

NOTE: WORK IN PROGRESS

## Shell vs Page Layout

- Shell: Navbar, Footer, any persistent UI elements
- Page Layout: Content unique to each page

## Layouts

- **Flexbox**
  - For 1D layouts (row or column)
    - *"How do these items align relative to each other?"*
    - `== micro layout`
  - Use for:
    - aligning items in one direction
  - Examples:
    - toolbars, nav items, button groups
    - card headers, footers, inline layouts
- **Grid**
  - For 2D layouts (rows and columns)
- Positioning
  - For overlays, modals, tooltips, etc.

## Box Sizing

- `border-box`
  - Global default
- `content-box`
- `padding-box`
- `margin-box`
