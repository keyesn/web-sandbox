/**
 * Page metadata and configuration
 * Maps routes to page configurations
 */

export const pages = {
  "/": {
    title: "Home",
    subtitle: "A learning-first web application",
    contentFile: "src/views/pages/home.html",
    stylesheets: "",
    scripts: "",
  },
  "/api-demo": {
    title: "API Demo",
    subtitle: "Test the server health check endpoint:",
    contentFile: "src/views/pages/api-demo.html",
    stylesheets: '<link rel="stylesheet" href="/css/api-demo.css" />',
    scripts: '<script type="module" src="/js/api-demo.js"></script>',
  },
  "/ui-library": {
    title: "UI Library",
    subtitle: "A collection of reusable UI components for testing and reference",
    contentFile: "src/views/pages/ui-library.html",
    stylesheets: '<link rel="stylesheet" href="/css/ui-library.css" />',
    scripts: '<script type="module" src="/js/ui-library.js"></script>',
  },
};

/**
 * Get page configuration for a given path
 * @param {string} pathname - The request path
 * @returns {object|null} Page config or null if not found
 */
export function getPageConfig(pathname) {
  return pages[pathname] || null;
}
