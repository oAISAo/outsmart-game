import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import {
  IonBadge,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonTitle,
  IonToolbar
} from '@ionic/angular/standalone';

import { ScenarioCatalogService } from '../../core/services/scenario-catalog.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IonBadge,
    IonButton,
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonTitle,
    IonToolbar
  ],
  templateUrl: './home.page.html',
  styleUrl: './home.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomePage {
  private readonly catalog = inject(ScenarioCatalogService);

  protected readonly scenarios = this.catalog.scenarios;
  protected readonly selectedScenario = this.catalog.selectedScenario;
  protected readonly scenarioCount = this.catalog.scenarioCount;
  protected readonly targetDuration = computed(
    () => this.selectedScenario()?.defaultDurationMinutes ?? 30
  );

  protected onSelectScenario(id: string): void {
    this.catalog.selectScenario(id);
  }

  protected onRandomScenario(): void {
    this.catalog.selectRandomScenario();
  }
}
