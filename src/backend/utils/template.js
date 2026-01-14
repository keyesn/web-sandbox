/**
 * Template rendering utility
 * Replaces placeholders in a template string with actual values
 */

/**
 * Render a template by replacing placeholders
 * @param {string} template - The template HTML with {{PLACEHOLDER}} markers
 * @param {object} data - Key-value pairs where keys match placeholder names
 * @returns {string} The rendered HTML
 */
export function renderTemplate(template, data) {
  let html = template;

  for (const [key, value] of Object.entries(data)) {
    const placeholder = `{{${key}}}`;
    html = html.replaceAll(placeholder, value || "");
  }

  return html;
}
