# React + Vite Chrome Extension Starter

A ready-to-extend Chrome extension scaffold powered by React, TypeScript, Vite, and [`@crxjs/vite-plugin`](https://github.com/crxjs/chrome-extension-tools). It ships with a popup UI, options page, background service worker, and a content script so you can quickly plug in new wallet features.

## Project structure

```
src/
├── manifest.ts           # Typed manifest (MV3)
├── background/           # Service worker entry
├── content/              # Example content script
└── pages/
    ├── popup/            # React popup (main UI)
    └── options/          # React options page
```

All entries are regular Vite apps, so you can import components, CSS modules, etc. from the rest of `src`.

## Getting started

1. Install dependencies  
   `npm install`
2. Start the dev watcher  
   `npm run dev`
3. In Chrome, open `chrome://extensions`, enable **Developer mode**, click **Load unpacked**, and select the freshly built `dist/` folder.
4. Keep the Vite watcher running for automatic rebuilds and hot updates via the CRX Devtools extension.

## Available scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Runs Vite + CRX in watch mode and writes extension assets to `dist/`. |
| `npm run build` | Type-checks the entire project and outputs a production-ready extension bundle to `dist/`. |
| `npm run preview` | Serves the production bundle for quick smoke tests. |
| `npm run lint` | Runs ESLint with the configured React + TypeScript rules. |

## Development notes

- Background/service worker logic lives in `src/background/index.ts`. The example logs install events and forwards the user to the options page on first install.
- A sample content script (`src/content/index.ts`) injects a badge into every page so you know it is loading.
- Styling is powered by Tailwind CSS v4 (`tailwindcss` + `@tailwindcss/vite`), so you can lean on utility classes inside your React components without juggling separate build tooling.
- The popup (`src/pages/popup`) and options UI (`src/pages/options`) are plain React apps that read/write to `chrome.storage`.
- Manifest data is authored in TypeScript (`src/manifest.ts`) and statically typed through `@crxjs/vite-plugin`.

## Production build & publishing

Run `npm run build`, then point Chrome’s “Load unpacked” dialog to the generated `dist/` folder for final QA. Zip the contents of `dist/` when you are ready to upload to the Chrome Web Store.

## Styling with Tailwind

Each entry point (popup/options) imports `@import 'tailwindcss';` at the top of its CSS file, which pulls in Tailwind’s base + utilities. Thanks to the official Vite plugin (`@tailwindcss/vite`), there is no separate CLI process — just add classes in your JSX or drop overrides into `@layer base` in the respective `index.css` files when you need custom fonts/backgrounds.
