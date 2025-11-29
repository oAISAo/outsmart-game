import { TestBed } from '@angular/core/testing';

import { ScenarioCatalogService } from './scenario-catalog.service';

describe('ScenarioCatalogService', () => {
  let service: ScenarioCatalogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScenarioCatalogService);
  });

  it('exposes seeded scenarios', () => {
    expect(service.scenarios().length).toBeGreaterThan(0);
  });

  it('selects a scenario by id when available', () => {
    const target = service.scenarios()[0];
    service.selectScenario(target.id);
    expect(service.selectedScenario()?.id).toBe(target.id);
  });

  it('ignores invalid scenario selections', () => {
    const current = service.selectedScenario();
    service.selectScenario('non-existent');
    expect(service.selectedScenario()).toBe(current);
  });

  it('picks a random scenario without throwing', () => {
    expect(() => service.selectRandomScenario()).not.toThrow();
    expect(service.selectedScenario()).not.toBeNull();
  });

  it('returns scenarios by id', () => {
    const first = service.scenarios()[0];
    expect(service.getScenarioById(first.id)).toEqual(first);
    expect(service.getScenarioById('missing-id')).toBeUndefined();
  });

  it('upserts scenarios and keeps them sorted', () => {
    service.upsertScenario({
      id: 'zzz-custom',
      title: 'Zeta Test',
      summary: 'Temporary scenario for validation.',
      longDescription: ['Used to ensure the service keeps scenarios ordered by title.'],
      defaultDurationMinutes: 15,
      numberOfPlayers: 4,
      seasonalTags: [],
      roles: []
    });

    const lastScenario = [...service.scenarios()].pop();
    expect(lastScenario?.id).toBe('zzz-custom');
  });

  it('resets selection to the first scenario when available', () => {
    const firstScenarioId = service.scenarios()[0]?.id ?? null;
    service.selectScenario('zzz-custom');
    service.resetSelection();
    expect(service.selectedScenario()?.id).toBe(firstScenarioId);
  });
});
