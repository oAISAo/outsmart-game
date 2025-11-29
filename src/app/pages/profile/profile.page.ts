import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Profile</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="logout()">
            Logout
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <div class="profile-container">
        <div class="avatar-placeholder">
          {{ (username() || 'P').charAt(0).toUpperCase() }}
        </div>

        <ion-list>
          <ion-item>
            <ion-input
              label="Display Name"
              labelPlacement="stacked"
              [ngModel]="username()"
              (ngModelChange)="username.set($event)"
              placeholder="Enter your name"
            ></ion-input>
            <ion-button slot="end" fill="clear" (click)="updateName()" [disabled]="isLoading() || username() === currentName()">
              Save
            </ion-button>
          </ion-item>

          <ion-item>
            <ion-label>
              <h3>Email</h3>
              <p>{{ user()?.email }}</p>
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  `,
  styles: [`
    .profile-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding-top: 2rem;
    }
    .avatar-placeholder {
      width: 100px;
      height: 100px;
      border-radius: 50%;
      background: var(--ion-color-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 2rem;
    }
    ion-list {
      width: 100%;
    }
  `],
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule]
})
export class ProfilePage {
  private authService = inject(AuthService);

  user = this.authService.user;
  username = signal('');
  currentName = signal('');
  isLoading = signal(false);

  constructor() {
    effect(() => {
      const u = this.user();
      if (u?.displayName) {
        this.username.set(u.displayName);
        this.currentName.set(u.displayName);
      }
    });
  }

  async updateName() {
    if (!this.username()) return;
    this.isLoading.set(true);
    try {
      await this.authService.updateGameName(this.username());
      this.currentName.set(this.username());
    } catch (error) {
      console.error('Error updating name', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  async logout() {
    await this.authService.logout();
  }
}
