# URL Shortener — Client

Frontend for the URL Shortener project (Vite + React + Tailwind).

## Quick start

1. Install dependencies
```sh
npm install
```

2. Run dev server
```sh
npm run dev
```

3. Build for production
```sh
npm run build
```

## Environment

- Client env file: `client/.env`
  - Intended variable: `REACT_APP_API_URL`
  - Note: Some components currently use a hardcoded `http://localhost:3000` (see `src/components/Shortener.jsx`).

## Important files

- Project config
  - `package.json`, `vite.config.js`, `index.html`, `.gitignore`
- Source
  - `src/main.jsx` — app bootstrap
  - `src/App.jsx` — top-level component
  - `src/index.css`, `src/App.css` — styles (Tailwind + custom)
- Components
  - `src/components/Header.jsx`
  - `src/components/Hero.jsx`
  - `src/components/Main.jsx`
  - `src/components/Shortener.jsx`
  - `src/components/UrlList.jsx`
  - `src/components/CallToAction.jsx`
- Assets
  - `src/assets/`, `src/images/`, `public/`

## App behavior notes

- Shortening:
  - Posts to `/api/shorten` (server at `http://localhost:3000` by default).
  - Expected response shape: `{ shortUrl, code }`.
- Persistence:
  - Links stored in `localStorage` (handled in `Main.jsx`).
- Other API calls:
  - GET `/api/stats/:slug`
  - DELETE `/api/links/:slug`

## Recommended small improvements

- Use `REACT_APP_API_URL` instead of hardcoded API URL.
- Replace alerts with inline error UI.
- Use stable keys (e.g. `code`) for list rendering instead of array index.

## Development notes

- Tailwind is configured in the project; ensure `index.css` imports Tailwind base/components/utilities.
- Dev server runs on Vite — open the URL printed in the terminal after `npm run dev`.