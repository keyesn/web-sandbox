/**
 * Page metadata and configuration
 * Maps routes to page files in src/frontend/pages/
 * Each page is a complete HTML document (no template fragments)
 */

export const pages = {
  "/": "src/frontend/pages/index.html",
  "/api-demo": "src/frontend/pages/api-demo.html",
  "/ui-library": "src/frontend/pages/ui-library.html",
  "/ui-library/buttons": "src/frontend/pages/ui-library/buttons.html",
  "/ui-library/forms": "src/frontend/pages/ui-library/forms.html",
  "/ui-library/cards": "src/frontend/pages/ui-library/cards.html",
  "/style-showcase": "src/frontend/pages/style-showcase.html",
};

/**
 * Get page file path for a given route
 * @param {string} pathname - The request path
 * @returns {string|null} Path to the HTML page file or null if not found
 */
export function getPageConfig(pathname) {
  return pages[pathname] || null;
}
