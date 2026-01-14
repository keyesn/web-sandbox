import { readFile } from "fs/promises";
import path from "path";
import { CACHE_STRATEGY } from "./config.js";
import { handleApi } from "./handlers/api-routes.js";
import { getPageConfig } from "./utils/pages.js";

const frontendDir = path.resolve("src/frontend");
const distDir = path.resolve("dist");

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
};

/**
 * Determine cache control header based on file type
 * @param {string} ext - File extension (e.g., ".html", ".css")
 * @returns {string} Cache-Control header value
 */
function getCacheControl(ext) {
  // Development: fully disable caching for HTML/JS/CSS so edits appear immediately.
  if (CACHE_STRATEGY === "dev") {
    if (ext === ".html" || ext === ".js" || ext === ".css") {
      return "no-store";
    }
    return "frontend, max-age=300";
  }

  // Production (CACHE_STRATEGY=prod): keep HTML revalidated, cache static assets briefly.
  if (ext === ".html") {
    return "no-cache, must-revalidate";
  }
  if (ext === ".js" || ext === ".css") {
    return "frontend, max-age=300";
  }

  return "frontend, max-age=300";
}

/**
 * Main request router - directs API requests to handlers and serves static files
 * @param {http.IncomingMessage} req - The request object
 * @param {http.BackendResponse} res - The response object
 */
export async function router(req, res) {
  const { pathname } = new URL(req.url, "http://localhost");

  if (pathname.startsWith("/api/")) {
    return handleApi(req, res);
  }

  try {
    // Check if this is a known page route
    const pageFile = getPageConfig(pathname);

    if (pageFile) {
      // Serve complete HTML page directly (no template rendering needed)
      const html = await readFile(pageFile, "utf-8");

      const cacheControl = CACHE_STRATEGY === "dev" ? "no-store" : "no-cache, must-revalidate";
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": cacheControl });
      res.end(html);
      return;
    }

    // Fall back to static file serving for assets (CSS, JS, images, etc.)
    // Check dist folder first (for built/bundled files), then frontend folder
    let searchPaths = [];

    if (pathname.startsWith("/dist/")) {
      // Serve from dist folder
      searchPaths.push({
        dir: distDir,
        relativePath: pathname.slice(6), // Remove "/dist/" prefix
      });
    } else {
      // Serve from frontend folder
      searchPaths.push({
        dir: frontendDir,
        relativePath: pathname === "/" ? "index.html" : pathname.slice(1),
      });
    }

    let data;
    let finalPath;

    for (const { dir, relativePath } of searchPaths) {
      const decodedPath = decodeURIComponent(relativePath);
      const normalized = path.normalize(decodedPath).replace(/^([.][.][/\\])+/, "");
      let absolutePath = path.resolve(dir, normalized);

      // Security check: prevent directory traversal
      if (!absolutePath.startsWith(dir)) {
        continue;
      }

      try {
        data = await readFile(absolutePath);
        finalPath = absolutePath;
        break;
      } catch (err) {
        if (err?.code === "ENOENT") {
          // If file not found and no extension, try appending .html
          if (!path.extname(absolutePath)) {
            const htmlPath = absolutePath + ".html";
            if (htmlPath.startsWith(dir)) {
              try {
                data = await readFile(htmlPath);
                finalPath = htmlPath;
                break;
              } catch {
                // Continue to next search path
              }
            }
          }
        }
      }
    }

    if (!data) {
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("Not Found");
      return;
    }

    const ext = path.extname(finalPath).toLowerCase();
    const type = mimeTypes[ext] || "application/octet-stream";
    const cacheControl = getCacheControl(ext);

    res.writeHead(200, { "Content-Type": type, "Cache-Control": cacheControl });
    res.end(data);
  } catch (err) {
    // Only log unexpected errors; ENOENT (404) is normal
    if (err?.code !== "ENOENT") {
      console.error("Static serve error:", err?.message || err);
    }
    console.error(`404 for ${pathname}:`, err?.message);
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
}
