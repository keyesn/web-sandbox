/**
 * Buttons UI Library Page
 * ------------------------
 * Showcase various button styles and states
 */

const showcase = document.querySelector("#component-showcase");

/**
 * Create a component section
 */
function createSection(title, description) {
  const section = document.createElement("section");
  section.className = "component-section";

  const heading = document.createElement("h2");
  heading.textContent = title;
  section.appendChild(heading);

  if (description) {
    const desc = document.createElement("p");
    desc.className = "section-description";
    desc.textContent = description;
    section.appendChild(desc);
  }

  const container = document.createElement("div");
  container.className = "component-showcase";
  section.appendChild(container);

  showcase.appendChild(section);
  return container;
}

// Primary and Secondary Buttons
const basicButtons = createSection("Basic Buttons", "Primary and secondary button styles");

const primaryBtn = document.createElement("button");
primaryBtn.className = "btn btn-primary";
primaryBtn.textContent = "Primary Button";
basicButtons.appendChild(primaryBtn);

const secondaryBtn = document.createElement("button");
secondaryBtn.className = "btn btn-secondary";
secondaryBtn.textContent = "Secondary Button";
basicButtons.appendChild(secondaryBtn);

const expandOneBtn = document.createElement("button");
expandOneBtn.className = "btn btn-expand-one";
expandOneBtn.textContent = "Expand One Button";
basicButtons.appendChild(expandOneBtn);

// Button States
const stateButtons = createSection("Button States", "Disabled and active states");

const disabledBtn = document.createElement("button");
disabledBtn.className = "btn btn-primary";
disabledBtn.textContent = "Disabled Button";
disabledBtn.disabled = true;
stateButtons.appendChild(disabledBtn);

const loadingBtn = document.createElement("button");
loadingBtn.className = "btn btn-primary";
loadingBtn.textContent = "Loading...";
loadingBtn.disabled = true;
stateButtons.appendChild(loadingBtn);

// Interactive Example
const interactiveSection = createSection("Interactive Example", "Click to see button behavior");

const clickableBtn = document.createElement("button");
clickableBtn.className = "btn btn-primary";
clickableBtn.textContent = "Click Me!";
let clickCount = 0;
clickableBtn.addEventListener("click", () => {
  clickCount++;
  clickableBtn.textContent = `Clicked ${clickCount} time${clickCount === 1 ? "" : "s"}`;
});
interactiveSection.appendChild(clickableBtn);
