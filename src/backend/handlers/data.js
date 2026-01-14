/**
 * Handlers for /api/data endpoints
 */
import { readJsonBody, sendJson } from "../utils/json.js";
import { validateDataPayload } from "../utils/validators.js";

/**
 * GET /api/data - Retrieve sample data
 */
export async function handleDataGet(req, res) {
  sendJson(res, 200, { data: [1, 2, 3, 4, 5] });
}

/**
 * POST /api/data - Create/store data
 */
export async function handleDataPost(req, res) {
  try {
    const body = await readJsonBody(req);
    const validation = validateDataPayload(body);

    if (!validation.ok) {
      sendJson(res, 400, { error: validation.error });
      return;
    }

    sendJson(res, 200, { received: { message: body.message.trim() } });
  } catch (err) {
    sendJson(res, 400, { error: err?.message || "Invalid request" });
  }
}
