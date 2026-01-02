# Page-Owned State Pattern

Understanding state ownership in component-based applications without frameworks.

## What is Page-Owned State?

**Page-owned state** means that page scripts (like `main.js`) own application state and pass it to components as parameters. Components receive state, render based on it, but don't manage it themselves.

This is opposed to **component-local state**, where each component manages its own state internally.

## Example: Active Link in Navbar

### Before: Component-Local State ❌

```javascript
// navbar.js - Component owns the logic
function initNavbar() {
  const currentPath = window.location.pathname;  // Component reads state
  links.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
}

// main.js - Page doesn't know what's happening
await loadNavbar("#navbar");  // No parameters, no visibility
```

**Problems:**

- Page has no visibility into what navbar is doing
- Navbar is tightly coupled to `window.location`
- Hard to test (must mock `window.location`)
- Can't easily override active link (e.g., for nested routes)
- State logic is hidden inside component

### After: Page-Owned State ✅

```javascript
// main.js - Page owns state and passes it down
const pageState = {
  currentPath: window.location.pathname,  // Page reads state
};

await loadNavbar("#navbar", pageState);  // State flows down

// navbar.js - Component receives state as parameter
export async function loadNavbar(containerSelector, state = {}) {
  // ...
  initNavbar(state);  // Pass state through
}

function initNavbar(state = {}) {
  if (state.currentPath) {
    setActiveLink(links, state.currentPath);  // Uses passed state
  }
}

function setActiveLink(links, currentPath) {
  // Pure function - no hidden dependencies
  links.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      link.classList.add("active");
    }
  });
}
```

**Benefits:**

- State flow is **explicit** - you can see exactly what data is passed
- Navbar is **decoupled** from `window.location`
- Easy to **test** - just pass different `currentPath` values
- Page can **override** behavior (e.g., set active link manually)
- **Single source of truth** - page owns state

---

## Why This Pattern is Better for Learning

### 1. **Explicit Data Flow**

You can trace exactly where data comes from:

```javascript
// Clear data flow: page → component
const state = { currentPath: "/api" };
await loadNavbar("#navbar", state);
```

vs. hidden data access:

```javascript
// Hidden: where does navbar get currentPath?
await loadNavbar("#navbar");
// (Answer: reads window.location internally, but you can't tell from here)
```

### 2. **No Hidden Dependencies**

Components that read global state (`window.location`, `localStorage`, etc.) have **hidden dependencies**. You can't tell what they need without reading their implementation.

Page-owned state makes dependencies **visible in function signatures**:

```javascript
// Signature tells you what navbar needs
export async function loadNavbar(containerSelector, state)
```

### 3. **Easier Testing**

Testing component-local state requires mocking globals:

```javascript
// Hard: Must mock window.location
global.window = { location: { pathname: "/api" } };
await loadNavbar("#navbar");
```

Testing page-owned state is straightforward:

```javascript
// Easy: Just pass test data
await loadNavbar("#navbar", { currentPath: "/test" });
```

### 4. **Prepares for Complexity**

As your app grows, state becomes more complex:

- User authentication (is user logged in?)
- User data (username, avatar)
- App settings (theme, language)
- Current view state (selected tab, filters)

**Page-owned state scales:**

```javascript
const pageState = {
  currentPath: window.location.pathname,
  user: { name: "Alice", isAuthenticated: true },
  theme: localStorage.getItem("theme") || "light",
};

await loadNavbar("#navbar", pageState);
```

Each component receives only what it needs. The page coordinates everything.

### 5. **Matches How Frameworks Work**

This pattern mirrors how React, Vue, and other frameworks handle state:

**React example:**

```jsx
// Parent owns state
function App() {
  const currentPath = useLocation();
  return <Navbar currentPath={currentPath} />;
}
```

**Our vanilla pattern:**

```javascript
// Page owns state
const pageState = { currentPath: window.location.pathname };
await loadNavbar("#navbar", pageState);
```

When you eventually learn frameworks, this pattern will feel familiar.

---

## When to Use Page-Owned vs. Component-Local State

### Use **Page-Owned State** when

- ✅ State affects multiple components (e.g., user auth affects navbar + content)
- ✅ State comes from URLs, localStorage, or API calls
- ✅ You want to test components with different states
- ✅ You need to coordinate behavior between components

### Use **Component-Local State** when

- ✅ State is purely internal (e.g., "is mobile menu open?")
- ✅ State never leaves the component
- ✅ No other component needs to react to changes
- ✅ State is UI-only (animations, hover, focus)

**Example: Mobile menu toggle is still component-local:**

```javascript
// Inside navbar.js - only navbar cares if menu is open
toggleButton.addEventListener("click", () => {
  navLinks.classList.toggle("show");  // Local state
});
```

No other component needs to know if the mobile menu is open, so it stays inside the navbar.

---

## Implementation in WebSandbox

### Files Changed

1. **navbar.js**
   - Added `state` parameter to `loadNavbar()`
   - Moved active link logic to `setActiveLink()` function
   - Accepts `currentPath` from page instead of reading `window.location`

2. **main.js**
   - Created `pageState` object with `currentPath`
   - Passes state to `loadNavbar()`
   - Owns state for the index page

3. **api-page.js**
   - Created `pageState` object with `currentPath`
   - Passes state to `loadNavbar()`
   - Owns state for the API demo page

### Data Flow

```text
Page Script (main.js)
    ↓
  Creates pageState = { currentPath: "/api" }
    ↓
  Passes to loadNavbar("#navbar", pageState)
    ↓
Component (navbar.js)
    ↓
  Receives state parameter
    ↓
  Calls setActiveLink(links, state.currentPath)
    ↓
  Highlights active link in UI
```

State flows **one direction**: down from page to component. This is called **unidirectional data flow**.

---

## Future Extensions

As you add features, page-owned state makes it easy to coordinate:

### Example: User Authentication

```javascript
// main.js
const pageState = {
  currentPath: window.location.pathname,
  user: await fetchUser(),  // Get user data
};

await loadNavbar("#navbar", pageState);

// navbar.js - shows username and logout button
function initNavbar(state = {}) {
  if (state.user) {
    showUserMenu(state.user.name);
  } else {
    showLoginButton();
  }
}
```

### Example: Nested Routes

```javascript
// main.js - page can override active link logic
const pageState = {
  currentPath: "/api",
  activeNavItem: "/api",  // Highlight "API" even on /api/advanced
};

await loadNavbar("#navbar", pageState);
```

---

## Key Takeaways

1. **State flows down**: Page → Component (never up)
2. **Events flow up**: Component → Page (callbacks)
3. **Single source of truth**: Only one place owns each piece of state
4. **Explicit > implicit**: Function parameters reveal dependencies
5. **Testability**: Easy to test components with different state

This pattern keeps code **readable, testable, and scalable** without requiring a framework.

---

## Related Documentation

- [ERROR_BOUNDARIES.md](ERROR_BOUNDARIES.md) - Error handling pattern (another form of state)
- [NO_MIDDLEWARE.md](../architecture/NO_MIDDLEWARE.md) - Why explicit is better than implicit
- [FOLDER_STRUCTURE_PATTERNS.md](../architecture/FOLDER_STRUCTURE_PATTERNS.md) - Component organization
