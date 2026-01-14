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
    subtitle: "Test the backend health check endpoint:",
    contentFile: "src/views/pages/api-demo.html",
    stylesheets: '<link rel="stylesheet" href="/css/api-demo.css" />',
    scripts: '<script type="module" src="/js/api-demo.js"></script>',
  },
  "/ui-library": {
    title: "UI Library",
    subtitle: "A collection of reusable UI components for testing and reference",
    contentFile: "src/views/pages/ui-library.html",
    stylesheets:
      '<link rel="stylesheet" href="/css/ui-library.css" /><link rel="stylesheet" href="/css/components/forms.css" /><link rel="stylesheet" href="/css/components/cards.css" />',
    scripts: '<script type="module" src="/js/ui-library.js"></script>',
  },
  "/ui-library/buttons": {
    title: "Buttons",
    subtitle: "Various button styles and states",
    contentFile: "src/views/pages/ui-library/buttons.html",
    stylesheets: '<link rel="stylesheet" href="/css/ui-library.css" />',
    scripts: '<script type="module" src="/js/ui-library/buttons.js"></script>',
  },
  "/ui-library/forms": {
    title: "Form Elements",
    subtitle: "Input fields and form controls",
    contentFile: "src/views/pages/ui-library/forms.html",
    stylesheets: '<link rel="stylesheet" href="/css/ui-library.css" /><link rel="stylesheet" href="/css/components/forms.css" />',
    scripts: '<script type="module" src="/js/ui-library/forms.js"></script>',
  },
  "/ui-library/cards": {
    title: "Cards",
    subtitle: "Content containers with borders and shadows",
    contentFile: "src/views/pages/ui-library/cards.html",
    stylesheets: '<link rel="stylesheet" href="/css/ui-library.css" /><link rel="stylesheet" href="/css/components/cards.css" />',
    scripts: '<script type="module" src="/js/ui-library/cards.js"></script>',
  },
  "/style-showcase": {
    title: "Style Showcase",
    subtitle: "A visual guide to the theme-dark colors, spacing scale, and design system",
    contentFile: "src/views/pages/style-showcase.html",
    stylesheets: '<link rel="stylesheet" href="/css/style-showcase.css" />',
    scripts: "",
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
