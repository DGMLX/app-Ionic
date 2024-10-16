import { Component, inject } from '@angular/core';
import { FirestoreService } from './firebase/firestore.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private firestoreService = inject(FirestoreService);

  
  constructor() {}
}
