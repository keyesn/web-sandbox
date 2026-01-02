# Why No Middleware Stack

This project uses **explicit routing** rather than a middleware stack (like Express.js). Here's why.

## What is a Middleware Stack?

A middleware stack is a series of functions that process a request sequentially before it reaches a route handler. Each middleware can inspect/modify the request, pass control to the next middleware, or short-circuit the request.

Example (Express):

```javascript
app.use(cors());
app.use(bodyParser.json());
app.use(authenticate);
app.post('/api/data', handleData);
```

In this model:

1. CORS middleware runs first
2. Body parser runs next
3. Authentication runs third
4. Finally, the route handler runs

## Why Not Use Middleware?

### 1. **Explicit is Better Than Implicit**

In this project, every request handler explicitly shows what it does:

```javascript
export async function handleDataPost(req, res) {
  try {
    const body = await readJsonBody(req);          // <- We see this is called
    const validation = validateDataPayload(body);  // <- We see this is called
    // ... response
  } catch (err) {
    // ... error handling
  }
}
```

With middleware, the flow is hidden in configuration:

- You must look at every middleware definition
- Order matters but isn't always obvious
- New developers must understand the framework's execution model

### 2. **Easier to Debug**

When a request fails, where's the problem?

**With explicit code**: Read the handler top-to-bottom. Every function call is visible.

**With middleware**:

- Is it the CORS middleware?
- Did authentication fail?
- Did body parsing throw?
- Which middleware runs in which order?
- Are there global error handlers?

### 3. **No Hidden Side Effects**

Middleware often modifies the request object globally:

```javascript
// Express middleware adds properties
app.use((req, res, next) => {
  req.user = { id: 123 };  // Where does this come from?
  next();
});

app.post('/api/data', (req, res) => {
  console.log(req.user);   // How do we know this exists?
});
```

This makes the code harder to test and reason about.

In our explicit approach:

```javascript
export async function handleDataPost(req, res) {
  const user = authenticateRequest(req);  // <- Clear where it comes from
  // ...
}
```

### 4. **Smaller Learning Curve**

Understanding middleware stacks requires learning:

- How middleware chains work (`next()`, `return`, etc.)
- Execution order and when it matters
- Framework-specific concepts (`res.locals`, `req.app`, etc.)

Our approach only requires understanding:

- HTTP basics (method, URL, headers, body)
- JavaScript async/await
- How to parse and validate data

### 5. **Less Magic**

Frameworks with middleware often do things "behind the scenes":

- Automatic JSON parsing
- Built-in error handling
- Request timeouts
- Rate limiting
- Logging

**Problem**: When something doesn't work as expected, the magic is hard to debug.

**Our approach**: We see every line of code that runs.

## When Middleware Makes Sense

As the project grows, middleware might become useful:

1. **Many routes need the same preprocessing**
   - Auth check on 20 different endpoints
   - Logging across all requests
   - CORS headers on all API responses

2. **Complex cross-cutting concerns**
   - Session management
   - Rate limiting
   - Request validation on all endpoints

3. **Need for ecosystem plugins**
   - OAuth providers
   - WebSocket upgrades
   - Request compression

## Our Approach: Explicit Handler Composition

Instead of middleware, we compose handlers explicitly:

```javascript
// Each endpoint handler explicitly calls what it needs
export async function handleDataPost(req, res) {
  // 1. Parse body
  const body = await readJsonBody(req);

  // 2. Validate
  const validation = validateDataPayload(body);
  if (!validation.ok) {
    sendJson(res, 400, { error: validation.error });
    return;
  }

  // 3. Process
  const result = processData(body);

  // 4. Respond
  sendJson(res, 200, result);
}
```

**Benefits**:

- ✅ Clear what each endpoint does
- ✅ Easy to test (no framework magic)
- ✅ No surprises from global middleware
- ✅ Reuse through functions, not framework hooks
- ✅ Scales to small projects without overhead

**Trade-off**:

- ❌ Code repetition if many endpoints need the same logic
- ❌ Need to manually handle cross-cutting concerns

## Future: Middleware Without a Framework

If middleware becomes necessary, we can add it explicitly:

```javascript
// In main handler (before route dispatch)
export async function handleApi(req, res) {
  // Explicit middleware chain
  await corsMiddleware(req, res);
  await loggingMiddleware(req, res);

  // Then route to handler
  const routeKey = `${req.method} ${pathname}`;
  const handler = routeHandlers[routeKey];
  await handler(req, res);
}
```

This keeps things explicit while reducing repetition.

## Summary

We avoid middleware stacks because:

1. They hide control flow
2. They introduce framework-specific concepts
3. They complicate debugging
4. This project prioritizes **learning and clarity** over DRY at the expense of simplicity

If/when the codebase grows complex, we can add explicit middleware composition without adopting an entire framework.
