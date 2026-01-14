# Folder Structure Patterns for Web Applications

Understanding different approaches to organizing code in web applications - from small vanilla projects to large-scale architectures.

## Table of Contents

- [Current Project Structure](#current-project-structure)
- [Frontend Organization Patterns](#frontend-organization-patterns)
- [Backend Organization Patterns](#backend-organization-patterns)
- [Full-Stack Patterns](#full-stack-patterns)
- [When to Use Each Pattern](#when-to-use-each-pattern)

## Current Project Structure

**WebSandbox** uses **backend-side template rendering** with **component-based organization**:

```text
web-sandbox/
├── src/
│   ├── backend/              # Backend (by layer)
│   │   ├── backend.js        # HTTP backend entry point
│   │   ├── router.js        # Request routing + template rendering
│   │   ├── config.js        # backend configuration
│   │   ├── handlers/        # API route handlers
│   │   │   ├── api-routes.js
│   │   │   ├── data.js
│   │   │   └── health.js
│   │   └── utils/           # backend utilities
│   │       ├── template.js  # Template renderer
│   │       ├── pages.js     # Page configuration
│   │       ├── json.js
│   │       └── validators.js
│   ├── views/               # backend-rendered templates
│   │   ├── layout.html      # Base layout (shared structure)
│   │   └── pages/           # Page content fragments
│   │       ├── home.html
│   │       ├── api-demo.html
│   │       ├── ui-library.html      # Landing page for UI library
│   │       └── ui-library/          # Nested component collections
│   │           ├── buttons.html
│   │           ├── forms.html
│   │           └── cards.html
│   └── frontend/              # Frontend static assets
│       ├── components/      # Reusable UI components
│       │   ├── navbar/      # Each component in its own folder
│       │   │   ├── navbar.html
│       │   │   ├── navbar.css
│       │   │   └── navbar.js
│       │   └── footer/
│       │       ├── footer.html
│       │       ├── footer.css
│       │       └── footer.js
│       ├── css/             # Page-specific stylesheets
│       │   ├── api-demo.css
│       │   └── ui-library.css       # Shared by all UI library pages
│       ├── shared/          # Global utilities and styles
│       │   ├── styles.css   # Global CSS (resets, typography, layout)
│       │   ├── api-client.js # Fetch wrapper for API calls
│       │   └── error-display.js # User-facing error handling
│       └── js/              # Page-specific JavaScript
│           ├── main.js      # Shared initialization (all pages)
│           ├── api-demo.js  # API demo page logic
│           ├── ui-library.js        # UI library landing page
│           └── ui-library/          # Component collection scripts
│               ├── buttons.js
│               ├── forms.js
│               └── cards.js
└── docs/                    # Project docs and learning guides
```

**Philosophy**:

- **DRY for HTML**: Base layout template eliminates duplication; pages are just content fragments
- **backend-side rendering**: Router renders templates with page-specific data before sending to client
- **Component co-location**: Related files (HTML, CSS, JS) stay together in component folders
- **Clear separation**: Templates in `views/`, static assets in `frontend/`, backend logic in `backend/`
- **Explicit over implicit**: Template rendering is plain string replacement, no magic

## Frontend Organization Patterns

### 1. By File Type (Traditional)

Group files by their type: HTML, CSS, JavaScript.

```text
frontend/
├── index.html
├── about.html
├── css/
│   ├── main.css
│   ├── navbar.css
│   └── footer.css
├── js/
│   ├── main.js
│   ├── navbar.js
│   └── utils.js
└── images/
    └── logo.png
```

**Pros:**

- Simple and intuitive for small projects
- Easy to find files by type
- Traditional web development pattern

**Cons:**

- Related code is scattered (navbar.html, navbar.css, navbar.js in different folders)
- Harder to extract/move components
- Doesn't scale well for large projects

**Best for:** Small sites, learning projects, static websites

---

### 2. Component-Based (Modern)

Group all files for a component together.

```text
frontend/
├── index.html
├── components/
│   ├── navbar/
│   │   ├── navbar.html
│   │   ├── navbar.css
│   │   └── navbar.js
│   ├── footer/
│   │   ├── footer.html
│   │   ├── footer.css
│   │   └── footer.js
│   └── button/
│       ├── button.html
│       ├── button.css
│       └── button.js
└── shared/
    ├── utils.js
    └── global.css
```

**Pros:**

- Co-location: everything for a component is together
- Easy to extract and reuse components
- Clear ownership and boundaries
- Scales well for large projects

**Cons:**

- More complex file navigation
- May duplicate styles/utilities
- Requires loader/bundler for HTML imports

**Best for:** Component-based frameworks (React, Vue, Web Components), reusable UI libraries

---

### 3. Atomic Design

Organize components by their atomic level.

```text
frontend/
├── components/
│   ├── atoms/           # Smallest units
│   │   ├── button/
│   │   ├── input/
│   │   └── label/
│   ├── molecules/       # Simple combinations
│   │   ├── search-bar/
│   │   └── form-field/
│   ├── organisms/       # Complex combinations
│   │   ├── navbar/
│   │   └── footer/
│   ├── templates/       # Page layouts
│   │   └── main-layout/
│   └── pages/           # Specific instances
│       ├── home/
│       └── about/
└── shared/
```

**Pros:**

- Clear hierarchy and relationships
- Encourages reusability
- Well-defined component boundaries
- Popular in design systems

**Cons:**

- Can be over-engineered for simple projects
- Debatable where components belong
- Extra cognitive overhead

**Best for:** Design systems, component libraries, large UI-focused projects

---

### 4. Feature-Based (Modules)

Organize by feature/module rather than by technical type.

```text
frontend/
├── index.html
├── features/
│   ├── auth/
│   │   ├── login.html
│   │   ├── login.js
│   │   ├── login.css
│   │   └── signup.html
│   ├── dashboard/
│   │   ├── dashboard.html
│   │   ├── dashboard.js
│   │   ├── dashboard.css
│   │   └── widgets/
│   └── profile/
│       ├── profile.html
│       ├── profile.js
│       └── profile.css
└── shared/
    ├── components/
    └── utils/
```

**Pros:**

- Mirrors user-facing features
- Easy to add/remove entire features
- Clear feature boundaries
- Team ownership per feature

**Cons:**

- Can lead to duplication
- Requires clear shared component strategy
- May be confusing for small projects

**Best for:** Large applications, team-based development, modular apps

---

### 5. Container/Presentational (React Pattern)

Separate smart (container) from dumb (presentational) components.

```text
src/
├── containers/          # Smart components (logic, state)
│   ├── UserListContainer.js
│   └── DashboardContainer.js
├── components/          # Dumb components (UI only)
│   ├── UserCard.js
│   ├── Button.js
│   └── Input.js
└── services/
    └── api.js
```

**Pros:**

- Clear separation of concerns
- Reusable presentational components
- Easier to test presentational components
- Common React pattern

**Cons:**

- Can create unnecessary abstraction
- Extra boilerplate
- Modern hooks reduce the need for this pattern

**Best for:** React applications (older pattern), clear state management boundaries

---

## Backend Organization Patterns

### 1. By Layer (Traditional MVC)

Organize by architectural layer: routes, controllers, models, views.

```text
backend/
├── backend.js
├── routes/
│   ├── userRoutes.js
│   ├── postRoutes.js
│   └── authRoutes.js
├── controllers/
│   ├── userController.js
│   ├── postController.js
│   └── authController.js
├── models/
│   ├── User.js
│   └── Post.js
├── views/
│   └── templates/
└── middleware/
    ├── auth.js
    └── validation.js
```

**Pros:**

- Clear architectural layers
- Familiar MVC pattern
- Good separation of concerns
- Standard for many frameworks (Express, Rails, Laravel)

**Cons:**

- Related code is scattered (user routes, user controller, user model)
- Hard to extract features
- Can become monolithic

**Best for:** Traditional web apps, RESTful APIs, framework-based projects

---

### 2. By Feature (Domain-Driven)

Organize by business domain/feature.

```text
backend/
├── backend.js
├── features/
│   ├── users/
│   │   ├── userRoutes.js
│   │   ├── userController.js
│   │   ├── userModel.js
│   │   ├── userService.js
│   │   └── userValidation.js
│   ├── posts/
│   │   ├── postRoutes.js
│   │   ├── postController.js
│   │   ├── postModel.js
│   │   └── postService.js
│   └── auth/
│       ├── authRoutes.js
│       ├── authController.js
│       └── authService.js
└── shared/
    ├── middleware/
    ├── utils/
    └── config/
```

**Pros:**

- Co-location of related code
- Easy to add/remove features
- Mirrors business domains
- Good for microservices preparation
- Team ownership per feature

**Cons:**

- Can lead to code duplication
- Requires discipline for shared code
- May be overkill for simple APIs

**Best for:** Large backends, microservices, team-based development, domain-driven design

---

### 3. Clean Architecture (Layered with Dependency Inversion)

Organize by architectural boundaries with dependency rules.

```text
backend/
├── backend.js
├── domain/              # Business logic (no dependencies)
│   ├── entities/
│   │   ├── User.js
│   │   └── Post.js
│   └── useCases/
│       ├── createUser.js
│       └── getUser.js
├── application/         # Application logic
│   ├── services/
│   └── validators/
├── infrastructure/      # External dependencies
│   ├── database/
│   │   └── repositories/
│   ├── http/
│   │   ├── routes/
│   │   └── middleware/
│   └── cache/
└── interfaces/          # Adapters
    ├── controllers/
    └── presenters/
```

**Pros:**

- Clear dependency rules (inner layers don't depend on outer)
- Highly testable
- Technology-agnostic core
- Easy to swap implementations (database, HTTP framework)

**Cons:**

- Complex for simple projects
- Lots of abstraction layers
- Steeper learning curve
- Can be over-engineered

**Best for:** Large enterprise apps, long-lived projects, highly testable codebases

---

### 4. Modular Monolith

Feature modules with clear boundaries within a single codebase.

```text
backend/
├── backend.js
├── modules/
│   ├── users/
│   │   ├── api/         # frontend interface
│   │   │   └── routes.js
│   │   ├── domain/      # Internal logic
│   │   │   ├── userService.js
│   │   │   └── User.js
│   │   └── infrastructure/
│   │       └── userRepository.js
│   ├── posts/
│   │   ├── api/
│   │   ├── domain/
│   │   └── infrastructure/
│   └── billing/
│       ├── api/
│       ├── domain/
│       └── infrastructure/
└── shared/
    ├── database/
    ├── middleware/
    └── utils/
```

**Pros:**

- Mimics microservices without complexity
- Clear module boundaries
- Can extract to microservices later
- Good for team ownership

**Cons:**

- Requires discipline to maintain boundaries
- More complex than simple layering
- Can become a distributed monolith

**Best for:** Medium-to-large apps planning for microservices, teams with clear domain boundaries

---

## Full-Stack Patterns

### 1. Monorepo (Single Repository)

All frontend, backend, and shared code in one repo.

```text
project/
├── packages/
│   ├── frontend/        # React, Vue, etc.
│   │   ├── src/
│   │   └── package.json
│   ├── backend/         # Node.js API
│   │   ├── src/
│   │   └── package.json
│   ├── shared/          # Shared types, utils
│   │   ├── src/
│   │   └── package.json
│   └── mobile/          # Optional mobile app
│       └── src/
├── package.json         # Root workspace
└── lerna.json           # Monorepo tool config
```

**Tools:** Nx, Turborepo, Lerna, pnpm workspaces, Yarn workspaces

**Pros:**

- Single source of truth
- Easy code sharing (types, utils)
- Atomic commits across frontend/backend
- Simplified CI/CD

**Cons:**

- Large repo size
- Requires tooling (workspaces, build orchestration)
- All teams work in same repo

**Best for:** Full-stack TypeScript apps, startups, small-to-medium teams

---

### 2. Multi-Repo (Separate Repositories)

Frontend and backend are separate repos.

```text
frontend-repo/
├── src/
├── frontend/
└── package.json

backend-repo/
├── src/
├── config/
└── package.json
```

**Pros:**

- Clear ownership boundaries
- Independent deployment cycles
- Smaller, focused repos
- Different tech stacks easily supported

**Cons:**

- Harder to share code
- Versioning complexity
- More repos to manage
- Slower development for shared features

**Best for:** Large teams, microservices, different tech stacks, separate team ownership

---

### 3. Colocation (WebSandbox Approach)

Frontend assets served by backend as static files.

```text
project/
├── backend/              # Backend
│   ├── backend.js
│   ├── router.js
│   └── handlers/
└── frontend/              # Frontend (served as static)
    ├── index.html
    ├── css/
    ├── js/
    └── components/
```

**Pros:**

- Simple deployment (one backend)
- No CORS issues
- Single codebase, single repo
- Perfect for learning and small apps

**Cons:**

- Tightly coupled
- Frontend can't scale independently
- Harder to use modern build tools
- Not suitable for microservices

**Best for:** Learning projects, small apps, MVPs, backend-rendered apps

---

## When to Use Each Pattern

### Start Simple (Current Approach)

```text
✅ Use when:
- Learning web fundamentals
- Small team or solo developer
- Simple application (<10 pages/components)
- MVP or prototype

Current WebSandbox pattern
- frontend/ (by type + components)
- backend/ (by layer)
```

### Scale to Components

```text
✅ Use when:
- 10+ reusable UI components
- Multiple developers
- Component library needed
- Design system in place

Move to:
- Component-based frontend
- Feature-based backend
```

### Scale to Features

```text
✅ Use when:
- 5+ distinct features/domains
- Multiple teams
- Planning microservices
- Complex business logic

Move to:
- Feature-based frontend (src/features/)
- Feature-based backend (modules/)
```

### Scale to Architecture

```text
✅ Use when:
- Enterprise application
- Long-lived project (5+ years)
- High testability required
- Technology independence needed

Move to:
- Clean Architecture
- Monorepo with workspaces
- Separate services
```

---

## Decision Framework

Ask these questions when choosing a folder structure:

1. **Team Size**: Solo, small (2-5), medium (5-15), large (15+)?
2. **Project Complexity**: Simple CRUD, moderate features, complex domains?
3. **Expected Lifespan**: Prototype, 1-2 years, 5+ years?
4. **Technology**: Vanilla, framework, multiple services?
5. **Reusability Needs**: One-off components or shared library?
6. **Team Structure**: Single team, feature teams, platform teams?

**Rule of Thumb**: Start simple, refactor when pain points emerge. Premature abstraction is worse than no abstraction.

---

## Resources & Further Reading

- **MVC Pattern**: Classic layered architecture
- **Domain-Driven Design**: Feature/domain-based organization
- **Clean Architecture**: Dependency inversion and testability
- **Atomic Design**: Component hierarchy by Brad Frost
- **Modular Monolith**: Single codebase, microservices-like boundaries
- **Monorepo Tools**: Nx, Turborepo, Lerna

---

## Related Documentation

- [LEARNING_ROADMAP.md](LEARNING_ROADMAP.md) - Project evolution and phases
- [STYLESHEET_MANAGEMENT.md](STYLESHEET_MANAGEMENT.md) - CSS organization strategies
