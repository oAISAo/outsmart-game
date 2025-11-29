import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-leaderboard',
  template: `
    <ion-header>
      <ion-toolbar>
        <ion-title>Leaderboard</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <p>Leaderboard coming soon...</p>
    </ion-content>
  `,
  standalone: true,
  imports: [IonicModule]
})
export class LeaderboardPage {}
