export interface Scenario {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly longDescription: string;
  readonly defaultDurationMinutes: number;
  readonly recommendedPlayers: {
    readonly min: number;
    readonly max: number;
  };
  readonly seasonalTags: readonly string[];
  readonly startingInventory: readonly string[];
  readonly keyMechanics: readonly string[];
}
