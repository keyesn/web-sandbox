# Project Architecture

Meant to be a consolidation of other architecture docs to avoid the hoarding of scattered information.
The implementations referenced reflect the current projects implementation. Other approaches
are referenced in other docs, but the references are only for educational purposes.

## Overall Project

```text
web-sandbox/
├── dist/                          # Built files (CSS + JS bundles)
├── docs/                          # Notes, learning guides, and implementations
└── src/                           # source code (written by me, not generated)
    ├── frontend/                    # browser-accessible files
    └── backend/                    # backend-only logic
```

- backend: *Layered Architecture* (Clean Architecture-inspired)
- frontend: *Centralized by file-type*

### "Frontend"?

In the current setup, the frontend consists of:

- static assets served from `frontend/`
- HTML pages rendered backend-side from `views/`
- Vanilla JS which runs in the browser

## Frontend Organization

```text
frontend/
├── assets/                      # Static files
│   ├── fonts/
│   ├── icons/
│   └── images/
├── pages/                       # Full HTML page documents
│   ├── index.html              # Root page
│   ├── api-demo.html
│   ├── ui-library.html
│   ├── style-showcase.html
│   └── ui-library/             # Sub-pages
│       ├── buttons.html
│       ├── cards.html
│       └── forms.html
├── components/                 # Reusable UI components (loaded dynamically)
│   ├── navbar/                # Navigation bar component
│   │   ├── navbar.html
│   │   ├── navbar.css
│   │   └── navbar.js
│   ├── footer/                # Footer component
│   │   ├── footer.html
│   │   ├── footer.css
│   │   └── footer.js
│   └── ui-library/            # UI component showcase
│       ├── buttons/
│       ├── cards/
│       └── forms/
├── css/                        # Page-specific stylesheets
│   ├── index.css              # Main CSS entry point (bundled to dist/)
│   ├── bundle.css             # Generated bundle (committed for reference)
│   ├── api-demo.css
│   ├── style-showcase.css
│   ├── ui-library.css
│   └── components/            # Component-specific styles
│       ├── buttons.css
│       ├── cards.css
│       └── forms.css
└── js/                         # Page and utility scripts
    ├── main.js                # Shared initialization (all pages)
    ├── api-demo.js            # API demo page logic
    ├── ui-library.js          # UI library landing page
    ├── ui-library/            # Sub-page scripts
    │   ├── buttons.js
    │   ├── cards.js
    │   └── forms.js
    └── utils/                 # Utility functions
        ├── api-client.js      # API fetch wrapper
        └── error-display.js   # Error handling utility
```

### Key Patterns

**Pages:** Each page in `frontend/pages/` is a complete HTML document with:

- Full HTML structure (DOCTYPE, head, body)
- Inline or linked CSS (from `/dist/bundle.css` and page-specific CSS)
- Inline or linked JS (main.js, page-specific scripts, and utilities)
- Backend routes map directly to files:
  - `/` → `frontend/pages/index.html`
  - `/api-demo` → `frontend/pages/api-demo.html`
  - `/ui-library/buttons` → `frontend/pages/ui-library/buttons.html`

**Components:** Reusable UI components (navbar, footer, UI library) loaded dynamically via fetch and inserted into the DOM

**Utilities:** Shared functions in `frontend/js/utils/` used across page scripts and components

**CSS:**

- Global styles bundled from `frontend/css/index.css` → `dist/bundle.css`
- Page-specific styles linked individually (e.g., `/css/api-demo.css`)
- Component styles in `frontend/css/components/`

**Backend routes map directly to pages:**

- `/` --> `pages/index.html`
- `/api-demo` --> `pages/api-demo.html`
