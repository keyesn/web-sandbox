const button = document.querySelector("[data-click-counter]");
const countLabel = document.querySelector("[data-click-count]");

if (button && countLabel) {
  let clicks = 0;
  button.addEventListener("click", () => {
    clicks += 1;
    const suffix = clicks === 1 ? "time" : "times";
    countLabel.textContent = `Clicked ${clicks} ${suffix}`;
  });
}
