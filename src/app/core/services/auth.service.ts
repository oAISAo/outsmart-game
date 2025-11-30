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
import { Firestore, doc, setDoc, getDoc } from '@angular/fire/firestore';
import { toSignal } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth = inject(Auth);
  private firestore = inject(Firestore);

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
      const result = await signInWithPopup(this.auth, provider);
      await this.syncUserToFirestore(result.user);
    } catch (error) {
      console.error('Error logging in with Google:', error);
      throw error;
    }
  }

  async registerWithEmail(email: string, pass: string): Promise<void> {
    try {
      const result = await createUserWithEmailAndPassword(this.auth, email, pass);
      await this.syncUserToFirestore(result.user);
    } catch (error) {
      console.error('Error registering with email:', error);
      throw error;
    }
  }

  async loginWithEmail(email: string, pass: string): Promise<void> {
    try {
      const result = await signInWithEmailAndPassword(this.auth, email, pass);
      await this.syncUserToFirestore(result.user);
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
        await this.syncUserToFirestore(currentUser);
      }
    } catch (error) {
      console.error('Error updating game name:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.auth.signOut();
  }

  private async syncUserToFirestore(user: any) {
    if (!user) return;
    const userDoc = doc(this.firestore, 'users', user.uid);

    try {
      const snapshot = await getDoc(userDoc);
      const data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        lastLogin: new Date()
      };

      if (!snapshot.exists()) {
        await setDoc(userDoc, { ...data, createdAt: new Date() });
      } else {
        await setDoc(userDoc, data, { merge: true });
      }
    } catch (error) {
      console.error('Error syncing user to Firestore:', error);
      // Don't throw here to avoid blocking auth flow if DB is down/restricted
    }
  }
}
