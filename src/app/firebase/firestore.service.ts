import { inject, Injectable } from '@angular/core';
import { Firestore } from '@angular/fire/firestore';
import { collection, addDoc } from "firebase/firestore"; 
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  firestore: Firestore = inject(Firestore)

  constructor() {

    console.log('FirestoreService');
    this.CrearUsuario();
    this.login();
   }

   //CRUD
  
   async CrearUsuario(){
    console.log('Creando Usuario')
    
   }

   async login(){
    console.log('logeando Usuario')
   }
}
