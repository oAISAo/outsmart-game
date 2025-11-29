import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar,
  IonInput,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { sparklesOutline, enterOutline } from 'ionicons/icons';

import { ScenarioCatalogService } from '../../core/services/scenario-catalog.service';
import { GameService } from '../../core/services/game.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonBadge,
    IonButton,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar,
    IonInput,
    IonSpinner
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  private readonly catalog = inject(ScenarioCatalogService);
  private readonly router = inject(Router);
  private readonly gameService = inject(GameService);

  protected readonly scenarios = this.catalog.scenarios;
  protected readonly selectedScenario = this.catalog.selectedScenario;
  protected readonly scenarioCount = this.catalog.scenarioCount;
  protected readonly targetDuration = computed(
    () => this.selectedScenario()?.defaultDurationMinutes ?? 30
  );
  
  // Join Game State
  protected joinCode = signal('');
  protected isJoining = signal(false);

  constructor() {
    addIcons({ sparklesOutline, enterOutline });
  }

  protected onSelectScenario(id: string): void {
    this.clearFocus();
    this.catalog.selectScenario(id);
    void this.navigateToScenario(id);
  }

  protected onRandomScenario(): void {
    this.clearFocus();
    this.catalog.selectRandomScenario();
    const scenario = this.catalog.selectedScenario();
    if (scenario) {
      void this.navigateToScenario(scenario.id);
    }
  }
  
  protected async onJoinGame(): Promise<void> {
    if (!this.joinCode() || this.joinCode().length !== 4) return;
    
    this.isJoining.set(true);
    try {
      const gameId = await this.gameService.joinGame(this.joinCode());
      // Hack for now: Wait for signal to populate
      setTimeout(() => {
        const game = this.gameService.currentGame();
        if (game) {
          this.router.navigate(['/scenario', game.scenarioId]);
        }
      }, 500);
      
    } catch (error) {
      console.error('Failed to join game', error);
      // Show toast
    } finally {
      this.isJoining.set(false);
    }
  }

  private async navigateToScenario(id: string): Promise<void> {
    await this.router.navigate(['/scenario', id]);
  }

  private clearFocus(): void {
    const active = document.activeElement;
    if (active instanceof HTMLElement) {
      active.blur();
    }
  }
}
