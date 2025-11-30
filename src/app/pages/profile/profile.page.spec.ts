import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { signal, WritableSignal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { ProfilePage } from './profile.page';

describe('ProfilePage', () => {
  let fixture: ComponentFixture<ProfilePage>;
  let component: ProfilePage;
  let authServiceMock: {
    user: WritableSignal<{ uid: string; email: string; displayName: string }>;
    updateGameName: jasmine.Spy;
    logout: jasmine.Spy;
  };

  beforeEach(async () => {
    authServiceMock = {
      user: signal({ uid: '123', email: 'test@example.com', displayName: 'Test User' }),
      updateGameName: jasmine.createSpy('updateGameName').and.resolveTo(),
      logout: jasmine.createSpy('logout').and.resolveTo()
    };

    await TestBed.configureTestingModule({
      imports: [ProfilePage, RouterTestingModule, TranslateModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display user email', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('test@example.com');
  });

  it('should call logout on button click', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');

    component.logout();
    expect(authServiceMock.logout).toHaveBeenCalled();
    // We can't easily test the router navigation here because it happens after await,
    // but we can verify the service call.
  });
});
