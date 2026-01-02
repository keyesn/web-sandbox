// Centralized server configuration

// Set CACHE_STRATEGY=prod to enable short-lived caching in production; default "dev" disables caching for HTML/JS/CSS.
export const CACHE_STRATEGY = process.env.CACHE_STRATEGY || "dev";
