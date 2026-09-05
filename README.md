# Frontend - Darshana Opticals OSMS

Frontend web application for the Darshana Opticals Optical Shop Management
System (OSMS), built with React and Vite.

This repository currently contains the **frontend foundation** only:
application shell (Navbar / main content / Footer), routing setup, base
styling, environment configuration, and initial automated tests. Business
features (authentication, products, cart, appointments, customer profile,
etc.) are implemented in later issues.

## Tech Stack

- React (JavaScript)
- Vite
- React Router (`react-router-dom`)
- Vitest + React Testing Library + `@testing-library/jest-dom`

## Project Structure

```
src/
  assets/       Static assets (images, icons, etc.)
  components/
    common/     Reusable UI components (Navbar, Footer, ...)
  layouts/      Page layout components (AppLayout, ...)
  pages/        Route-level page components
  routes/       Route definitions
  services/     API communication layer (kept separate from UI)
  hooks/        Reusable custom React hooks
  utils/        Generic helper functions
  config/       App configuration helpers (e.g. environment variables)
  styles/       Global CSS
tests/          Automated tests (Vitest + React Testing Library)
```

## Prerequisites

- Node.js 18+ and npm

## 1. Install dependencies

```bash
npm install
```

## 2. Configure environment variables

Copy the example environment file and adjust values for your local setup:

```bash
cp .env.example .env
```

`VITE_API_BASE_URL` should point to the backend API base URL, for example:

```
VITE_API_BASE_URL=http://localhost:5000/api
```

The `.env` file is git-ignored and must never be committed. Only
`.env.example` (with placeholder/non-secret values) is committed.

## 3. Run the development server

```bash
npm run dev
```

The app will be available at the URL printed in the terminal (typically
`http://localhost:5173`).

## 4. Run tests

```bash
npm test
```

Runs the Vitest test suite once (application shell rendering, `/` route,
and unknown-route/404 handling). Use `npm run test:watch` to run tests in
watch mode during development.

## 5. Create a production build

```bash
npm run build
```

The optimized build output is generated in `dist/`. Preview it locally with:

```bash
npm run preview
```

## Notes

- API URLs and other environment-specific values must never be hardcoded in
  components - they are read via `src/config/env.js`.
- This issue (FE#1) only establishes the frontend foundation. No business
  features are implemented here.
