# Frontend Folder Organization

## Current Architecture: Server-Side Template Rendering ✅ IMPLEMENTED

WebSandbox now uses **server-side template rendering** to eliminate HTML duplication while maintaining clarity.

### Structure Overview

```text
src/
├── views/                          # Server-rendered templates
│   ├── layout.html                 # Base layout (shared structure)
│   └── pages/                      # Page-specific content fragments
│       ├── home.html
│       ├── api-demo.html
│       ├── ui-library.html         # UI library landing page
│       └── ui-library/             # Component collection pages
│           ├── buttons.html
│           ├── forms.html
│           └── cards.html
└── public/                         # Static assets
    ├── components/                 # Reusable UI components
    │   ├── navbar/
    │   └── footer/
    ├── css/                        # Page-specific stylesheets
    │   ├── api-demo.css
    │   └── ui-library.css
    ├── shared/                     # Global utilities and styles
    │   ├── styles.css
    │   ├── api-client.js           # API fetch wrapper
    │   └── error-display.js        # Error handling utility
    └── js/                         # Page-specific JavaScript
        ├── main.js                 # Shared initialization (all pages)
        ├── api-demo.js             # API demo page logic
        ├── ui-library.js           # UI library landing page
        └── ui-library/             # Component collection scripts
            ├── buttons.js
            ├── forms.js
            └── cards.js
```

### Key Patterns

| File Type | Location | Purpose | Examples |
| --------- | -------- | ------- | -------- |
| **Base Template** | `views/layout.html` | Shared HTML structure (DRY) | One file for all pages |
| **Page Fragments** | `views/pages/*.html` | Page-specific `<main>` content | `api-demo.html`, `home.html` |
| **Nested Pages** | `views/pages/<section>/` | Sub-pages for organized sections | `ui-library/buttons.html` |
| **Page Config** | `server/utils/pages.js` | Route → metadata mapping | Title, subtitle, stylesheets, scripts |
| **Shared Init** | `public/js/main.js` | Navbar/footer loading, error clearing | Runs on all pages |
| **Page Scripts** | `public/js/*.js` | Page-specific logic | `api-demo.js`, `ui-library.js` |
| **Nested Scripts** | `public/js/<section>/` | Scripts for nested pages | `ui-library/buttons.js` |
| **Shared Utilities** | `public/shared/*.js` | Application-wide helpers | `api-client.js`, `error-display.js` |
| **Page Styles** | `public/css/*.css` | Page-specific styling | `api-demo.css`, `ui-library.css` |

### Naming Convention

- **Page files**: Match across layers: `api-demo.html` (view) ↔ `api-demo.js` (script) ↔ `api-demo.css` (style)
- **Nested pages**: Mirror structure: `views/pages/ui-library/buttons.html` ↔ `public/js/ui-library/buttons.js`
- **Utilities**: Descriptive function name: `api-client.js`, `error-display.js` (no page suffix)
- **Components**: Folder name matches file prefix: `navbar/navbar.js`, `footer/footer.css`

### Nested Page Pattern (✅ IMPLEMENTED)

For sections with multiple related pages (like UI Library), use nested folders:

**Structure:**

- Landing page: `/ui-library` → `views/pages/ui-library.html`
- Sub-pages: `/ui-library/buttons` → `views/pages/ui-library/buttons.html`

**Benefits:**

- **Clear hierarchy**: Related pages grouped together
- **Scalable**: Easy to add more sub-pages without cluttering root
- **Intuitive URLs**: `/ui-library/buttons`, `/ui-library/forms`, `/ui-library/cards`
- **Consistent naming**: HTML/JS/CSS files mirror the route structure

**Example (UI Library):**

```text
Routes                     Views                              Scripts
/ui-library         →      pages/ui-library.html       →      js/ui-library.js
/ui-library/buttons →      pages/ui-library/buttons.html →    js/ui-library/buttons.js
/ui-library/forms   →      pages/ui-library/forms.html →      js/ui-library/forms.js
/ui-library/cards   →      pages/ui-library/cards.html →      js/ui-library/cards.js
```

**When to use:**

