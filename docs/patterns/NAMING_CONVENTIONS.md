# Naming Conventions for Web Applications

A comprehensive guide to naming folders and files in web projects - covering common conventions, best practices, and what belongs where.

## Table of Contents

- [General Naming Principles](#general-naming-principles)
- [Folder Naming Conventions](#folder-naming-conventions)
- [File Naming Conventions](#file-naming-conventions)
- [Framework-Specific Conventions](#framework-specific-conventions)
- [Common Pitfalls](#common-pitfalls)

---

## General Naming Principles

### Universal Rules

1. **Be Consistent**: Pick a convention and stick to it across the entire project
2. **Be Descriptive**: Names should clearly indicate purpose
3. **Be Concise**: Short but meaningful (avoid `verylongdescriptivefoldernamethatisTooMuch`)
4. **Use ASCII**: Avoid special characters, spaces, accents (stick to `a-z`, `0-9`, `-`, `_`)
5. **Lowercase Preferred**: Most web backends are case-sensitive on Linux/Unix

### Case Styles

| Style                    | Example           | Common Use                        |
| ------------------------ | ----------------- | --------------------------------- |
| **kebab-case**           | `user-profile.js` | Files, folders, URLs, CSS classes |
| **camelCase**            | `userProfile.js`  | JavaScript variables, functions   |
| **PascalCase**           | `UserProfile.js`  | React/Vue components, classes     |
| **snake_case**           | `user_profile.js` | Python, Ruby, database columns    |
| **SCREAMING_SNAKE_CASE** | `API_KEY`         | Constants, environment variables  |

---

## Folder Naming Conventions

### Common Frontend Folders

#### `assets/`

**Purpose**: Static resources that don't change (images, fonts, icons, videos)

**Contains**:

```text
assets/
├── images/
│   ├── logo.png
│   ├── hero-banner.jpg
│   └── icons/
│       ├── arrow.svg
│       └── close.svg
├── fonts/
│   ├── roboto-regular.woff2
│   └── roboto-bold.woff2
├── videos/
│   └── intro.mp4
└── documents/
    └── terms.pdf
```

**Naming**:

- `assets/` or `static/` or `frontend/` (framework-dependent)
- Lowercase with hyphens: `hero-banner.jpg`, `user-avatar.png`
- Organize by type: `images/`, `fonts/`, `videos/`

**When to use**: Images, fonts, videos, PDFs, favicons, downloadable files

---

#### `components/`

**Purpose**: Reusable UI components (buttons, cards, modals, etc.)

**Contains**:

```text
components/
├── button/
│   ├── Button.jsx
│   ├── Button.css
│   └── Button.test.js
├── card/
│   ├── Card.jsx
│   └── Card.css
├── modal/
│   ├── Modal.jsx
│   └── Modal.css
└── navbar/
    ├── navbar.html
    ├── navbar.js
    └── navbar.css
```

**Naming**:

- `components/` (standard across React, Vue, Angular)
- **React/Vue**: PascalCase for component files (`Button.jsx`, `UserCard.vue`)
- **Vanilla JS**: kebab-case for files (`navbar.js`, `modal.js`)
- Folder names: kebab-case (`user-profile/`) or match component (`Button/`)

**When to use**: Any reusable UI element that appears in multiple places

---

#### `pages/` or `views/` or `routes/`

**Purpose**: Top-level page components or route handlers

**Contains**:

```text
pages/
├── Home.jsx
├── About.jsx
├── Dashboard.jsx
└── user/
    ├── Profile.jsx
    └── Settings.jsx
```

**Naming**:

- `pages/` (Next.js, Nuxt.js, Gatsby)
- `views/` (Vue Router, Angular)
- `routes/` (Some backend conventions)
- **Files**: PascalCase for components (`Home.jsx`), kebab-case for routes (`user-profile.js`)

**When to use**: Full page components, route-specific logic

---

#### `layouts/`

**Purpose**: Page layout wrappers (headers, footers, sidebars)

**Contains**:

```text
layouts/
├── MainLayout.jsx
├── DashboardLayout.jsx
├── AuthLayout.jsx
└── components/
    ├── Header.jsx
    ├── Footer.jsx
    └── Sidebar.jsx
```

**Naming**:

- `layouts/` (standard)
- **Files**: PascalCase (`MainLayout.jsx`, `DashboardLayout.jsx`)
- Describes purpose: `AuthLayout`, `AdminLayout`, `frontendLayout`

**When to use**: Shared page structures, persistent navigation elements

---

#### `styles/` or `css/`

**Purpose**: Global stylesheets, CSS utilities, themes

**Contains**:

```text
styles/
├── globals.css         # Global styles, reset
├── variables.css       # CSS custom properties
├── utilities.css       # Utility classes
├── themes/
│   ├── light.css
│   └── dark.css
└── mixins/
    └── breakpoints.css
```

**Naming**:

- `styles/` or `css/` or `scss/`
- **Files**: kebab-case (`global-styles.css`, `button.module.css`)
- Use descriptive names: `reset.css`, `typography.css`, `utilities.css`

**When to use**: Global CSS, theme files, CSS modules, preprocessor files

---

#### `lib/` or `utils/` or `helpers/`

**Purpose**: Utility functions, helper methods, shared logic

**Contains**:

```text
lib/
├── format.js           # formatDate, formatCurrency
├── validation.js       # validateEmail, validatePassword
├── storage.js          # localStorage wrapper
├── api.js              # fetch wrappers
└── constants.js        # Shared constants
```

**Naming**:

- `lib/` (general utilities)
- `utils/` (utility functions)
- `helpers/` (helper functions)
- **Files**: camelCase (`formatDate.js`) or kebab-case (`format-date.js`)
- Descriptive function groups: `validation.js`, `formatting.js`, `api.js`

**When to use**: Pure functions, non-UI logic, shared utilities

---

#### `services/`

**Purpose**: API calls, external service integrations, business logic

**Contains**:

```text
services/
├── auth.js             # authService.login(), authService.logout()
├── api.js              # Generic API client
├── user.js             # userService.getProfile(), userService.updateProfile()
├── analytics.js        # Analytics tracking
└── payment.js          # Payment processing
```

**Naming**:

- `services/` (standard)
- **Files**: camelCase (`authService.js`) or kebab-case (`auth-service.js`)
- Domain-based: `userService.js`, `postService.js`, `paymentService.js`

**When to use**: API integrations, third-party services, business logic

---

#### `hooks/` (React-specific)

**Purpose**: Custom React hooks

**Contains**:

```text
hooks/
├── useAuth.js
├── useFetch.js
├── useLocalStorage.js
└── useWindowSize.js
```

**Naming**:

- `hooks/` (React convention)
- **Files**: camelCase starting with `use` (`useAuth.js`, `useFetch.js`)
- Always prefix with `use` per React convention

**When to use**: React custom hooks only

---

#### `context/` (React-specific)

**Purpose**: React Context providers and consumers

**Contains**:

```text
context/
├── AuthContext.jsx
├── ThemeContext.jsx
└── UserContext.jsx
```

**Naming**:

- `context/` or `contexts/`
- **Files**: PascalCase ending with `Context` (`AuthContext.jsx`)

**When to use**: React Context API implementations

---

#### `store/` or `state/`

**Purpose**: State management (Redux, Vuex, Zustand, etc.)

**Contains**:

```text
store/
├── index.js            # Store configuration
├── slices/             # Redux Toolkit slices
│   ├── authSlice.js
│   └── userSlice.js
├── actions/            # Redux actions
│   └── userActions.js
└── reducers/           # Redux reducers
    └── userReducer.js
```

**Naming**:

- `store/` (Redux, Zustand)
- `state/` (generic)
- **Files**: camelCase with suffix (`authSlice.js`, `userReducer.js`)

**When to use**: Redux, MobX, Vuex, Zustand, or other state management

---

#### `types/` or `interfaces/` (TypeScript)

**Purpose**: TypeScript type definitions and interfaces

**Contains**:

```text
types/
├── user.ts             # User type/interface
├── post.ts             # Post type/interface
├── api.ts              # API response types
└── index.ts            # Re-export all types
```

**Naming**:

- `types/` (general types)
- `@types/` (global type definitions)
- **Files**: camelCase or kebab-case (`user.ts`, `api-types.ts`)

**When to use**: TypeScript projects, shared type definitions

---

#### `config/`

**Purpose**: Configuration files, environment variables, constants

**Contains**:

```text
config/
├── api.js              # API base URLs, endpoints
├── routes.js           # Route definitions
├── constants.js        # App-wide constants
└── theme.js            # Theme configuration
```

**Naming**:

- `config/` or `configs/`
- **Files**: camelCase or kebab-case (`api-config.js`, `theme.js`)

**When to use**: App configuration, constants, environment-specific settings

---

#### `tests/` or `__tests__/`

**Purpose**: Test files (unit, integration, e2e)

**Contains**:

```text
tests/
├── unit/
│   ├── utils.test.js
│   └── validation.test.js
├── integration/
│   └── api.test.js
└── e2e/
    └── login.spec.js
```

**Naming**:

- `tests/` or `__tests__/` (Jest convention)
- `test/` (also common)
- **Files**: Match source with `.test.js` or `.spec.js` suffix

**When to use**: All test files

---

### Common Backend Folders

#### `routes/` or `api/`

**Purpose**: Route definitions and handlers

**Contains**:

```text
routes/
├── index.js            # Main router
├── users.js            # /api/users routes
├── posts.js            # /api/posts routes
└── auth.js             # /api/auth routes
```

**Naming**:

- `routes/` or `api/`
- **Files**: Plural, kebab-case (`users.js`, `blog-posts.js`)

---

#### `controllers/`

**Purpose**: Request handlers, business logic coordinators

**Contains**:

```text
controllers/
├── userController.js
├── postController.js
└── authController.js
```

**Naming**:

- `controllers/`
- **Files**: camelCase with `Controller` suffix (`userController.js`)

---

#### `models/`

**Purpose**: Database models, schemas, entities

**Contains**:

```text
models/
├── User.js
├── Post.js
└── Comment.js
```

**Naming**:

- `models/`
- **Files**: PascalCase, singular (`User.js`, `Post.js`)

---

#### `middleware/`

**Purpose**: Express/Koa middleware functions

**Contains**:

```text
middleware/
├── auth.js             # Authentication middleware
├── validation.js       # Request validation
├── errorHandler.js     # Error handling
└── logger.js           # Request logging
```

**Naming**:

- `middleware/` or `middlewares/`
- **Files**: camelCase or kebab-case (`auth.js`, `error-handler.js`)

---

#### `database/` or `db/`

**Purpose**: Database connection, migrations, seeders

**Contains**:

```text
database/
├── connection.js       # DB connection setup
├── migrations/         # Schema migrations
│   └── 001_create_users.js
├── seeds/              # Test data
│   └── users.js
└── repositories/       # Data access layer
    └── userRepository.js
```

**Naming**:

- `database/` or `db/`
- **Migration files**: Timestamp or numbered prefix (`001_create_users.js`)
- **Seeds**: Plural (`users.js`, `posts.js`)

---

### Special Folders

#### `frontend/` or `static/`

**Purpose**: frontendly accessible files served directly

**Contains**:

```text
frontend/
├── index.html
├── favicon.ico
├── robots.txt
└── manifest.json
```

**Naming**:

- `frontend/` (Create React App, Next.js)
- `static/` (Some frameworks)
- Files served as-is from this folder

---

#### `dist/` or `build/`

**Purpose**: Compiled/bundled output (generated, not committed)

**Naming**:

- `dist/` (distribution)
- `build/` (build output)
- Should be in `.gitignore`

---

#### `node_modules/`

**Purpose**: npm/yarn dependencies (generated, not committed)

**Naming**:

- Always `node_modules/`
- Should be in `.gitignore`

---

#### `docs/`

**Purpose**: Documentation, guides, architecture docs

**Contains**:

```text
docs/
├── LEARNING_ROADMAP.md
├── FOLDER_STRUCTURE_PATTERNS.md
└── API.md
```

**Naming**:

- `docs/` or `documentation/`
- **Files**: UPPERCASE.md for major docs, kebab-case.md for others

---

## File Naming Conventions

### General Rules

| File Type                | Convention                         | Example                               |
| ------------------------ | ---------------------------------- | ------------------------------------- |
| **HTML**                 | kebab-case                         | `user-profile.html`                   |
| **CSS**                  | kebab-case                         | `main-styles.css`                     |
| **JavaScript (vanilla)** | camelCase or kebab-case            | `userProfile.js` or `user-profile.js` |
| **JavaScript (React)**   | PascalCase                         | `UserProfile.jsx`                     |
| **JavaScript (Vue)**     | PascalCase                         | `UserProfile.vue`                     |
| **TypeScript**           | Match JS convention + `.ts`/`.tsx` | `UserProfile.tsx`                     |
| **Test files**           | Match source + `.test` or `.spec`  | `userProfile.test.js`                 |
| **Config files**         | kebab-case or standard names       | `.eslintrc.js`, `vite.config.js`      |
| **Markdown**             | UPPERCASE or kebab-case            | `README.md`, `setup-guide.md`         |

---

### JavaScript/TypeScript Files

#### React Components

```text
PascalCase + .jsx/.tsx
✅ Button.jsx
✅ UserProfile.jsx
✅ NavBar.tsx
❌ button.jsx
❌ userprofile.jsx
```

#### Vue Components

```text
PascalCase + .vue (or kebab-case)
✅ Button.vue
✅ UserProfile.vue
✅ user-profile.vue (also acceptable)
❌ button.vue (if multi-word component)
```

#### Vanilla JavaScript

```text
camelCase or kebab-case + .js
✅ userProfile.js
✅ user-profile.js
✅ main.js
❌ UserProfile.js (unless it's a class)
❌ user_profile.js (avoid in JS)
```

#### Utility/Helper Files

```text
camelCase or kebab-case
✅ formatDate.js
✅ format-date.js
✅ validation.js
✅ api-client.js
```

#### Configuration Files

```text
Standard names or kebab-case
✅ .eslintrc.js
✅ vite.config.js
✅ jest.config.js
✅ tsconfig.json
✅ package.json
```

---

### CSS Files

#### Standard CSS

```text
kebab-case + .css
✅ main-styles.css
✅ button.css
✅ user-profile.css
❌ mainStyles.css
❌ UserProfile.css
```

#### CSS Modules

```text
kebab-case + .module.css
✅ Button.module.css
✅ user-profile.module.css
✅ card.module.css
```

#### Preprocessor Files

```text
kebab-case + .scss/.sass/.less
✅ variables.scss
✅ mixins.scss
✅ button.scss
✅ _variables.scss (partial)
```

---

### Image Files

```text
kebab-case + extension
✅ hero-banner.jpg
✅ user-avatar.png
✅ company-logo.svg
✅ close-icon.svg
❌ HeroBanner.jpg
❌ user_avatar.png
❌ companyLogo.svg

Version suffixes if needed:
✅ logo-v2.png
✅ hero-banner-mobile.jpg
✅ icon-close-white.svg
```

---

### Test Files

```text
Match source file + .test or .spec
Source: userProfile.js
✅ userProfile.test.js
✅ userProfile.spec.js

Source: Button.jsx
✅ Button.test.jsx
✅ Button.spec.tsx (if TypeScript)

Test folders:
✅ __tests__/Button.test.js
✅ tests/unit/Button.test.js
```

---

## Framework-Specific Conventions

### React/Next.js

```text
src/
├── components/          # PascalCase
│   └── Button.jsx
├── pages/              # PascalCase or kebab-case
│   ├── Home.jsx
│   └── user-profile.jsx (Next.js file-based routing)
├── hooks/              # camelCase with 'use' prefix
│   └── useAuth.js
├── utils/              # camelCase or kebab-case
│   └── formatDate.js
└── styles/             # kebab-case or CSS Modules
    └── globals.css
```

### Vue/Nuxt

```text
src/
├── components/         # PascalCase or kebab-case
│   ├── TheHeader.vue   # 'The' prefix for singletons
│   ├── BaseButton.vue  # 'Base' prefix for base components
│   └── UserProfile.vue
├── pages/             # kebab-case (file-based routing)
│   ├── index.vue
│   └── user-profile.vue
├── composables/       # camelCase with 'use' prefix
│   └── useAuth.js
└── assets/            # kebab-case
    └── logo.svg
```

### Angular

```text
src/
├── app/
│   ├── components/    # kebab-case
│   │   ├── user-profile/
│   │   │   ├── user-profile.component.ts
│   │   │   ├── user-profile.component.html
│   │   │   ├── user-profile.component.css
│   │   │   └── user-profile.component.spec.ts
│   ├── services/      # kebab-case + .service
│   │   └── auth.service.ts
│   └── models/        # kebab-case
│       └── user.model.ts
└── assets/
```

### Node.js/Express

```text
backend/
├── routes/            # kebab-case or camelCase
│   └── userRoutes.js
├── controllers/       # camelCase + Controller suffix
│   └── userController.js
├── models/           # PascalCase (classes/schemas)
│   └── User.js
├── middleware/       # camelCase or kebab-case
│   └── auth.js
└── utils/            # camelCase or kebab-case
    └── validation.js
```

---

## Common Pitfalls

### ❌ Avoid These Mistakes

**Inconsistent casing:**

```text
❌ components/
   ├── Button.jsx
   ├── userProfile.jsx
   └── nav-bar.jsx

✅ components/
   ├── Button.jsx
   ├── UserProfile.jsx
   └── NavBar.jsx
```

**Unclear abbreviations:**

```text
❌ utils/
   ├── fmt.js
   ├── val.js
   └── usr.js

✅ utils/
   ├── format.js
   ├── validation.js
   └── user.js
```

**Spaces or special characters:**

```text
❌ User Profile.jsx
❌ user@profile.js
❌ user/profile.js (in filename)

✅ UserProfile.jsx
✅ user-profile.js
```

**Too long or nested:**

```text
❌ src/components/user/profile/edit/form/UserProfileEditFormComponent.jsx

✅ src/components/user/ProfileEditForm.jsx
```

**Not descriptive:**

```text
❌ utils/helpers.js
❌ components/thing.jsx
❌ data.js

✅ utils/date-helpers.js
✅ components/UserCard.jsx
✅ user-data.js
```

---

## Quick Reference Table

| Purpose        | Folder Name            | File Convention        | Example                        |
| -------------- | ---------------------- | ---------------------- | ------------------------------ |
| Static assets  | `assets/`, `static/`   | kebab-case             | `hero-image.jpg`               |
| UI components  | `components/`          | PascalCase (React)     | `Button.jsx`                   |
| Pages/Views    | `pages/`, `views/`     | PascalCase or kebab    | `Home.jsx`, `user-profile.jsx` |
| Utilities      | `utils/`, `lib/`       | camelCase              | `formatDate.js`                |
| API services   | `services/`, `api/`    | camelCase              | `authService.js`               |
| Styles         | `styles/`, `css/`      | kebab-case             | `global-styles.css`            |
| React hooks    | `hooks/`               | camelCase + `use`      | `useAuth.js`                   |
| Backend routes | `routes/`, `api/`      | kebab-case, plural     | `users.js`                     |
| Models         | `models/`              | PascalCase, singular   | `User.js`                      |
| Tests          | `tests/`, `__tests__/` | Match source + `.test` | `Button.test.jsx`              |
| Config         | `config/`              | kebab-case             | `api-config.js`                |
| Documentation  | `docs/`                | UPPERCASE or kebab     | `README.md`, `api-docs.md`     |

---

## Best Practices Summary

1. **Pick a convention and be consistent** across your entire project
2. **Match your framework's conventions** (React = PascalCase, Vue = kebab or Pascal)
3. **Use descriptive names** - `UserProfileCard.jsx` beats `UPC.jsx`
4. **Group related files** - co-locate CSS, tests, and components
5. **Avoid abbreviations** unless universally known (API, URL, ID are fine)
6. **Use plural for collections** - `components/`, `routes/`, `users.js` (backend)
7. **Add suffixes for clarity** - `authService.js`, `userController.js`, `Button.test.js`
8. **Keep names short but meaningful** - balance between clarity and brevity

---

## Related Documentation

- [FOLDER_STRUCTURE_PATTERNS.md](FOLDER_STRUCTURE_PATTERNS.md) - How to organize folders
- [LEARNING_ROADMAP.md](LEARNING_ROADMAP.md) - Project evolution
- [STYLESHEET_MANAGEMENT.md](STYLESHEET_MANAGEMENT.md) - CSS organization
