/**
 * Fetch the backend health status from the /api/health endpoint
 * @returns {Promise<object>} Backend health response object
 */
export async function getHealth() {
  const res = await fetch("/api/health");
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}

/**
 * Fetch some data from the /api/data endpoint
 * @returns {Promise<object>} Data response object
 */
export async function getData() {
  const res = await fetch("/api/data");
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}

/**
 * Post data to the /api/data endpoint. Body operations:
 *   - Parsing
 *   - Validation
 * @param {object} payload - Data to send in the POST request body
 * @returns {Promise<object>} Response object from the backend
 */
export async function postData(payload) {
  const res = await fetch("/api/data", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`Backend error: ${res.status}`);
  return res.json();
}
