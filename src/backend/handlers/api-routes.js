/**
 * Route handlers for API endpoints
 */
import { sendJson } from "../utils/json.js";
import { handleDataGet, handleDataPost } from "./data.js";
import { handleHealthGet } from "./health.js";

/**
 * Route table mapping (method, path) to handler functions
 * Structure: { "METHOD /path": handler }
 */
const routeHandlers = {
  "GET /api/health": handleHealthGet,
  "GET /api/data": handleDataGet,
  "POST /api/data": handleDataPost,
};

/**
 * Route and handle API requests
 * @param {http.IncomingMessage} req - The request object
 * @param {http.BackendResponse} res - The response object
 */
export async function handleApi(req, res) {
  const { pathname } = new URL(req.url, "http://localhost");
  const routeKey = `${req.method} ${pathname}`;
  const handler = routeHandlers[routeKey];

  if (!handler) {
    sendJson(res, 404, { error: "not found", code: "NOT_FOUND" });
    return;
  }

  await handler(req, res);
}
