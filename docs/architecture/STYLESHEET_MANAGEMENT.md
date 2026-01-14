# Stylesheet Management

Understanding how to organize CSS in web applications - from modular development to production optimization.

## Modular CSS (Current Approach)

**File Structure:**

```text
frontend/css/
├── styles.css      # Global reset, layout, typography
├── navbar.css      # Navbar component styles
└── [other].css     # Feature-specific styles
```

**Advantages:**

- **Clarity** - Styles are colocated with their concerns
- **Maintainability** - Easy to find and edit component styles
- **Modularity** - Can copy navbar.css + navbar.js to other projects
- **Debugging** - DevTools clearly shows which file a style comes from
- **Transparency** - Learn exactly how CSS organization works

**Disadvantages:**

- **Multiple HTTP requests** - Browser fetches each stylesheet separately
- **No optimization** - Code isn't minified or processed
- **No vendor prefixing** - Must manually add `-webkit-`, `-moz-` for compatibility

## Production: Bundled CSS

Large applications bundle CSS into a single file because:

**1. Fewer HTTP Requests**

```html
<!-- Development (Multiple requests) -->
<link rel="stylesheet" href="/css/styles.css" />
<link rel="stylesheet" href="/css/navbar.css" />
<link rel="stylesheet" href="/css/form.css" />

<!-- Production (Single request) -->
<link rel="stylesheet" href="/css/bundle.min.css" />
```

**2. Minification**

- Removes whitespace, comments, unnecessary characters
- Shortens color hex: `#ffffff` → `#fff`
- Reduces file size by 30-50%

**3. Autoprefixing**

- Tool automatically adds vendor prefixes
- `-webkit-transform`, `-moz-user-select`, etc.

**4. Asset Processing**

- Handles `@import` statements
- Optimizes images and fonts
- Removes unused CSS (tree-shaking)

## Build Tools for CSS

### Common Tools

| Tool          | Purpose                     | Use Case                            |
| ------------- | --------------------------- | ----------------------------------- |
| **PostCSS**   | Transforms CSS with plugins | Add vendor prefixes, minify         |
| **Sass/SCSS** | CSS preprocessor            | Variables, nesting, mixins          |
| **webpack**   | Module bundler              | Bundle CSS + JS together            |
| **Vite**      | Modern bundler              | Fast rebuilds, ES module support    |
| **Parcel**    | Zero-config bundler         | Simple projects, automatic handling |

### Build Process Example

```bash
# Input: Multiple .css files
frontend/css/styles.css
frontend/css/navbar.css

# Build Tool Pipeline:
1. Concatenate files
2. Add vendor prefixes (postcss-autoprefixer)
3. Minify (remove whitespace, shorten values)
4. Generate source maps (for debugging)

# Output: Single optimized file
frontend/css/bundle.min.css  (5KB instead of 12KB)
```

## When to Introduce Build Tools

**Keep modular CSS if:**

- Project is small (< 10 stylesheets)
- You're learning web fundamentals
- Team is comfortable with vanilla workflows
- Load performance isn't critical

**Introduce build tools when:**

- You have 10+ stylesheets causing noticeable delay
- You need Sass variables/nesting
- You're deploying to production
- You want minification and optimization
- Team already uses build tools

## For This Project

WebSandbox keeps modular CSS because:

- **Learning-focused**: See exactly how stylesheets work
- **No build complexity**: Stays true to vanilla-first philosophy
- **Portable components**: navbar.css can be copied directly to other projects
- **Small codebase**: No performance penalty with current file count

Future phase can introduce a simple bundler (Vite) when the project grows.

---

**Related Concepts:**

- HTTP request optimization
- CSS minification
- Vendor prefixes
- CSS-in-JS vs. CSS files
- Component-scoped styling
