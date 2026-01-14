import { loadComponents } from "./component-loader.js";

const showcase = document.querySelector("#component-showcase");

const components = [
  {
    title: "Text Inputs",
    description: "Plain text and email inputs with labels and placeholders.",
    basePath: "/components/ui-library/forms/form-inputs",
  },
  {
    title: "Text Area",
    description: "Multi-line input for longer content.",
    basePath: "/components/ui-library/forms/textarea",
  },
  {
    title: "Selection Controls",
    description: "Checkbox plus grouped radio options.",
    basePath: "/components/ui-library/forms/selection-controls",
  },
];

loadComponents(showcase, components);
