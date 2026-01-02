# WebSandbox

This project is a **learning-focused web application** built using plain **JavaScript, HTML, and CSS** on the front end and **Node.js (no frameworks)** on the back end.

The goal is to understand how the web works at a fundamental level before introducing abstractions or frameworks.

## Goals

- Learn core web concepts:
  - HTTP
  - Client/server communication
  - DOM manipulation
  - ES modules
- Avoid frameworks unless there is a clear reason to introduce them
- Keep the project small, understandable, and easy to modify
- Use this codebase as a sandbox for experimenting with:
  - Blogs
  - Dashboards
  - APIs
  - Authentication
  - Real-time features

## Tech Stack

### Front End

- HTML
- CSS
- Vanilla JavaScript (ES Modules)

### Back End

- Node.js
- Native `http` module
- No frameworks (Express, Fastify, etc.)

## Project Structure

```text
web-sandbox/
├── src/
│   ├── server/            # Node.js backend (no frameworks)
│   │   ├── server.js      # HTTP server entry point
│   │   ├── router.js      # Request routing with template rendering
│   │   ├── handlers/      # API route handlers
│   │   └── utils/         # Server utilities (template renderer, page config)
│   ├── views/             # Server-rendered templates
│   │   ├── layout.html    # Base layout template (DRY)
│   │   └── pages/         # Page-specific content fragments
│   │       ├── home.html
│   │       ├── api-demo.html
│   │       ├── ui-library.html        # Landing page
│   │       └── ui-library/            # Component collection pages
│   │           ├── buttons.html
│   │           ├── forms.html
│   │           └── cards.html
│   └── public/            # Static front-end assets (CSS, JS, images)
│       ├── components/    # Reusable UI components (navbar, footer)
│       ├── js/            # Page-specific JavaScript
│       │   ├── main.js
│       │   ├── api-demo.js
│       │   ├── ui-library.js          # Landing page script
│       │   └── ui-library/            # Collection page scripts
│       │       ├── buttons.js
│       │       ├── forms.js
│       │       └── cards.js
│       ├── css/           # Page-specific styles
│       └── shared/        # Global utilities
│       ├── components/    # Reusable UI components
│       ├── css/           # Stylesheets
│       ├── js/            # ES modules
│       └── shared/        # Global utilities and styles
├── docs/                  # Project docs and learning guides
├── package.json
└── README.md
```

## Running the App

- Start the server

    ```bash
    npm install
    npm start
    ```

- Open your browser at: `http://localhost:3000`
