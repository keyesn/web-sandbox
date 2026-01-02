/**
 * Load and initialize individual components
 */

import { loadFooter } from "../components/footer/footer.js";
import { loadNavbar } from "../components/navbar/navbar.js";

await loadNavbar("#navbar");
await loadFooter("#footer");
