# Outsmart Game

> A cooperative narrative escape experience for web and mobile, built with Angular 20, Ionic 8, and Capacitor 7.

## Concept

Players join a shared session (locally or remotely) and must coordinate decisions, share items, and adapt to injuries or detours to beat the clock. Scenarios are highly branching and seasonal — for example:

- **Midnight Breakdown**: repair a car or trek through the woods before hypothermia hits.
- **Holiday Homebound**: navigate a snowed-in city while uncovering the perfect family gift.
- **Orbital Rescue**: stabilise a space station after a supply shuttle collision.

Each mission seeds player inventories, injuries, and environmental hazards differently, leading to unique playthroughs without heavy graphics.

## Tech Stack

- **Framework**: Angular 20 (standalone APIs, signals-first)
- **UI**: Ionic 8 components with SCSS theming
- **Native bridge**: Capacitor 7 (web + iOS + Android)
- **Tooling**: `@angular-eslint`, Prettier, Jasmine/Karma

## Getting Started

1. **Install prerequisites**
	```bash
	nvm install 24
	nvm use 24
	npm install -g @ionic/cli@8 @angular/cli@20
	```
2. **Install dependencies**
	```bash
	npm install
	```
3. **Run the dev server**
	```bash
	npm start
	```
	Navigate to http://localhost:4200. The browser reloads on code changes.

## NPM Scripts

| Command | Description |
| --- | --- |
| `npm start` | Angular dev server with Ionic live reload. |
| `npm run build` | Production build to `dist/outsmart-game`. |
| `npm run lint` | ESLint via `@angular-eslint`. |
| `npm run test` | Jasmine/Karma unit tests in watch mode. |
| `npm run format` | Prettier on `src/**/*.{ts,html,scss}`. |
| `npm run sync` | `npx cap sync` for native platform projects. |
| `npm run ios` / `npm run android` | Open native projects in Xcode / Android Studio. |

## Architecture Overview

- **App shell**: `src/app/app.ts` renders `<ion-app>` with `IonRouterOutlet`; Ionic providers are configured in `src/app/app.config.ts`.
- **Routing**: Defined centrally in `src/app/app.routes.ts`. Each route lazily loads a standalone page component.
- **Scenario catalog**: `ScenarioCatalogService` (`src/app/core/services`) exposes signals for mission lists and current selection, backed by `CORE_SCENARIOS` data.
- **Home page**: `src/app/pages/home` showcases scenarios, mission metadata, and narrative details using Ionic cards and badges.
- **Styling**: Ionic base styles are imported in `src/styles.scss`. Component-specific SCSS lives beside each component to keep styles scoped.

## Testing & Quality

- **Unit tests**: `npm test` executes Jasmine/Karma specs. New services/pages should ship with matching `.spec.ts` files.
- **Linting**: `npm run lint` enforces Angular and TypeScript best practices.
- **Formatting**: `npm run format` applies the Prettier ruleset (100 character width, single quotes).

## Native Builds

After a successful `npm run build`, run `npm run sync` to copy web assets into the Capacitor platforms and open projects with `npm run ios` or `npm run android`. Extend the scripts under `/scripts` for automated CI/CD flows.

## Roadmap Highlights

- Shared session orchestration and WebRTC voice hints.
- Scenario authoring toolkit with branching editor.
- Offline-ready persistence and reconnection logic.
- Seasonal scenario packs (e.g., spooky escape anthology, summer road-trip edition).

Have ideas or feedback? Open an issue or start a discussion in the repo! 🎲
