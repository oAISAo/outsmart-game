import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomePage } from './home.page';

describe('HomePage', () => {
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
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
});