/**
 * Footer Component
 *
 * Features:
 * - Permanent footer with current year display
 * - User-facing error display with retry mechanism
 *
 * Usage:
 *   import { loadFooter } from './footer.js';
 *   await loadFooter('#footer');
 */

import { showError } from "../../shared/error-display.js";

/**
 * Load footer HTML and initialize functionality
 * @param {string} containerSelector - CSS selector for the container element
 */
export async function loadFooter(containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    showError(`Footer container "${containerSelector}" not found`, () => loadFooter(containerSelector));
    return;
  }

  try {
    // Fetch footer HTML
    const response = await fetch("/components/footer/footer.html");

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const html = await response.text();
    container.innerHTML = html;

    // Initialize footer functionality after HTML is loaded
    initFooter();
  } catch (error) {
    showError(`Footer failed to load: ${error.message}`, () => loadFooter(containerSelector));
  }
}

/**
 * Initializes footer event handlers
 * Should be called after footer HTML is inserted into the DOM
 */
function initFooter() {
  document.querySelector(".year").textContent = new Date().getFullYear();
}