- Multiple related pages under one section
- Need for a landing/index page with navigation to sub-pages
- Logical grouping improves maintainability

---

### Option 2: Semantic Naming (Better Clarity)

If you want even clearer semantics, use this approach:

```text
public/
├── index.html
├── demos/                           # NEW: Directory for demo pages
│   ├── api-testing.html
│   ├── ui-library.html
│   └── index.html (redirects to main)
├── components/
├── shared/
│   ├── api-client.js               # General-purpose API wrapper
│   ├── error-display.js
│   └── styles.css
└── js/
    ├── main.js                      # For root index.html
    └── demos/                       # NEW: Demo page scripts
        ├── api-testing.js
        └── ui-library.js
```

**Why this works:**

- **Demos are clearly separated** from main app pages
- **Shared utilities** stay in `shared/`
- **Page scripts are grouped** with their HTML

**Trade-off:** More directories, but much clearer intent

---

### Option 3: Layer-Based Organization

If you anticipate more utilities beyond `api-client.js`:

```text
public/
├── index.html
├── api.html                         # Keep as is
├── ui-library.html
├── components/
├── shared/
│   ├── api/                         # NEW: API utilities
│   │   └── client.js                # Renamed from api-client.js
│   ├── errors/                      # NEW: Error handling
│   │   └── display.js               # Renamed from error-display.js
│   ├── styles.css
│   └── utils/                       # NEW: General utilities
│       └── (future utilities here)
└── js/
    ├── main.js
    ├── api-page.js
    └── ui-library.js
```

**Why this works:**

- **Scales as utilities grow** (what if you add `api/auth.js`, `api/cache.js`?)
- **Clear boundaries** between concerns
- **Easy to find related files** (`shared/api/*` are all API-related)

**Trade-off:** More nesting; overhead if you only have 2 utilities

---

## Recommendation: Start with Option 1

### Here's why

1. **Minimal effort** - Just rename 2 files and update 2 import statements
2. **Clear naming convention** - Readers immediately understand `api-demo.js` is page-specific
3. **Matches your existing pattern** - `main.js`, `ui-library.js` already use this style
4. **Scales to Option 2/3 later** - If utilities grow, you can restructure then
5. **Teaches good practices** - File names clearly signal intent

### Implementation (Option 1)

**Files to rename:**

- `public/api.html` → `public/api-demo.html`
- `public/js/api-page.js` → `public/js/api-demo.js`

**Files to update imports in:**

- `public/api-demo.html` - Change script src from `/js/api-page.js` to `/js/api-demo.js`

---

## Naming Convention Clarity

Once you establish this pattern, document it:

```text
Page Files:
- HTML: <page-name>.html
- JS:   <page-name>.js  (or main.js for index.html)
- CSS:  <page-name>.css (optional, if page-specific)

Shared Utilities:
- Utilities: <function>.js (e.g., api-client.js, error-display.js)
- Styles:   styles.css (global, or namespace in CSS)
```

This makes it immediately obvious whether a file is reusable.

---

## Future Considerations

### As you add more pages

```text
public/
├── index.html
├── api-demo.html
├── ui-library.html
├── blog.html                        # When you add this
├── dashboard.html                   # When you add this
└── js/
    ├── main.js
    ├── api-demo.js
    ├── ui-library.js
    ├── blog.js
    └── dashboard.js
```

Clear naming keeps this manageable.

### As you add more utilities

**When you hit ~5+ utilities**, consider restructuring to Option 3:

```text
public/
├── shared/
│   ├── api-client.js                # One or two? Stay flat
│   └── error-display.js
```

vs.

```text
public/
├── shared/
│   ├── api/
│   │   ├── client.js
│   │   └── (future API utilities)
│   └── errors/
│       └── display.js
```

---

## Summary

**Recommended action:**

1. Rename `api.html` → `api-demo.html`
2. Rename `js/api-page.js` → `js/api-demo.js`
3. Update import in `api-demo.html` script tag
4. Keep `shared/api-client.js` as is (it's a utility, not page-specific)
5. Document the naming convention in your README or style guide

This solves the confusion with minimal effort and establishes a clear, scalable pattern.
