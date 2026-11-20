import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  type User,
} from 'firebase/auth';
import { auth } from './config';

export function loginAdmin(email: string, password: string) {
  if (!auth) return Promise.reject(new Error('Firebase is not configured.'));
  return signInWithEmailAndPassword(auth, email, password);
}

export function logoutAdmin() {
  if (!auth) return Promise.resolve();
  return signOut(auth);
}

export function watchAuthState(callback: (user: User | null) => void) {
  if (!auth) {
    callback(null);
    return () => {};
  }
  return onAuthStateChanged(auth, callback);
}
