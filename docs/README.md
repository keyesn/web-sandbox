# WebSandbox Documentation

Central index for all project documentation. Organized by purpose: architecture decisions, reusable patterns, learning guides, and references.

## Quick Links

- **Start Here**: [Learning Roadmap](guides/LEARNING_ROADMAP.md) - Progressive phases for building the application
- **Project Philosophy**: [No Middleware](architecture/NO_MIDDLEWARE.md) - Why we use explicit routing
- **Getting Help**: [References](references/REFERENCES.md) - External resources and links

---

## Architecture

High-level design decisions explaining *why* the project is structured this way.

- [**NO_MIDDLEWARE.md**](architecture/NO_MIDDLEWARE.md) - Explicit routing vs. middleware stacks; why we avoid Express
- [**FOLDER_STRUCTURE_PATTERNS.md**](architecture/FOLDER_STRUCTURE_PATTERNS.md) - Different ways to organize web applications; component-based vs. file-type grouping
- [**STYLESHEET_MANAGEMENT.md**](architecture/STYLESHEET_MANAGEMENT.md) - Modular CSS approach; when to introduce build tools

---

## Patterns

Reusable patterns and implementation guides for specific features.

- [**ERROR_BOUNDARIES.md**](patterns/ERROR_BOUNDARIES.md) - Error boundary pattern overview and concepts
- [**IMPLEMENTATION_ERROR_BOUNDARIES.md**](patterns/IMPLEMENTATION_ERROR_BOUNDARIES.md) - Detailed implementation guide for error handling
- [**NAMING_CONVENTIONS.md**](patterns/NAMING_CONVENTIONS.md) - File and folder naming standards; kebab-case vs. camelCase

---

## Guides

Step-by-step learning materials and tutorials.

- [**LEARNING_ROADMAP.md**](guides/LEARNING_ROADMAP.md) - Progressive development phases from HTTP basics to real-time features

---

## References

External resources, scratch notes, and miscellaneous documentation.

- [**REFERENCES.md**](references/REFERENCES.md) - Curated links to external documentation and articles
- [**INPUT.md**](references/INPUT.md) - Scratch notes and ideas during development (temporary)
- [**layout_design.md**](references/layout_design.md) - Layout design principles and sketches

---

## Temp

Temporary notes and scratch files for in-progress ideas, implementation steps, etc.

---

## Directory Structure

```text
docs/
├── README.md                          # This file
├── architecture/                      # Design decisions
├── patterns/                          # Reusable patterns
├── guides/                            # Learning materials
├── references/                        # External links and notes
└── temp/                              # Temporary notes/scratches
```

---

## Contributing to Docs

When adding new documentation:

1. **Architecture docs**: Explain *why* a decision was made, include trade-offs
2. **Pattern docs**: Show *how* to implement, include code examples
3. **Guide docs**: Provide step-by-step instructions with clear outcomes
4. **Reference docs**: Keep links organized, prefer canonical sources

Keep documentation lean, readable, and focused on learning.
