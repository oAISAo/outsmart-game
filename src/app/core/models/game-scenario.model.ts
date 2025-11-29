export interface ScenarioIntroSection {
  readonly heading: string;
  readonly paragraphs: readonly string[];
}

export interface Item {
  readonly name: string;
  readonly description: string;
}

export interface Scenario {
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly longDescription: string[];
  readonly defaultDurationMinutes: number;
  readonly numberOfPlayers: number;
  readonly seasonalTags: readonly string[];
  readonly roles: readonly {
    readonly id: string;
    readonly name: string;
    readonly emoji: string;
    readonly shortDescription: string;
    readonly description: string;
    readonly startingInventory: readonly Item[];
  }[];
}
