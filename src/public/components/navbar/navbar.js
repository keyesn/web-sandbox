/**
 * Navbar module - Self-contained navigation bar with mobile toggle
 *
 * Features:
 * - Loads navbar HTML from external file
 * - Mobile menu toggle (hamburger button)
 * - Active link tracking
 * - Auto-close menu on link selection
 *
 * Usage:
 *   import { loadNavbar } from './navbar.js';
 *   await loadNavbar('#navbar-container');
 */

/**
 * Load navbar HTML and initialize functionality
 * @param {string} containerSelector - CSS selector for the container element
 */
export async function loadNavbar(containerSelector) {
  const container = document.querySelector(containerSelector);

  if (!container) {
    console.error(`Navbar container "${containerSelector}" not found`);
    return;
  }

  try {
    // Fetch navbar HTML
    const response = await fetch("/components/navbar/navbar.html");

    if (!response.ok) {
      throw new Error(`Failed to load navbar: ${response.status}`);
    }

    const html = await response.text();
    container.innerHTML = html;

    // Initialize navbar functionality after HTML is loaded
    initNavbar();
  } catch (error) {
    console.error("Error loading navbar:", error);
  }
}

/**
 * Initialize navbar event handlers
 * Should be called after navbar HTML is inserted into the DOM
 */
function initNavbar() {
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

  // Set active link based on current page
  const currentPath = window.location.pathname;
  links.forEach(link => {
    const linkPath = new URL(link.href).pathname;
    if (linkPath === currentPath) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

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
  button.textContent = theme === "light" ? "☀️" : "🌙";
  button.setAttribute("aria-label", theme === "light" ? "Switch to dark mode" : "Switch to light mode");
}
