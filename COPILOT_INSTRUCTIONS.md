# Outsmart Game - AI Assistant Instructions

## 🎯 Project Vision
We are building **Outsmart Game**, a high-quality, professional, cooperative narrative escape adventure game for public release. 
**Quality is non-negotiable.** The code must be robust, scalable, and production-ready. The design must be polished, immersive, and responsive.

## 🛠 Tech Stack
- **Framework**: Angular (Standalone Components, Signals architecture)
- **UI Library**: Ionic Framework 8 (Mobile-first)
- **Runtime**: Capacitor 7 (iOS & Android)
- **Backend**: Firebase (Auth, Firestore, Functions)
- **Styling**: SCSS with CSS Variables (Theme: Dark Mystery)
- **Internationalization**: ngx-translate

## 💎 Core Principles

### 1. Professional Quality Standards
- **No "Hack" Solutions**: Avoid `setTimeout`, magic numbers, or temporary workarounds. If a hack is absolutely necessary, it must be documented with a `TODO` and a plan for removal.
- **Robustness**: Handle edge cases, errors, and offline states gracefully. The app should never crash silently.
- **Type Safety**: Use strict TypeScript. No `any` unless absolutely unavoidable. Define interfaces for all data structures.

### 2. Design & UX Excellence
- **Immersive UI**: The app must look good. Maintain the "Dark Mystery" aesthetic. Use the defined CSS variables (`--outsmart-space-*`, `--outsmart-accent-*`).
- **Mobile-First**: Always optimize for touch targets, safe areas (notch), and small screens.
- **Feedback**: Every user action (click, load, error) must have visual feedback (spinners, toasts, ripples).

### 3. 🛡️ Testing & Regression Policy (CRITICAL)
- **Zero Regression**: We must not reintroduce bugs.
- **The "Fix-it, Test-it" Rule**: Every time you fix a bug, you **MUST** create or update a test case (Unit or E2E) that reproduces the bug and verifies the fix.
- **Test Coverage**: Write unit tests (`.spec.ts`) for all new services and complex component logic.

### 4. Coding Conventions
- **Signals over Observables**: Prefer Angular Signals for state management. Use `toSignal` for RxJS interop.
- **Standalone Components**: All new components must be `standalone: true`.
- **Clean Architecture**: 
  - `pages/`: View logic only.
  - `core/services/`: Business logic and API calls.
  - `shared/`: Reusable UI components.

## 🚀 Workflow
1. **Analyze**: Before writing code, understand the user's intent and the current codebase context.
2. **Plan**: Briefly describe the approach if the task is complex.
3. **Implement**: Write clean, commented, and formatted code.
4. **Verify**: Ensure the fix works and **add the required test case**.

---
*Remember: We are building a product for the public. Every line of code matters.*
