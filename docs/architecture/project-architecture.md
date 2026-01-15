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
