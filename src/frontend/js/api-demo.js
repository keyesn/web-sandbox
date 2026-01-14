import { getData, getHealth, postData } from "./utils/api-client.js";

/* -------- Health Button -------- */
const btnHealth = document.querySelector("#btnHealth");
const outputHealth = document.querySelector("#outputHealth");

btnHealth.addEventListener("click", async () => {
  const data = await getHealth();
  outputHealth.textContent = JSON.stringify(data, null, 2);
});

/* -------- Data Button -------- */
const btnData = document.querySelector("#btnData");
const outputData = document.querySelector("#outputData");

btnData.addEventListener("click", async () => {
  const data = await getData();
  outputData.textContent = JSON.stringify(data, null, 2);
});

/* -------- Post Button -------- */
const btnPost = document.querySelector("#btnPost");
const outputPost = document.querySelector("#outputPost");

btnPost.addEventListener("click", async () => {
  const payload = { message: "Hello, backend!" };
  const data = await postData(payload);
  outputPost.textContent = JSON.stringify(data, null, 2);
});
