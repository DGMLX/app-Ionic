import { Injectable, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  auth: Auth = inject(Auth);
  authState = authState(this.auth);

  // Observable que emite el usuario autenticado
  user$: Observable<any>;
  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  constructor(private firestore: AngularFirestore) {
    this.user$ = this.authState.pipe(
      map(user => {
        if (user) {
          this.firestore.collection('users').doc(user.uid).valueChanges().subscribe(profile => {
            this.userProfileSubject.next(profile);
          });
          return {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL
          };
        } else {
          return null;
        }
      })
    );
  }

  async createUser(email: string, password: string) {
    const user = await createUserWithEmailAndPassword(this.auth, email, password);
    return user;
  }

  getCurrentUser() {
    return this.auth.currentUser;
  }

  async logIn(email: string, password: string) {
    const user = await signInWithEmailAndPassword(this.auth, email, password);
    return user;
  }

  logOut() {
    signOut(this.auth);
  }

  updateUserProfileImage(imageUrl: string) {
    this.user$.subscribe(user => {
      if (user) {
        this.firestore.collection('users').doc(user.uid).update({ imageUrl });
      }
    });
  }
}