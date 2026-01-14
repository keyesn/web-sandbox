/**
 * GET /api/health - Health check endpoint
 */
import { sendJson } from "../utils/json.js";

export async function handleHealthGet(req, res) {
  sendJson(res, 200, { status: "ok" });
}
