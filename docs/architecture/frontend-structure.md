# Frontend Structure

## Stylesheet Organization

- **10_foundations**
  - base, colors, spacing, typography
  - The "*ground level*"
  - Everything that establishes baseline behavior
    - What elements look like before components
- **20_components**
  - Reusable UI building blocks
  - Each file shows one complete, focused component style
- **30_layouts**
  - Page structure and responsiveness
  - Separate from components because layout is orthogonal to component styling
- **40_pages**
  - Page-specific overrides/tweaks
  - Should be minimal
    - NOTE: If adding a lot here, consider moving styles to components
