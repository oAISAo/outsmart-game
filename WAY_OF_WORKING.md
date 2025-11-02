# Way of Working

## Code Philosophy
The code should be **modular, testable, and clear**. Every component should do one thing well.

We follow these principles:
- DRY (Don’t Repeat Yourself)
- KISS (Keep It Simple, Stupid)
- SRP (Single Responsibility Principle)
- Predictable state management and explicit data flow.

## Workflow
1. **Plan**
   - Define each feature clearly before starting.
   - Use small tickets or TODO comments for clarity.

2. **Develop**
   - Follow Angular’s best practices and file naming conventions.
   - Write self-documenting code and meaningful commit messages.
   - Use strict typing and linting rules.

3. **Test**
   - Write unit tests for services and critical logic.
   - Test features manually in the browser and emulator.

4. **Review**
   - Use Git commits as checkpoints of meaningful progress.
   - Document important decisions in the README or changelog.

5. **Deploy**
   - Keep builds reproducible using consistent Node and package versions.
   - Automate build/deploy steps with scripts under `/scripts`.

## Branching Strategy
- `main`: production-ready
- `dev`: integration branch
- `feature/*`: individual features or experiments
- `hotfix/*`: critical bug fixes

## Communication with Copilot
- Write clear, natural English comments before writing new logic.
- Ask Copilot to suggest improvements or alternatives often.
- Use Copilot inline chat for small tasks, ChatGPT (browser) for large architectural help.
