import { Injectable, computed, signal } from '@angular/core';

import { CORE_SCENARIOS } from '../data/game-scenarios.data';
import { Scenario } from '../models/game-scenario.model';

@Injectable({ providedIn: 'root' })
export class ScenarioCatalogService {
  private readonly scenariosSource = signal<Scenario[]>([...CORE_SCENARIOS]);
  private readonly selectedScenarioId = signal<string | null>(
    CORE_SCENARIOS.length > 0 ? CORE_SCENARIOS[0].id : null
  );

  readonly scenarios = computed(() => this.scenariosSource());
  readonly selectedScenario = computed<Scenario | null>(() => {
    const id = this.selectedScenarioId();
    return id ? this.scenariosSource().find((scenario) => scenario.id === id) ?? null : null;
  });
  readonly scenarioCount = computed(() => this.scenariosSource().length);

  selectScenario(id: string): void {
    if (!id) {
      return;
    }

    const exists = this.scenariosSource().some((scenario) => scenario.id === id);
    if (exists) {
      this.selectedScenarioId.set(id);
    }
  }

  selectRandomScenario(): void {
    const items = this.scenariosSource();
    if (items.length === 0) {
      return;
    }

    const randomIndex = Math.floor(Math.random() * items.length);
    this.selectedScenarioId.set(items[randomIndex]!.id);
  }

  upsertScenario(newScenario: Scenario): void {
    this.scenariosSource.update((existing) => {
      const withoutExisting = existing.filter((scenario) => scenario.id !== newScenario.id);
      return [...withoutExisting, newScenario].sort((left, right) =>
        left.title.localeCompare(right.title)
      );
    });

    this.selectedScenarioId.set(newScenario.id);
  }

  resetSelection(): void {
    if (this.scenariosSource().length === 0) {
      this.selectedScenarioId.set(null);
      return;
    }

    const [firstScenario] = this.scenariosSource();
    this.selectedScenarioId.set(firstScenario?.id ?? null);
  }
}
