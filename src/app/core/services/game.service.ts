import { Injectable, inject, signal } from '@angular/core';
import {
  Firestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  arrayUnion,
  serverTimestamp
} from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

export interface GamePlayer {
  uid: string;
  name: string;
  roleId?: string;
  status: 'joined' | 'ready';
}

export interface Game {
  id: string;
  code: string;
  hostId: string;
  scenarioId: string;
  status: 'lobby' | 'playing' | 'finished';
  players: GamePlayer[];
  createdAt: unknown;
}

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private firestore = inject(Firestore);
  private authService = inject(AuthService);
  private router = inject(Router);

  // Current game state
  currentGame = signal<Game | null>(null);

  /**
   * Creates a new game lobby
   */
  async createGame(scenarioId: string): Promise<string> {
    const user = this.authService.user();
    if (!user) throw new Error('User must be logged in');

    const code = this.generateGameCode();
    const player: GamePlayer = {
      uid: user.uid,
      name: user.displayName || 'Player',
      status: 'joined'
    };

    const gameData = {
      code,
      hostId: user.uid,
      scenarioId,
      status: 'lobby',
      players: [player],
      createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(this.firestore, 'games'), gameData);
    this.subscribeToGame(docRef.id);
    return docRef.id;
  }

  /**
   * Joins an existing game by code
   */
  async joinGame(code: string): Promise<string> {
    const user = this.authService.user();
    if (!user) throw new Error('User must be logged in');

    // Find game by code
    const q = query(
      collection(this.firestore, 'games'),
      where('code', '==', code.toUpperCase()),
      where('status', '==', 'lobby')
    );

    const snapshot = await getDocs(q);
    if (snapshot.empty) throw new Error('Game not found');

    const gameDoc = snapshot.docs[0];
    const game = gameDoc.data() as Game;

    // Check if already joined
    const isAlreadyJoined = game.players.some(p => p.uid === user.uid);

    if (!isAlreadyJoined) {
      const player: GamePlayer = {
        uid: user.uid,
        name: user.displayName || 'Player',
        status: 'joined'
      };

      await updateDoc(doc(this.firestore, 'games', gameDoc.id), {
        players: arrayUnion(player)
      });
    }

    this.subscribeToGame(gameDoc.id);
    return gameDoc.id;
  }

  /**
   * Selects a role for the current player
   */
  async selectRole(gameId: string, roleId: string): Promise<void> {
    const game = this.currentGame();
    if (!game) return;

    const user = this.authService.user();
    if (!user) return;

    // Check if role is taken by someone else
    const isTaken = game.players.some(p => p.roleId === roleId && p.uid !== user.uid);
    if (isTaken) throw new Error('Role already taken');

    // Update local player's role
    const updatedPlayers = game.players.map(p => {
      if (p.uid === user.uid) {
        return { ...p, roleId };
      }
      return p;
    });

    await updateDoc(doc(this.firestore, 'games', gameId), {
      players: updatedPlayers
    });
  }

  /**
   * Starts the game
   */
  async startGame(gameId: string): Promise<void> {
    await updateDoc(doc(this.firestore, 'games', gameId), {
      status: 'playing'
    });
  }

  /**
   * Subscribes to game updates
   */
  private subscribeToGame(gameId: string) {
    onSnapshot(doc(this.firestore, 'games', gameId), (doc) => {
      if (doc.exists()) {
        const data = doc.data() as Game;
        this.currentGame.set({ ...data, id: doc.id });
      } else {
        this.currentGame.set(null);
      }
    });
  }

  private generateGameCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let result = '';
    for (let i = 0; i < 4; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
}
