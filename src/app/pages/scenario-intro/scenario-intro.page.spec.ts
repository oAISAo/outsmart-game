import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

import { ScenarioCatalogService } from '../../core/services/scenario-catalog.service';
import { ScenarioIntroPage } from './scenario-intro.page';

class ActivatedRouteStub {
  snapshot = { paramMap: convertToParamMap({ id: '' }) };
}

describe('ScenarioIntroPage', () => {
  let fixture: ComponentFixture<ScenarioIntroPage>;
  let router: jasmine.SpyObj<Router>;
  let routeStub: ActivatedRouteStub;
  let catalog: ScenarioCatalogService;

  beforeEach(async () => {
    routeStub = new ActivatedRouteStub();
    router = jasmine.createSpyObj('Router', ['navigate']);
    router.navigate.and.resolveTo(true);

    await TestBed.configureTestingModule({
      imports: [ScenarioIntroPage],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: Router, useValue: router }
      ]
    }).compileComponents();

    catalog = TestBed.inject(ScenarioCatalogService);
  });

  function createComponentWithId(id: string): ComponentFixture<ScenarioIntroPage> {
    routeStub.snapshot.paramMap = convertToParamMap({ id });
    fixture = TestBed.createComponent(ScenarioIntroPage);
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
