import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-set-name',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile Setup</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="container">
        <h1>Choose your Game Name</h1>
        <p>This is how other players will see you.</p>

        <ion-item>
          <ion-input
            label="Game Name"
            labelPlacement="floating"
            [ngModel]="username()"
            (ngModelChange)="username.set($event)"
            placeholder="Enter name"
            (keyup.enter)="onSubmit()"
          ></ion-input>
        </ion-item>

        <ion-button expand="block" class="ion-margin-top" (click)="onSubmit()" [disabled]="!username() || isLoading()">
          <span *ngIf="!isLoading()">Continue</span>
          <ion-spinner *ngIf="isLoading()"></ion-spinner>
        </ion-button>
      </div>
    </ion-content>
  `,
  styles: [`
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
      max-width: 400px;
      margin: 0 auto;
      text-align: center;

      h1 { margin-bottom: 0.5rem; }
      p { color: var(--ion-color-medium); margin-bottom: 2rem; }
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class SetNamePage {
  private authService = inject(AuthService);
  private router = inject(Router);

  username = signal('');
  isLoading = signal(false);

  constructor() {
    // Pre-fill username if possible
    effect(() => {
      const user = this.authService.user();
      if (user && !this.username()) {
        if (user.displayName) {
          this.username.set(user.displayName);
        } else if (user.email) {
          // Use part before @ as default
          this.username.set(user.email.split('@')[0]);
        } else {
          this.username.set('Player');
        }
      }
    });
  }

  async onSubmit() {
    if (!this.username()) return;

    this.isLoading.set(true);
    try {
      await this.authService.updateGameName(this.username());
      this.router.navigate(['/']);
    } catch (error) {
      console.error('Failed to set name', error);
    } finally {
      this.isLoading.set(false);
    }
  }
}
