/**
 * Component Loader
 * ----------------
 * Fetches HTML, attaches styles, and optionally loads behavior for UI library demos.
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

  return { section, container };
}

function ensureStylesheet(href) {
  if (!href) return;
  if (document.querySelector(`link[data-component-style="${href}"]`)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.dataset.componentStyle = href;
  document.head.appendChild(link);
}

async function fetchMarkup(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to fetch component markup from ${path}`);
  return res.text();
}

function renderError(target, componentTitle, error) {
  const message = document.createElement("div");
  message.className = "component-error";
  message.textContent = `Unable to load ${componentTitle}. Check console for details.`;
  target.appendChild(message);
  console.error(error);
}

/**
 * Load a list of component demos into the showcase container.
 * @param {HTMLElement} showcase - The #component-showcase element
 * @param {Array<{title: string, description?: string, basePath: string, modulePath?: string, markupPath?: string, stylePath?: string}>} components
 */
export async function loadComponents(showcase, components) {
  if (!showcase) return;

  for (const component of components) {
    const { section, container } = createSection(component.title, component.description);
    showcase.appendChild(section);

    const markupPath = component.markupPath || `${component.basePath}/index.html`;
    const stylePath = component.stylePath || `${component.basePath}/styles.css`;
    const modulePath = component.modulePath || null;

    try {
      ensureStylesheet(stylePath);
      const markup = await fetchMarkup(markupPath);
      container.innerHTML = markup;
      if (modulePath) {
        await import(modulePath);
      }
    } catch (error) {
      renderError(container, component.title, error);
    }
  }
}
