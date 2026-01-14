/**
 * Send a JSON response with the specified status code
 * @param {http.BackendResponse} res - The response object
 * @param {number} status - HTTP status code (e.g., 200, 404)
 * @param {object} body - Object to serialize as JSON
 */
export function sendJson(res, status, body) {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

/**
 * Read and parse JSON body from request
 * @param {http.IncomingMessage} req
 * @returns {Promise<any>} Parsed JSON body
 */
export function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let data = "";

    req.on("data", chunk => {
      data += chunk;
    });

    req.on("end", () => {
      try {
        const parsed = data ? JSON.parse(data) : {};
        resolve(parsed);
      } catch (err) {
        reject(new Error("Invalid JSON"));
      }
    });

    req.on("error", err => reject(err));
  });
}
