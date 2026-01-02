/**
 * Load and initialize individual components
 * Shows user-facing errors if components fail to load
 *
 * Page-owned state pattern:
 * - This page script owns the application state (currentPath, etc.)
 * - Components receive state as parameters
 * - Makes data flow explicit: state flows down from page to components
 */

import { loadFooter } from "../components/footer/footer.js";
import { loadNavbar } from "../components/navbar/navbar.js";
import { clearErrors } from "../shared/error-display.js";

// Clear any previous errors before loading components
clearErrors();

// Page owns state - current path determines which nav link is active
const pageState = {
  currentPath: window.location.pathname,
};

// Pass state to components so they know how to render
// Navbar needs currentPath to highlight the active link
await loadNavbar("#navbar", pageState);
await loadFooter("#footer");
