/**
 * Footer Component
 *
 * Features:
 * - Permanent footer with current year display
 *
 * Usage:
 *   import { loadFooter } from './footer.js';
 *   await loadFooter('#footer');
 */

/**
 * Load footer HTML and initialize functionality
 * @param {string} containerSelector - CSS selector for the container element
 */
export async function loadFooter(containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.error(`Footer container "${containerSelector}" not found`);
    return;
  }

  try {
    // Fetch footer HTML
    const response = await fetch("/components/footer/footer.html");

    if (!response.ok) {
      throw new Error(`Failed to load footer: ${response.status}`);
    }

    const html = await response.text();
    container.innerHTML = html;

    // Initialize navbar functionality after HTML is loaded
    initFooter();
  } catch (error) {
    console.error("Error loading navbar:", error);
  }
}

/**
 * Initializes footer event handlers
 * Should be called after footer HTML is inserted into the DOM
 */
function initFooter() {
  document.querySelector(".year").textContent = new Date().getFullYear();
}
