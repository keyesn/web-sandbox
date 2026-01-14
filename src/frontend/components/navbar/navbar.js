/**
 * Navbar module - Navigation bar component with mobile toggle
 *
 * Features:
 * - Loads navbar HTML from external file
 * - Mobile menu toggle (hamburger button)
 * - Auto-close menu on link selection
 * - User-facing error display with retry mechanism
 * - Accepts page state (currentPath) for active link styling
 *
 * Usage:
 *   import { loadNavbar } from './navbar.js';
 *   const state = { currentPath: window.location.pathname };
 *   await loadNavbar('#navbar-container', state);
 */

import { showError } from "../../shared/error-display.js";

/**
 * Load navbar HTML and initialize functionality
 * @param {string} containerSelector - CSS selector for the container element
 * @param {Object} state - Page state object containing currentPath
 * @param {string} state.currentPath - Current page path for active link highlighting
 */
export async function loadNavbar(containerSelector, state = {}) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    showError(`Navbar container "${containerSelector}" not found`, () => loadNavbar(containerSelector, state));
    return;
  }

  try {
    // Fetch navbar HTML
    const response = await fetch("/components/navbar/navbar.html");

    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }

    const html = await response.text();
    container.innerHTML = html;

    // Initialize navbar functionality after HTML is loaded
    initNavbar(state);
  } catch (error) {
    showError(`Navbar failed to load: ${error.message}`, () => loadNavbar(containerSelector, state));
  }
}

/**
 * Initialize navbar event handlers
 * Should be called after navbar HTML is inserted into the DOM
 * @param {Object} state - Page state object
 * @param {string} state.currentPath - Current page path for active link highlighting
 */
function initNavbar(state = {}) {
  const toggleButton = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const links = document.querySelectorAll(".nav-links a");
  const themeToggle = document.querySelector("#theme-toggle");

  if (!navLinks) {
    console.error("Navbar elements not found");
    return;
  }

  // Toggle mobile menu visibility (if hamburger exists)
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      navLinks.classList.toggle("show");
    });
  }

  // Set active link based on currentPath from page state
  // Page owns this state; navbar just displays it
  if (state.currentPath) {
    setActiveLink(links, state.currentPath);
  }

  // Close mobile menu when link is clicked
  links.forEach(link => {
    link.addEventListener("click", () => {
      // Close mobile menu
      navLinks.classList.remove("show");
    });
  });

  // Initialize dark mode toggle
  if (themeToggle) {
    initThemeToggle(themeToggle);
  }
}

/**
 * Set active link styling based on current path
 * Extracted function to make state dependency explicit
 * @param {NodeList} links - Navbar link elements
 * @param {string} currentPath - Current page path
 */
function setActiveLink(links, currentPath) {
  links.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * Initialize theme toggle functionality
 * Persists theme preference in localStorage
 * @param {HTMLElement} button - The theme toggle button
 */
function initThemeToggle(button) {
  // Check for saved theme preference or default to light mode
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  updateThemeButton(button, savedTheme);

  // Handle toggle click
  button.addEventListener("click", () => {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "light" ? "dark" : "light";

    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
    updateThemeButton(button, newTheme);
  });
}

/**
 * Update theme toggle button appearance
 * @param {HTMLElement} button - The theme toggle button
 * @param {string} theme - Current theme ("light" or "dark")
 */
function updateThemeButton(button, theme) {
  const icon = button.querySelector("#theme-icon");
  if (icon) {
    const iconSrc = theme === "light" ? "/assets/light-mode.svg" : "/assets/night-mode.svg";
    icon.src = iconSrc;
  }
  button.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
}
