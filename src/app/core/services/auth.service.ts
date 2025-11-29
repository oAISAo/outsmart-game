import { Injectable, inject, computed } from '@angular/core';
import {
  Auth,
  user,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword
} from '@angular/fire/auth';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);

  // Expose user as an observable
  user$ = user(this.auth);

  // Expose user as a signal
  user = toSignal(this.user$, { initialValue: null });

  // Computed signal to check if user is logged in
  isLoggedIn = computed(() => !!this.user());

  // Computed signal for username
  username = computed(() => this.user()?.displayName);

  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
  }

  async registerWithEmail(email: string, pass: string): Promise<void> {
    try {
      await createUserWithEmailAndPassword(this.auth, email, pass);
      // Name will be set in next step
    } catch (error) {
      console.error('Error registering with email:', error);
      throw error;
    }
  }

  async loginWithEmail(email: string, pass: string): Promise<void> {
    try {
      await signInWithEmailAndPassword(this.auth, email, pass);
    } catch (error) {
      console.error('Error logging in with email:', error);
      throw error;
    }
  }

  async updateGameName(username: string): Promise<void> {
    try {
      const currentUser = this.auth.currentUser;
      if (currentUser) {
        await updateProfile(currentUser, { displayName: username });
        await currentUser.reload();
        // Force signal update by re-emitting user?
        // The user$ observable should emit on reload/change, but sometimes it needs a nudge or we just wait.
        // For now, the reload should trigger the auth state change eventually.
      }
    } catch (error) {
      console.error('Error updating game name:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }
}
