/**
 * Forms UI Library Page
 * ----------------------
 * Showcase form elements and controls
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

// Text Inputs
const inputSection = createSection("Text Inputs", "Various input field styles");

const textGroup = document.createElement("div");
textGroup.className = "form-group";

const textLabel = document.createElement("label");
textLabel.textContent = "Text Input";
textLabel.htmlFor = "demo-text";
textGroup.appendChild(textLabel);

const textInput = document.createElement("input");
textInput.type = "text";
textInput.id = "demo-text";
textInput.placeholder = "Enter text here...";
textGroup.appendChild(textInput);

inputSection.appendChild(textGroup);

// Email Input
const emailGroup = document.createElement("div");
emailGroup.className = "form-group";

const emailLabel = document.createElement("label");
emailLabel.textContent = "Email Input";
emailLabel.htmlFor = "demo-email";
emailGroup.appendChild(emailLabel);

const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.id = "demo-email";
emailInput.placeholder = "name@example.com";
emailGroup.appendChild(emailInput);

inputSection.appendChild(emailGroup);

// Text Area
const textareaSection = createSection("Text Area", "Multi-line text input");

const textareaGroup = document.createElement("div");
textareaGroup.className = "form-group";

const textareaLabel = document.createElement("label");
textareaLabel.textContent = "Message";
textareaLabel.htmlFor = "demo-textarea";
textareaGroup.appendChild(textareaLabel);

const textarea = document.createElement("textarea");
textarea.id = "demo-textarea";
textarea.rows = 4;
textarea.placeholder = "Enter your message...";
textareaGroup.appendChild(textarea);

textareaSection.appendChild(textareaGroup);

// Checkboxes and Radio Buttons
const selectionSection = createSection("Selection Controls", "Checkboxes and radio buttons");

const checkboxGroup = document.createElement("div");
checkboxGroup.className = "form-group";

const checkbox = document.createElement("input");
checkbox.type = "checkbox";
checkbox.id = "demo-checkbox";
checkboxGroup.appendChild(checkbox);

const checkboxLabel = document.createElement("label");
checkboxLabel.textContent = "I agree to the terms";
checkboxLabel.htmlFor = "demo-checkbox";
checkboxGroup.appendChild(checkboxLabel);

selectionSection.appendChild(checkboxGroup);

// Radio Group
const radioGroup = document.createElement("div");
radioGroup.className = "form-group";

const radioLabel = document.createElement("label");
radioLabel.textContent = "Choose an option:";
radioGroup.appendChild(radioLabel);

["Option 1", "Option 2", "Option 3"].forEach((option, index) => {
  const radioWrapper = document.createElement("div");

  const radio = document.createElement("input");
  radio.type = "radio";
  radio.name = "demo-radio";
  radio.id = `radio-${index}`;
  radio.value = option;
  radioWrapper.appendChild(radio);

  const label = document.createElement("label");
  label.textContent = option;
  label.htmlFor = `radio-${index}`;
  radioWrapper.appendChild(label);

  radioGroup.appendChild(radioWrapper);
});

selectionSection.appendChild(radioGroup);
