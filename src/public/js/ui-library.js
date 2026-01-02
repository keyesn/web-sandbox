/**
 * UI Library
 * ----------
 * Showcase page for testing UI components and patterns
 */
// Container for all component showcases
const container = document.querySelector("#design-components");

/**
 * Create a component showcase section
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

  const showcase = document.createElement("div");
  showcase.className = "component-showcase";
  section.appendChild(showcase);

  container.appendChild(section);
  return showcase;
}

// Buttons Section
const buttonShowcase = createSection("Buttons", "Various button styles and states");

const primaryBtn = document.createElement("button");
primaryBtn.className = "btn btn-primary";
primaryBtn.textContent = "Primary Button";
buttonShowcase.appendChild(primaryBtn);

const secondaryBtn = document.createElement("button");
secondaryBtn.className = "btn btn-secondary";
secondaryBtn.textContent = "Secondary Button";
buttonShowcase.appendChild(secondaryBtn);

const disabledBtn = document.createElement("button");
disabledBtn.className = "btn btn-primary";
disabledBtn.textContent = "Disabled Button";
disabledBtn.disabled = true;
buttonShowcase.appendChild(disabledBtn);

// Form Elements Section
const formShowcase = createSection("Form Elements", "Input fields and form controls");

const inputWrapper = document.createElement("div");
inputWrapper.className = "form-group";

const label = document.createElement("label");
label.textContent = "Text Input";
label.htmlFor = "demo-input";
inputWrapper.appendChild(label);

const input = document.createElement("input");
input.type = "text";
input.id = "demo-input";
input.placeholder = "Enter text here...";
inputWrapper.appendChild(input);

formShowcase.appendChild(inputWrapper);

// Cards Section
const cardShowcase = createSection("Cards", "Content containers with borders and shadows");

const card = document.createElement("div");
card.className = "card";

const cardTitle = document.createElement("h3");
cardTitle.textContent = "Card Title";
card.appendChild(cardTitle);

const cardContent = document.createElement("p");
cardContent.textContent = "This is a card component. Cards are useful for grouping related content.";
card.appendChild(cardContent);

const cardButton = document.createElement("button");
cardButton.className = "btn btn-secondary";
cardButton.textContent = "Card Action";
card.appendChild(cardButton);

cardShowcase.appendChild(card);
