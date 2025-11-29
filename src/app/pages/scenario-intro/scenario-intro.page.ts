import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  inject,
  signal,
  computed,
  effect
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonModal,
  IonTitle,
  IonToolbar,
  IonSpinner
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBack, close, helpCircleOutline, copyOutline, personOutline } from 'ionicons/icons';

import { Scenario } from '../../core/models/game-scenario.model';
import { ScenarioCatalogService } from '../../core/services/scenario-catalog.service';
import { GameService } from '../../core/services/game.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-scenario-intro',
  standalone: true,
  imports: [
    CommonModule,
    IonButton,
    IonButtons,
    IonContent,
    IonFooter,
    IonHeader,
    IonIcon,
    IonModal,
    IonTitle,
    IonToolbar,
    IonSpinner
  ],
  templateUrl: './scenario-intro.page.html',
  styleUrl: './scenario-intro.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ScenarioIntroPage implements AfterViewInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly catalog = inject(ScenarioCatalogService);
  private readonly gameService = inject(GameService);
  private readonly authService = inject(AuthService);

  protected readonly scenario = signal<Scenario | null>(null);
  protected readonly tipsOpen = signal(false);
  protected readonly isLoading = signal(false);

  // Game State
  protected readonly game = this.gameService.currentGame;
  protected readonly currentUser = this.authService.user;

  // Computed
  protected readonly isHost = computed(() =>
    this.game()?.hostId === this.currentUser()?.uid
  );

  protected readonly myRole = computed(() => {
    const uid = this.currentUser()?.uid;
    return this.game()?.players.find(p => p.uid === uid)?.roleId;
  });

  protected readonly tips = [
    'The characters have small advantages in certain situations — you’ll notice these naturally as you explore. Stay alert to what your character can do that others cannot.',
    'Talk to each other frequently. If something happens only on your device — a sound, a sight, a clue — say it aloud.',
    'This game does not store clues for you. Writing short notes on paper is strongly recommended, especially for details that may matter later.'
  ];
  @ViewChild('introHeading', { static: false })
  private introHeading?: ElementRef<HTMLHeadingElement>;

  constructor() {
    addIcons({ chevronBack, helpCircleOutline, close, copyOutline, personOutline });

    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      void this.router.navigate(['/']);
      return;
    }

    const found = this.catalog.getScenarioById(id);
    if (!found) {
      void this.router.navigate(['/']);
      return;
    }

    this.catalog.selectScenario(id);
    this.scenario.set(found);

    // Navigate to game if status changes to playing
    effect(() => {
      const game = this.game();
      if (game?.status === 'playing') {
        void this.router.navigate(['/game', game.id]);
      }
    });
  }

  ngAfterViewInit(): void {
    queueMicrotask(() => this.focusIntroHeading());
  }

  protected async onHostGame(): Promise<void> {
    const s = this.scenario();
    if (!s) return;

    this.isLoading.set(true);
    try {
      await this.gameService.createGame(s.id);
    } catch (error) {
      console.error('Failed to create game', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  protected async onSelectRole(roleId: string): Promise<void> {
    const g = this.game();
    if (!g) return; // Can't select role if not in game

    try {
      await this.gameService.selectRole(g.id, roleId);
    } catch (error) {
      console.error('Failed to select role', error);
      // Show toast?
    }
  }

  protected isRoleTaken(roleId: string): boolean {
    const g = this.game();
    if (!g) return false;
    return g.players.some(p => p.roleId === roleId && p.uid !== this.currentUser()?.uid);
  }

  protected getPlayerNameForRole(roleId: string): string | undefined {
    const g = this.game();
    if (!g) return undefined;
    return g.players.find(p => p.roleId === roleId)?.name;
  }

  protected copyCode(): void {
    const code = this.game()?.code;
    if (code) {
      navigator.clipboard.writeText(code);
      // Show toast
    }
  }

  protected async onStart(): Promise<void> {
    const g = this.game();
    if (!g) return;

    this.isLoading.set(true);
    try {
      await this.gameService.startGame(g.id);
    } catch (error) {
      console.error('Failed to start game', error);
    } finally {
      this.isLoading.set(false);
    }
  }

  protected async onClose(): Promise<void> {
    console.log('Closing scenario intro');
    await this.router.navigate(['/']);
  }

  protected onInfo(): void {
    console.log('Opening tips modal');
    this.tipsOpen.set(true);
  }

  protected closeTips(): void {
    this.tipsOpen.set(false);
  }

  private focusIntroHeading(): void {
    const heading = this.introHeading?.nativeElement;
    if (heading && typeof heading.focus === 'function') {
      heading.focus({ preventScroll: true });
    }
  }
}
