🧩 Outsmart Game — Story Rules & Design Framework

🎯 1. Story Structure & Length

Each mission (or “story”) is a short, self-contained cooperative mystery.

Duration Limit: 15, 30, 45 and 60 minutes (depends on the story)

Every story has a clear goal (e.g., find the cat, discover who broke something, uncover a secret, etc.).

The story unfolds in three main phases:
Setup / Introduction — establishes the scene and the goal.
Investigation / Clue Sharing — players exchange info and interact.
Conclusion / Decision — players deduce the final answer or make a choice.

👥 2. Player Count & Roles

Each story supports a fixed number of players (2, 3 or 4).

Players must match that number — no substitutes or fewer players.

Each player gets a unique role with:
A short backstory/personality (used for flavor and humor).
Private information (their clues).
A role-based advantage (what they can notice or do).

This makes teamwork essential — no one can solve the mystery alone.

🧠 3. Clue System

Each story contains two types of clues:

🟢 Must-Find Clues
These are core clues essential to solving the mystery.
The story logic is built so they must be discovered for the game to progress.
Typically tied to each player’s key piece of information or an event that always triggers.

🔵 Optional Clues
These add depth, humor, or help confirm suspicions.
They make the story richer but are not required to win.
Optional clues can increase the player’s final score or time efficiency.

The balance: around 60% must-find and 40% optional.

🕰️ 4. Time Pressure & Flow

Each mission has a real world time constraint (e.g., “Find Muffin before it rains!”).

Real-time countdown mechanics create urgency.

The timer has to be always visible.

All stories end with either:
Success: Mystery solved in time.
Failure: Time runs out or wrong conclusion reached.

🗝️ 5. Scoring & Replay Value

Stories award points for:
Accuracy of final deduction.
Time efficiency.
Number of optional clues discovered.

Leaderboards show team names and scores per mission.

🎭 6. Tone & Style

All missions are cooperative, not competitive.

They mix mystery + humor + light chaos (players laughing, interrupting each other, etc.).

Stories can vary in genre: cozy mystery, sci-fi lab accident, office sabotage, etc.

The writing style should be lively, with short, spoken-friendly sentences (so reading aloud feels natural).

🧩 7. Gender & Character Design

Predefined Cast per Story

Each mission has a scripted cast — with genders and personalities baked in.

Example:
“Bachelorette Gone Wrong” — 3 women + 1 male stripper.
“The Case of the Missing Cat” — 2 couples in a suburban neighborhood.

Best for immersive or comedic storytelling.

🧩 8. Player Interaction Rules

Everyone reads their clues aloud — no one hides information.

Players can discuss theories, but must agree together on the final decision.

Certain roles may have “exclusive actions” (e.g., only The Charmer can talk to the neighbor).

Stories are short enough that no one feels lost or sidelined.

💬 9. Narration & Presentation

Each mission should feel like a guided mini-drama:

Narration introduces and concludes the story.

Role text is short and characterful (1–3 sentences each).

Optional sound effects or animations (like thunder or a cat meow) enhance immersion.

🧩 10. Future-Proof Design

All missions follow a shared structure and metadata model:

{
  "title": "The Case of the Missing Cat",
  "players": 4,
  "duration": 10,
  "roles": [...],
  "mustFindClues": [...],
  "optionalClues": [...],
  "phases": ["intro", "investigation", "neighbor", "final_decision"],
  "successConditions": ["cat_location_found"],
  "failConditions": ["time_out"]
}

This allows you to easily add or modify stories without breaking the app logic later.
