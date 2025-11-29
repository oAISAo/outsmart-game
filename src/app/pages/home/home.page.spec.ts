import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { signal } from '@angular/core';

import { ScenarioCatalogService } from '../../core/services/scenario-catalog.service';
import { GameService } from '../../core/services/game.service';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;
  let navigateSpy: jasmine.Spy;
  let router: Router;
  let catalog: ScenarioCatalogService;

  const gameServiceMock = {
    currentGame: signal(null),
    joinGame: jasmine.createSpy('joinGame').and.resolveTo('game-id')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, RouterTestingModule],
      providers: [
        { provide: GameService, useValue: gameServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    router = TestBed.inject(Router);
    catalog = TestBed.inject(ScenarioCatalogService);
    navigateSpy = spyOn(router, 'navigate').and.resolveTo(true);
  });

  it('creates the page shell', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('lists the available scenarios', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('[data-testid="scenario-item"]');
    expect(items.length).toBeGreaterThan(0);
  });

  it('navigates to the scenario intro route on selection', async () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const items = compiled.querySelectorAll('[data-testid="scenario-item"]');
    expect(items.length).toBeGreaterThan(0);

    (items[0] as HTMLElement).click();
    fixture.detectChanges();
    await fixture.whenStable();

    const expectedId = catalog.scenarios()[0]?.id;
    expect(navigateSpy).toHaveBeenCalledWith(['/scenario', expectedId]);
  });

  it('navigates after selecting a random scenario', async () => {
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector(
      '[data-testid="random-scenario"]'
    ) as HTMLButtonElement;
    button.click();
    fixture.detectChanges();
    await fixture.whenStable();

    const selectedId = catalog.selectedScenario()?.id;
    expect(selectedId).toBeDefined();
    expect(navigateSpy).toHaveBeenCalledWith(['/scenario', selectedId]);
  });
});
