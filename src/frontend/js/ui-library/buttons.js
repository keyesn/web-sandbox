/**
 * UI Library - Buttons Showcase
 * Interactive behavior for demo components
 */

// Click counter behavior for interactive example
const clickCounterBtn = document.querySelector("[data-click-counter]");
const clickCountDisplay = document.querySelector("[data-click-count]");

if (clickCounterBtn && clickCountDisplay) {
  let count = 0;
  clickCounterBtn.addEventListener("click", () => {
    count++;
    clickCountDisplay.textContent = `Clicked ${count} times`;
  });
}
