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
│   │   ├── router.js      # Request routing
│   │   └── handlers/      # API route handlers
│   │       └── api.js
│   └── public/            # Static front-end assets served by Node
│       ├── index.html
│       ├── components/    # Reusable HTML fragments
│       ├── css/           # Stylesheets
│       └── js/            # ES modules
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
