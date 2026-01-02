# WebSandbox Learning Roadmap

A progressive roadmap for developing and experimenting with the WebSandbox application. Each phase introduces core web concepts while keeping the codebase small and understandable.

## Phase 1: HTTP Fundamentals & Request Routing ✓

**Goals**: Understand raw HTTP, explicit request handling, and route separation.

**Current State**:

- [x] Basic HTTP server using Node.js `http` module
- [x] Router that separates `/api` from static file serving
- [x] Single health-check endpoint
- [x] Query-aware routing (tolerates `?` in URLs)
- [x] Standardized JSON error responses

**Concepts**:

- [x] HTTP methods (`GET`, `POST`, etc.)
- [x] Status codes (200, 404, 400, 500)
- [x] Headers and `Content-Type`
- [x] Explicit routing vs. middleware abstractions

**Next Steps**:

- [x] Add a second GET endpoint (e.g., `/api/data` that returns JSON array)
- [x] Add POST endpoint with body parsing and validation
- [x] Document why no middleware stack (see `docs/NO_MIDDLEWARE.md`)

## Phase 1.5: Component Isolation & Stylesheet Management ✓

**Goals**: Understand modular CSS architecture and when to introduce build tools.

**Current State**:

- [x] Navbar extracted into separate `navbar.js` and `navbar.css` modules
- [x] Each component has its own stylesheet
- [x] Global styles in `styles.css` (reset, layout, typography)
- [x] No build step; files are linked individually

**Concepts**:

- [x] Modular CSS organization (component-scoped styles)
- [x] Stylesheet concatenation vs. bundling
- [x] HTTP request optimization
- [x] Minification and vendor prefixing
- [x] When build tools add value vs. complexity

**Next Steps**:

- [ ] Add more components (form, footer) with their own stylesheets
- [x] Document stylesheet management strategy (see `docs/STYLESHEET_MANAGEMENT.md`)
- [ ] When codebase grows (10+ stylesheets), introduce Vite or similar bundler

## Phase 2: Form Handling & Data Submission

**Goals**: Learn client-side form validation, data serialization, and server-side validation patterns.

**Expected Changes**:

- [ ] Add form to `public/index.html` (input fields, submit button)
- [ ] Create form handler in `public/js/main.js` (validation, loading states)
- [x] Create POST endpoint in `server/handlers/api.js` (validate, store in memory)
- [ ] Update `public/js/api.js` with form submission function
- [ ] Implement error display in DOM

**Concepts**:

- [ ] Form validation (client-side UX, server-side security)
- [ ] Fetch POST requests with JSON body
- [ ] Request/response lifecycles
- [ ] Error handling and user feedback

**Success Criteria**:

- [ ] Form submission works end-to-end
- [ ] Invalid inputs show friendly errors
- [ ] Server logs validation failures

## Phase 3: Data Persistence (In-Memory)

**Goals**: Understand data flow from HTTP requests to application state.

**Expected Changes**:

- [ ] Add in-memory data store (simple JS array/object in `server/handlers/api.js`)
- [ ] Create GET `/api/items` to list all data
- [ ] Create POST `/api/items` to add data
- [ ] Create DELETE `/api/items/:id` to remove data
- [ ] Frontend displays list and allows add/remove

**Concepts**:

- [ ] In-memory vs. persistent storage
- [ ] CRUD operations (Create, Read, Update, Delete)
- [ ] URL parameters (parsing `/api/items/123`)
- [ ] State management on the server

**Success Criteria**:

- [ ] Full CRUD workflow visible in UI
- [ ] Refresh loses data (expected; teaches why persistence matters)

## Phase 4: File-Based Persistence

**Goals**: Introduce basic file I/O and why databases exist.

**Expected Changes**:

- [ ] Replace in-memory store with `fs/promises` read/write to JSON file
- [ ] Add error handling for file read/write operations
- [ ] Create `data.json` or similar

**Concepts**:

- [ ] File I/O patterns (`fs/promises`)
- [ ] JSON serialization/deserialization
- [ ] Race conditions (multiple requests writing simultaneously)
- [ ] Why relational databases exist

**Success Criteria**:

- [ ] Data persists across server restarts
- [ ] Concurrent requests don't corrupt data (or demonstrate the problem)

## Phase 5: Authentication & Sessions

**Goals**: Understand how browsers track users and secure endpoints.

**Expected Changes**:

- [ ] Add login form (username/password in memory or file)
- [ ] Use cookies or simple token to track authenticated user
- [ ] Protect endpoints with authentication check
- [ ] Add logout

**Concepts**:

- [ ] HTTP cookies vs. tokens
- [ ] Session management
- [ ] Protected routes
- [ ] Why HTTPS matters (not implemented, but discuss)

**Success Criteria**:

- [ ] Unauthenticated requests are rejected
- [ ] Authenticated user can perform actions
- [ ] Logout clears session

## Phase 6: Real-Time Updates (Optional)

**Goals**: Introduce WebSockets for persistent connections.

**Expected Changes**:

- [ ] Implement WebSocket server (Node.js `ws` library or native)
- [ ] Broadcast data changes to all connected clients
- [ ] Update UI when server sends data

**Concepts**:

- [ ] WebSockets vs. HTTP polling
- [ ] Event-driven architecture
- [ ] Broadcasting vs. point-to-point messaging

**Success Criteria**:

- [ ] Multiple browser tabs see updates in real-time
- [ ] Scalability issues become apparent (teaches why pub/sub systems exist)

## Phase 7: Experiments & Sandbox Use Cases

Once the foundation is solid, use the codebase as a sandbox for:

- **Blog**: Add markdown parsing, date-based filtering, archives
- **Dashboard**: Real-time data visualization, multiple data sources
- **API Design**: Build more complex endpoints, versioning patterns
- **Rate Limiting**: Understand request throttling
- **Caching**: Compare in-memory cache vs. file-based persistence
- **Testing**: Unit tests for handlers, integration tests for flows

## Architecture Decisions & Why

### No Frameworks

- **HTTP module only**: Every line explicitly shows what's happening
- **Manual routing**: Forces understanding of URL parsing and dispatch
- **No middleware stack**: Eliminates "magic" request/response handling

### Explicit Error Handling

- **JSON error bodies**: Consistent API contract
- **Status codes matter**: Forces thinking about semantics, not just "error" vs. "ok"
- **Logging strategy**: Only unexpected errors logged; normal 404s ignored

### Learning Progression

- Start with stateless operations (GET)
- Add state management (in-memory → file → database)
- Add complexity (auth, real-time) only after fundamentals are clear

## References for Deep Dives

As you progress, link from code/PRs to detailed docs:

- `HTTP Fundamentals`: How the protocol works
- `Request Routing`: Manual URL parsing and dispatch
- `Stylesheet Management`: Modular CSS, bundling, and build tools (see `docs/STYLESHEET_MANAGEMENT.md`)
- `Form Validation`: Client-side UX vs. server-side security
- `File I/O`: When and why to persist data
- `WebSockets`: Real-time patterns and trade-offs

## Metrics for Success

- **Each phase adds 1–3 new endpoints or features**
- **Codebase remains <500 lines (excluding data files)**
- **Every file is readable in 1–2 minutes**
- **No external frameworks introduced without explicit justification**
