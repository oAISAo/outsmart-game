import { Component } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { gameControllerOutline, trophyOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-tabs',
  template: `
    <ion-tabs>
      <ion-tab-bar slot="bottom">
        <ion-tab-button tab="games" href="/tabs/games">
          <ion-icon name="game-controller-outline"></ion-icon>
          <ion-label>Games</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="leaderboard" href="/tabs/leaderboard">
          <ion-icon name="trophy-outline"></ion-icon>
          <ion-label>Leaderboard</ion-label>
        </ion-tab-button>

        <ion-tab-button tab="profile" href="/tabs/profile">
          <ion-icon name="person-outline"></ion-icon>
          <ion-label>Profile</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  `,
  standalone: true,
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel]
})
export class TabsPage {
  constructor() {
    addIcons({ gameControllerOutline, trophyOutline, personOutline });
  }
}
