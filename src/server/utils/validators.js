/**
 * Validate POST /api/data payload shape.
 * Requires: { message: string } with trimmed length 1..200.
 * @param {unknown} body
 * @returns {{ ok: boolean, error?: string }}
 */
export function validateDataPayload(body) {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Body must be a JSON object" };
  }

  const { message } = body;
  if (typeof message !== "string") {
    return { ok: false, error: "'message' must be a string" };
  }

  const trimmed = message.trim();
  if (trimmed.length === 0) {
    return { ok: false, error: "'message' cannot be empty" };
  }
  if (trimmed.length > 200) {
    return { ok: false, error: "'message' must be at most 200 characters" };
  }

  return { ok: true };
}
