import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { signal } from '@angular/core';

import { ScenarioCatalogService } from '../../core/services/scenario-catalog.service';
import { GameService } from '../../core/services/game.service';
import { AuthService } from '../../core/services/auth.service';
import { LobbyPage } from './lobby.page';

class ActivatedRouteStub {
  snapshot = { paramMap: convertToParamMap({ id: '' }) };
}

describe('LobbyPage', () => {
  let fixture: ComponentFixture<LobbyPage>;
  let router: jasmine.SpyObj<Router>;
  let routeStub: ActivatedRouteStub;
  let catalog: ScenarioCatalogService;

  const gameServiceMock = {
    currentGame: signal(null),
    createGame: jasmine.createSpy('createGame').and.resolveTo('game-id'),
    selectRole: jasmine.createSpy('selectRole').and.resolveTo(),
    startGame: jasmine.createSpy('startGame').and.resolveTo()
  };

  const authServiceMock = {
    user: signal({ uid: 'test-uid', displayName: 'Test User' })
  };

  beforeEach(async () => {
    routeStub = new ActivatedRouteStub();
    router = jasmine.createSpyObj('Router', ['navigate']);
    router.navigate.and.resolveTo(true);

    await TestBed.configureTestingModule({
      imports: [LobbyPage],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Router, useValue: router },
        { provide: GameService, useValue: gameServiceMock },
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    catalog = TestBed.inject(ScenarioCatalogService);
  });

  function createComponentWithId(id: string): ComponentFixture<LobbyPage> {
    routeStub.snapshot.paramMap = convertToParamMap({ id });
    fixture = TestBed.createComponent(LobbyPage);
    fixture.detectChanges();
    return fixture;
  }

  it('renders the introduction content for the selected scenario', () => {
    const scenario = catalog.scenarios()[0];
    createComponentWithId(scenario.id);
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h1')?.textContent).toContain(scenario.title);
  });

  it('redirects home when the scenario cannot be found', async () => {
    router.navigate.calls.reset();
    createComponentWithId('unknown');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });
});
