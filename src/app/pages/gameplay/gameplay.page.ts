import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { ActivatedRoute, Router } from '@angular/router';
import { GameService } from '../../core/services/game.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.page.html',
  styleUrls: ['./gameplay.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class GameplayPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private gameService = inject(GameService);

  protected game = this.gameService.currentGame;

  constructor() { }

  ngOnInit() {
    const gameId = this.route.snapshot.paramMap.get('id');
    if (!gameId) {
      this.router.navigate(['/']);
      return;
    }
    // If we refreshed, we might need to re-fetch or ensure we are subscribed
    // The GameService might already be handling this if it persists state,
    // but for now we assume the user came from the lobby or we might need a way to "re-join" subscription
  }

}
