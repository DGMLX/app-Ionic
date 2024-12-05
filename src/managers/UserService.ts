import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { BehaviorSubject } from 'rxjs';
import { AuthenticationService } from 'src/app/firebase/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userProfileSubject = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject.asObservable();

  constructor(
    private firestore: AngularFirestore,
    private authService: AuthenticationService
  ) {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.firestore.collection('users').doc(user.uid).valueChanges().subscribe(profile => {
          this.userProfileSubject.next(profile);
        });
      }
    });
  }

  updateUserProfileImage(imageUrl: string) {
    this.authService.user$.subscribe(user => {
      if (user) {
        this.firestore.collection('users').doc(user.uid).update({ imageUrl });
      }
    });
  }
}