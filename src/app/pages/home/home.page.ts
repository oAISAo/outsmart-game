import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {
  IonBadge,
  IonButton,
  IonContent,
  IonHeader,
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
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslateModule,
    IonBadge,
    IonButton,
    IonContent,
    IonHeader,
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

  // Join Game State
  protected readonly isInputFocused = signal(false);
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

  protected async onJoinGame(): Promise<void> {
    if (!this.joinCode() || this.joinCode().length !== 4) return;

    this.isJoining.set(true);
    try {
      const { scenarioId } = await this.gameService.joinGame(this.joinCode());
      await this.router.navigate(['/scenario', scenarioId]);
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
