import { loadComponents } from "./component-loader.js";

const showcase = document.querySelector("#component-showcase");

const components = [
  {
    title: "Primary Button",
    description: "Base button style with primary color and hover effects.",
    basePath: "/components/ui-library/buttons/primary-button",
  },
  {
    title: "Secondary Button",
    description: "Secondary button with neutral color scheme.",
    basePath: "/components/ui-library/buttons/secondary-button",
  },
  {
    title: "Expand One Button",
    description: "Playful button with expanding background animation on hover.",
    basePath: "/components/ui-library/buttons/expand-one-button",
  },
  {
    title: "Disabled Button",
    description: "Primary button in disabled state.",
    basePath: "/components/ui-library/buttons/primary-button",
    markupPath: "/components/ui-library/buttons/disabled-button/index.html",
    stylePath: "/css/components/buttons-disabled.css",
  },
  {
    title: "Interactive Example",
    description: "Click counter to illustrate behavior hooks.",
    basePath: "/components/ui-library/buttons/click-counter",
    modulePath: "/components/ui-library/buttons/click-counter/script.js",
  },
];

loadComponents(showcase, components);
