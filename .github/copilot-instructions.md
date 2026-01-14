# Copilot Instructions for WebSandbox

## Project Intent

This is a **learning-first, framework-free web application** for understanding how the web works at a fundamental level.

- **No frameworks**: Vanilla JavaScript, plain Node.js, no Express/React/etc.
- **Explicit over implicit**: Code should teach _why_ things work
- **Small and modular**: Each component should be understandable in isolation

## Architecture

### Request Flow

1. **backend/server.js** - HTTP server entry point (Node `http` module, port 3000)
2. **backend/router.js** - Routes incoming requests:
   - `/api/*` → backend/handlers/api-routes.js
   - Known page routes → Render using template system (views/layout.html + page fragments)
   - Everything else → Serve static files from `frontend/` (CSS, JS, images)
3. **backend/handlers/** - API endpoint handlers (add new handlers as new files)
4. **backend/utils/template.js** - Simple template renderer (replaces {{PLACEHOLDERS}})
5. **backend/utils/pages.js** - Page configuration (routes → metadata)

### Frontend

The frontend uses **component-based file organization** with **backend-side template rendering**:

- **views/layout.html** - Base HTML template (shared structure, no duplication)
- **views/pages/** - Page-specific content fragments (no full HTML, just `<main>` content)
  - `home.html` - Home page content
  - `api-demo.html` - API demo content
  - `ui-library.html` - UI library content
- **frontend/components/** - Reusable UI components (each in its own folder with HTML/CSS/JS)
  - `navbar/` - Navigation bar component with navbar.html, navbar.css, navbar.js
  - `footer/` - Footer component
- **frontend/shared/** - Global utilities and styles
  - `styles.css` - Global CSS (resets, typography, layout)
  - `api-client.js` - Fetch wrapper for `/api/*` endpoints
  - `error-display.js` - User-facing error display utility
- **frontend/js/** - Page-specific JavaScript
  - `main.js` - Shared initialization (navbar/footer loading, error clearing)
  - `api-demo.js` - API demo page logic
  - `ui-library.js` - UI library page logic
- **frontend/css/** - Page-specific stylesheets
  - `api-demo.css` - API demo styles
  - `ui-library.css` - UI library styles

### Data Flow

**Page Rendering:** Router → Check page config → Read layout.html + page fragment → Render template → Send HTML

**API Calls:** Frontend → `fetch()` → `/api/...` → JSON response → DOM update

## Developer Workflows

### Docs for Deep Dives

- Keep this file and README lean; put longer design pattern/technology explanations in docs/ (repo root).
- Link to the specific doc from comments or PR notes instead of inlining long text here.
- See docs/LEARNING_ROADMAP.md for the development progression and learning phases.

### Running the App

```bash
npm start  # Starts backend on http://localhost:3000
```

### Adding a New Page

1. Create page content fragment in src/views/pages/ (e.g., `about.html`)
2. Add route configuration in src/backend/utils/pages.js
3. Specify page title, subtitle, content file, stylesheets, and scripts
4. Create page-specific JS file in frontend/js/ if needed (e.g., `about.js`)
5. Create page-specific CSS file in frontend/css/ if needed (e.g., `about.css`)

### Adding a New API Endpoint

1. Add handler in backend/handlers/api-routes.js
2. Call it from frontend/shared/api-client.js
3. Trigger from page-specific JS (frontend/js/\*.js) with DOM events

### Adding a New Component

1. Create folder in frontend/components/ (e.g., `footer/`)
2. Add component files: `footer.html`, `footer.css`, `footer.js`
3. Component JS should export a load function (e.g., `loadFooter()`)
4. Import and call from main.js or page-specific JS files
5. Component CSS is linked in views/layout.html (if global) or page config (if page-specific)

## Key Backend Patterns

- **Explicit routing**: Check `req.method` and `req.url` directly (no middleware stack)
- **Error handling**: Return 404 with `writeHead(404)` for missing resources; return 400 for bad input, 500 for backend errors
- **JSON responses**: Set `Content-Type: application/json` for API routes
- **File serving**: Use `fs/promises` with `path.resolve()` for security
- **API errors**: Respond with JSON error object: `{ error: "descriptive message" }`
- **Logging**: Log backend errors to console for debugging; do not expose stack traces to clients

## Key Frontend Patterns

- **Component organization**: Each component in its own folder (HTML, CSS, JS together)
- **Shared utilities**: Global styles and helper functions in `shared/` folder
- **Page scripts**: Page-specific JS in `js/` folder, not shared components
- **DOM queries**: Use `document.querySelector()` for single elements
- **Event listeners**: `addEventListener()` on queried elements
- **Async/await**: For fetch calls; keep handlers readable
- **No templating**: Build HTML in the DOM, not in strings
- **Form validation**: Validate required fields client-side before fetch; backend-side validation is required too
- **Error display**: Catch fetch errors, display in DOM; use `console.error()` for debugging
- **Loading states**: Disable buttons during fetch; optionally show loading message
- **Component imports**: Use relative paths from page scripts (e.g., `../components/navbar/navbar.js`)
- **Fetch pattern**: Wrap fetch in try/catch and check `res.ok` before `res.json()`
  ```javascript
  try {
    const res = await fetch("/api/data");
    if (!res.ok) throw new Error(`backend error: ${res.status}`);
    return await res.json();
  } catch (err) {
    console.error(err);
    // Show a user-friendly message in the DOM
  }
  ```

## Code Style

- **Vanilla first**: No build tools or transpilation
- **Readability > cleverness**: Favor clear loops over functional chains
- **Comments**: Explain _why_, not _what_
- **Modern JS**: Use ES2020+ (arrow functions, async/await, const/let)

## When to Introduce Libraries

Only suggest libraries if the user explicitly asks or complexity clearly demands it. Always explain tradeoffs: what problem it solves vs. what it obscures from learning.

## General Guidelines

- Prefer vanilla JavaScript over frameworks
- Avoid suggesting: Express, React, Vue, Angular, CSS frameworks, build tools
- Use modern JavaScript (ES2020+), but avoid unnecessary complexity

## Backend Guidelines

- Use Node.js core modules (`http`, `fs`, `path`, etc.)
- Prefer handwritten routing, no middleware stack
- Favor readable control flow over abstractions
- Keep request/response handling explicit
- Use JSON for API responses

## Frontend Guidelines

- Use ES modules (`type="module"`)
- Manipulate the DOM directly
- Avoid client-side frameworks
- Prefer semantic HTML
- Use modern browser APIs where possible

## Learning-Oriented Suggestions

When generating code:

- Favor examples that teach _why_ something works
- Prefer small, incremental changes
- Avoid “magic” abstractions
- Comment code where intent is not obvious
