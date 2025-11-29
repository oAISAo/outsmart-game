import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoGoogle, mailOutline, personOutline, lockClosedOutline, arrowForward } from 'ionicons/icons';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class LoginPage {
  private authService = inject(AuthService);
  private router = inject(Router);

  // Form state
  username = signal('');
  email = signal('');
  password = signal('');

  // UI state
  isLoading = signal(false);
  authMode = signal<'login' | 'signup'>('signup');

  constructor() {
    addIcons({ logoGoogle, mailOutline, personOutline, lockClosedOutline, arrowForward });
  }

  async onGoogleLogin() {
    this.isLoading.set(true);
    try {
      await this.authService.loginWithGoogle();
      this.navigateAfterLogin();
    } catch (error) {
      console.error('Google login failed', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async onEmailSubmit() {
    if (!this.email() || !this.password()) return;

    this.isLoading.set(true);
    try {
      if (this.authMode() === 'signup') {
        await this.authService.registerWithEmail(this.email(), this.password());
      } else {
        await this.authService.loginWithEmail(this.email(), this.password());
      }
      this.navigateAfterLogin();
    } catch (error) {
      console.error('Email auth failed', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  private navigateAfterLogin() {
    // Check if user has a display name. If not, go to profile to set it.
    // We need to wait a tick for the auth state to propagate or check the current user directly
    const user = this.authService.user();
    if (user?.displayName) {
      this.router.navigate(['/tabs/games']);
    } else {
      this.router.navigate(['/tabs/profile']);
    }
  }

  toggleMode(mode: 'login' | 'signup') {
    this.authMode.set(mode);
  }
}
