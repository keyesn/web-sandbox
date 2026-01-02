# Copilot Instructions for WebSandbox

## Project Intent

This is a **learning-first, framework-free web application** for understanding how the web works at a fundamental level.

- **No frameworks**: Vanilla JavaScript, plain Node.js, no Express/React/etc.
- **Explicit over implicit**: Code should teach _why_ things work
- **Small and modular**: Each component should be understandable in isolation

## Architecture

### Request Flow

1. **server/server.js** - HTTP server entry point (Node `http` module, port 3000)
2. **server/router.js** - Routes incoming requests:
   - `/api/*` → server/handlers/api.js
   - Everything else → Serve static files from `public/`
3. **server/handlers/** - API endpoint handlers (add new handlers as new files)

### Frontend

The frontend uses **component-based file organization**:

- **public/index.html** - Semantic HTML with module script
- **public/components/** - Reusable UI components (each in its own folder with HTML/CSS/JS)
  - `navbar/` - Navigation bar component with navbar.html, navbar.css, navbar.js
- **public/shared/** - Global utilities and styles
  - `styles.css` - Global CSS (resets, typography, layout)
  - `api.js` - Fetch wrapper for `/api/*` endpoints
- **public/js/** - Page-specific JavaScript
  - `main.js` - Script for index.html
  - `api-page.js` - Script for api.html

### Data Flow

Frontend → `fetch()` → `/api/...` → JSON response → DOM update

## Developer Workflows

### Docs for Deep Dives

- Keep this file and README lean; put longer design pattern/technology explanations in docs/ (repo root).
- Link to the specific doc from comments or PR notes instead of inlining long text here.
- See docs/LEARNING_ROADMAP.md for the development progression and learning phases.

### Running the App

```bash
npm start  # Starts server on http://localhost:3000
```

### Adding a New API Endpoint

1. Add handler in server/handlers/api.js
2. Call it from public/shared/api.js
3. Trigger from page-specific JS (public/js/*.js) with DOM events

### Adding a New Component

1. Create folder in public/components/ (e.g., `footer/`)
2. Add component files: `footer.html`, `footer.css`, `footer.js`
3. Component JS should export a load function (e.g., `loadFooter()`)
4. Import and call from page-specific JS files
5. Link component CSS in HTML files that use it

## Key Backend Patterns

- **Explicit routing**: Check `req.method` and `req.url` directly (no middleware stack)
- **Error handling**: Return 404 with `writeHead(404)` for missing resources; return 400 for bad input, 500 for server errors
- **JSON responses**: Set `Content-Type: application/json` for API routes
- **File serving**: Use `fs/promises` with `path.resolve()` for security
- **API errors**: Respond with JSON error object: `{ error: "descriptive message" }`
- **Logging**: Log server errors to console for debugging; do not expose stack traces to clients

## Key Frontend Patterns

- **Component organization**: Each component in its own folder (HTML, CSS, JS together)
- **Shared utilities**: Global styles and helper functions in `shared/` folder
- **Page scripts**: Page-specific JS in `js/` folder, not shared components
- **DOM queries**: Use `document.querySelector()` for single elements
- **Event listeners**: `addEventListener()` on queried elements
- **Async/await**: For fetch calls; keep handlers readable
- **No templating**: Build HTML in the DOM, not in strings
- **Form validation**: Validate required fields client-side before fetch; server-side validation is required too
- **Error display**: Catch fetch errors, display in DOM; use `console.error()` for debugging
- **Loading states**: Disable buttons during fetch; optionally show loading message
- **Component imports**: Use relative paths from page scripts (e.g., `../components/navbar/navbar.js`)
- **Fetch pattern**: Wrap fetch in try/catch and check `res.ok` before `res.json()`
  ```javascript
  try {
    const res = await fetch("/api/data");
    if (!res.ok) throw new Error(`Server error: ${res.status}`);
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
