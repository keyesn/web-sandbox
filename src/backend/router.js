import { readFile } from "fs/promises";
import path from "path";
import { CACHE_STRATEGY } from "./config.js";
import { handleApi } from "./handlers/api-routes.js";
import { getPageConfig } from "./utils/pages.js";
import { renderTemplate } from "./utils/template.js";

const frontendDir = path.resolve("src/frontend");

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
    const pageConfig = getPageConfig(pathname);

    if (pageConfig) {
      // Render page using template system
      const layout = await readFile("src/views/layout.html", "utf-8");
      const content = await readFile(pageConfig.contentFile, "utf-8");

      const html = renderTemplate(layout, {
        PAGE_TITLE: pageConfig.title,
        PAGE_SUBTITLE: pageConfig.subtitle,
        PAGE_STYLESHEETS: pageConfig.stylesheets,
        PAGE_CONTENT: content,
        PAGE_SCRIPTS: pageConfig.scripts,
      });

      const cacheControl = CACHE_STRATEGY === "dev" ? "no-store" : "no-cache, must-revalidate";
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8", "Cache-Control": cacheControl });
      res.end(html);
      return;
    }

    // Fall back to static file serving for assets (CSS, JS, images, etc.)
    // Convert URL path to file path: "/" -> "index.html", "/api" -> "api"
    const relativePath = pathname === "/" ? "index.html" : pathname.slice(1);
    const decodedPath = decodeURIComponent(relativePath);
    const normalized = path.normalize(decodedPath).replace(/^([.][.][/\\])+/, "");
    let absolutePath = path.resolve(frontendDir, normalized);

    // Security check: prevent directory traversal
    if (!absolutePath.startsWith(frontendDir)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end("Bad Request");
      return;
    }

    // Try to read the file as-is first
    let data;
    let finalPath = absolutePath;

    try {
      data = await readFile(absolutePath);
    } catch (firstErr) {
      // If file not found and no extension, try appending .html
      if (firstErr?.code === "ENOENT" && !path.extname(absolutePath)) {
        finalPath = absolutePath + ".html";

        // Security check after adding .html extension
        if (!finalPath.startsWith(frontendDir)) {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end("Bad Request");
          return;
        }

        data = await readFile(finalPath); // Let this throw if still not found
      } else {
        throw firstErr; // Re-throw if it's not ENOENT or already has extension
      }
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
