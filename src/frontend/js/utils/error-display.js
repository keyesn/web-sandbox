/**
 * Error Display Utility
 *
 * Provides functions to show and hide error messages to users.
 * Keeps errors visible and actionable without using console.
 *
 * Usage:
 *   import { showError, clearErrors } from './utils/error-display.js';
 *   showError('Navbar failed to load', () => loadNavbar('#navbar'));
 */

/**
 * Display an error message with optional retry button
 * @param {string} errorMessage - User-facing error message
 * @param {Function} onRetry - Callback function when user clicks retry
 * @param {string} errorZoneId - ID of error display container (default: 'app-errors')
 */
export function showError(errorMessage, onRetry, errorZoneId = "app-errors") {
  const errorZone = document.querySelector(`#${errorZoneId}`);

  if (!errorZone) {
    // Fallback: if error zone doesn't exist, log to console
    console.error("Error zone not found, logging to console:", errorMessage);
    return;
  }

  // Create error element
  const errorEl = document.createElement("div");
  errorEl.className = "error-message";
  errorEl.role = "alert";

  // Error text
  const errorText = document.createElement("p");
  errorText.textContent = errorMessage;
  errorEl.appendChild(errorText);

  // Retry button (if callback provided)
  if (onRetry && typeof onRetry === "function") {
    const retryBtn = document.createElement("button");
    retryBtn.textContent = "Retry";
    retryBtn.className = "error-retry-btn";
    retryBtn.addEventListener("click", async () => {
      // Remove this error message
      errorEl.remove();
      // Attempt retry
      try {
        await onRetry();
      } catch (err) {
        // If retry fails, show error again
        showError(`Retry failed: ${err.message}`, onRetry, errorZoneId);
      }
    });
    errorEl.appendChild(retryBtn);
  }

  // Add to error zone
  errorZone.appendChild(errorEl);
}

/**
 * Clear all error messages from the error zone
 * @param {string} errorZoneId - ID of error display container (default: 'app-errors')
 */
export function clearErrors(errorZoneId = "app-errors") {
  const errorZone = document.querySelector(`#${errorZoneId}`);
  if (errorZone) {
    errorZone.innerHTML = "";
  }
}
