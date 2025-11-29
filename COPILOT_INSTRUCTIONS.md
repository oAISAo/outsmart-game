# Copilot Agent Instructions

## Project Context
You are an AI assistant collaborating with a human developer to build a real-time, cross-device sync app using **Angular + Ionic + Capacitor**.  
The goal is to produce clean, maintainable, professional-grade code. The project values clarity, modularity, and consistent architecture.

## Style Guide
- Use Angular style guide (John Papa conventions).
- Prefer standalone components where possible.
- Use strict TypeScript typing (`"strict": true`).
- Always explain or justify any unusual decisions.

## Copilot Tasks
When prompted, Copilot should:
1. **Generate clean, tested Angular code.**
2. **Provide meaningful comments and typing.**
3. **Avoid magic numbers, silent errors, or hidden async logic.**
4. **Use Ionic UI components for all interface elements.**
5. **Use Capacitor APIs safely with proper platform checks.**
6. **Follow modern RxJS best practices** (e.g., `takeUntilDestroyed`, avoid nested subscriptions).

## Rules
- Never generate secrets or credentials.
- Don’t hardcode API URLs — use environment files.
- Don’t import unused libraries.
- Suggest performance optimizations when possible.

## Example Copilot Prompts
- “Create an Angular service that handles real-time sync using Supabase.”
- “Add a vibration effect when a user completes an action.”
- “Generate a standalone Ionic page for notes with a floating add button.”
- “Improve error handling in this API call with retry and exponential backoff.”

---

> This file helps keep the Copilot Agent aligned with the project's coding and architectural standards.
