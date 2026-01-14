import http from "http";
import { router } from "./router.js";

const PORT = 3000;

const backend = http.createBackend((req, res) => {
  router(req, res);
});

backend.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
