import { Component, inject, signal, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-profile',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ 'PROFILE.TITLE' | translate }}</ion-title>
        <ion-buttons slot="end">
          <ion-button (click)="logout()">
            {{ 'PROFILE.LOGOUT' | translate }}
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
          <ion-item lines="none">
            <ion-input
              [label]="'PROFILE.DISPLAY_NAME' | translate"
              labelPlacement="stacked"
              [ngModel]="username()"
              (ngModelChange)="username.set($event)"
              [placeholder]="'PROFILE.ENTER_NAME' | translate"
            >
              <ion-button
                slot="end"
                fill="clear"
                (click)="updateName()"
                [disabled]="isLoading() || username() === currentName()"
                class="save-btn"
              >
                {{ 'PROFILE.SAVE' | translate }}
              </ion-button>
            </ion-input>
          </ion-item>

          <ion-item lines="none">
            <ion-label>
              <h3>{{ 'PROFILE.EMAIL' | translate }}</h3>
              <p>{{ user()?.email }}</p>
            </ion-label>
          </ion-item>

          <ion-item lines="none">
            <ion-select
              [label]="'PROFILE.LANGUAGE' | translate"
              labelPlacement="stacked"
              [value]="currentLang()"
              (ionChange)="changeLanguage($event)"
              interface="popover"
            >
              <ion-select-option value="en">English</ion-select-option>
              <ion-select-option value="de">Deutsch</ion-select-option>
              <ion-select-option value="sl">Slovenščina</ion-select-option>
            </ion-select>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  `,
  styleUrl: './profile.page.scss',
  standalone: true,
  imports: [CommonModule, FormsModule, IonicModule, TranslateModule]
})
export class ProfilePage {
  private authService = inject(AuthService);
  private router = inject(Router);
  private translate = inject(TranslateService);

  user = this.authService.user;
  username = signal('');
  currentName = signal('');
  isLoading = signal(false);
  currentLang = signal(this.translate.currentLang || 'en');

  constructor() {
    effect(() => {
      const u = this.user();
      if (u?.displayName) {
        this.username.set(u.displayName);
        this.currentName.set(u.displayName);
      }
    });
  }

  changeLanguage(event: CustomEvent) {
    const lang = event.detail.value;
    this.translate.use(lang);
    this.currentLang.set(lang);
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
    this.router.navigate(['/login']);
  }
}
