# Error Boundaries Implementation

Error boundaries are a pattern for gracefully handling component failures and displaying them to users instead of silently failing in the console.

## How It Works

1. **Error Display Zone** - HTML includes `<div id="app-errors"></div>` at the top of the page
2. **Error Display Utility** - `shared/error-display.js` provides functions to show errors to users
3. **Component Error Handling** - Components (navbar, footer) catch errors and call `showError()` instead of console.error
4. **Retry Mechanism** - Each error has a "Retry" button that re-attempts the failed operation

## Files Modified

- **src/frontend/index.html** - Added error zone div
- **src/frontend/api.html** - Added error zone div
- **src/frontend/shared/error-display.js** - New utility module
- **src/frontend/shared/styles.css** - Added error message styling
- **src/frontend/components/navbar/navbar.js** - Updated to show user-facing errors
- **src/frontend/components/footer/footer.js** - Updated to show user-facing errors
- **src/frontend/js/main.js** - Added clearErrors call
- **src/frontend/js/api-page.js** - Added clearErrors call

## What This Teaches

**Error Visibility**: Errors are no longer hidden in the console. Users can see what went wrong.

**Graceful Degradation**: When a component fails, the page doesn't crash. Other components continue to load.

**Recovery**: Users can retry failed operations without refreshing the page.

**Explicit Error Handling**: All error flow is visible in the code—no hidden error boundaries or framework magic.

## Usage Example

```javascript
import { showError } from '../shared/error-display.js';

try {
  const data = await fetch('/api/data');
  if (!data.ok) throw new Error('Failed to fetch');
  // ... do something
} catch (error) {
  // Show error to user with retry callback
  showError(
    `Failed to load data: ${error.message}`,
    () => loadData()  // Function to retry
  );
}
```

## Testing Error Scenarios

To test the error boundary in action:

1. **Component file not found**: In the browser DevTools Network tab, block requests to `/components/navbar/navbar.html` and reload. You'll see an error appear with a Retry button.

2. **Container not found**: Modify the container selector (e.g., `loadNavbar("#not-navbar")`) to see the container not found error.

3. **Click Retry**: After an error appears, clicking "Retry" will re-attempt the operation.

This pattern can be extended to any async operation that should display errors to users.
