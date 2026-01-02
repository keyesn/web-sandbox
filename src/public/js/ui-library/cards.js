/**
 * Cards UI Library Page
 * ----------------------
 * Showcase card components and layouts
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

// Basic Card
const basicSection = createSection("Basic Card", "Simple content container");

const basicCard = document.createElement("div");
basicCard.className = "card";

const basicTitle = document.createElement("h3");
basicTitle.textContent = "Card Title";
basicCard.appendChild(basicTitle);

const basicContent = document.createElement("p");
basicContent.textContent = "This is a basic card component. Cards are useful for grouping related content.";
basicCard.appendChild(basicContent);

basicSection.appendChild(basicCard);

// Card with Actions
const actionSection = createSection("Card with Actions", "Card with interactive elements");

const actionCard = document.createElement("div");
actionCard.className = "card";

const actionTitle = document.createElement("h3");
actionTitle.textContent = "Action Card";
actionCard.appendChild(actionTitle);

const actionContent = document.createElement("p");
actionContent.textContent = "This card includes buttons for user interaction.";
actionCard.appendChild(actionContent);

const actionButton = document.createElement("button");
actionButton.className = "btn btn-primary";
actionButton.textContent = "Primary Action";
actionCard.appendChild(actionButton);

const secondaryAction = document.createElement("button");
secondaryAction.className = "btn btn-secondary";
secondaryAction.textContent = "Secondary";
actionCard.appendChild(secondaryAction);

actionSection.appendChild(actionCard);

// Card Grid
const gridSection = createSection("Card Grid", "Multiple cards in a responsive grid");

const cardGrid = document.createElement("div");
cardGrid.style.display = "grid";
cardGrid.style.gridTemplateColumns = "repeat(auto-fit, minmax(250px, 1fr))";
cardGrid.style.gap = "1rem";

for (let i = 1; i <= 3; i++) {
  const card = document.createElement("div");
  card.className = "card";

  const title = document.createElement("h3");
  title.textContent = `Card ${i}`;
  card.appendChild(title);

  const content = document.createElement("p");
  content.textContent = `Content for card number ${i}. This demonstrates how cards look in a grid layout.`;
  card.appendChild(content);

  cardGrid.appendChild(card);
}

gridSection.appendChild(cardGrid);
