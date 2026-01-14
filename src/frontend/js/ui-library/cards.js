import { loadComponents } from "./component-loader.js";

const showcase = document.querySelector("#component-showcase");

const components = [
  {
    title: "Basic Card",
    description: "Simple container with title and body copy.",
    basePath: "/components/ui-library/cards/basic-card",
  },
  {
    title: "Card with Actions",
    description: "Interactive card that adds primary and secondary actions.",
    basePath: "/components/ui-library/cards/action-card",
  },
  {
    title: "Card Grid",
    description: "Responsive set of cards displayed in a grid layout.",
    basePath: "/components/ui-library/cards/grid-cards",
  },
];

loadComponents(showcase, components);
