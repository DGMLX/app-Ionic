import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { SessionManager } from '../manager/SessionManager';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private router: Router,
    private sessionManager:SessionManager
  ) { }

  user: string = '';
  password: string = '';

  ngOnInit() {
    ''
  }
  onRegisterButtonPressed(){
    this.router.navigate(["register"])
  }

  onRecuperarPasswordButtonPressed(){
    this.router.navigate(["/recuperar-password"])
  }

  onHomeButtonPressed(){
    
    if(this.sessionManager.performLogin(this.user,this.password)){
      this.router.navigate(['/home-cliente'],{queryParams:{user:this.user}})
    }
    else if(this.sessionManager.performLoginAdmin(this.user,this.password)){
      this.router.navigate(['/home-admin'],{queryParams:{user:this.user}})
    }else{
      alert("Las credenciales no son validas")
    }
  }

}

// file: login.page.ts
// import { Component, OnInit } from '@angular/core';
// import { Router } from "@angular/router";
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// import { SessionManager } from '../manager/SessionManager';
// import { AuthenticationService } from '../firebase/authentication.service';
// import { Models } from '../models/models';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
// })
// export class LoginPage implements OnInit {
//   form!: FormGroup;
//   user!: { email: string, password: string };
//   formModel!: Models.Auth.DatosLogin;

//   constructor(
//     private router: Router,
//     private sessionManager: SessionManager,
//     private fb: FormBuilder,
//     private authenticationService: AuthenticationService
//   ) { 
//     this.form = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]],
//     });
//   }

//   ngOnInit() {}

//   onRegisterButtonPressed() {
//     this.router.navigate(["register"]);
//   }

//   onRecuperarPasswordButtonPressed() {
//     this.router.navigate(["/recuperar-password"]);
//   }

//   async onHomeButtonPressed() {
//     if (this.form.valid) {
//       const { email, password } = this.form.value;
//       try {
//         await this.authenticationService.logIn(email, password);
//         this.router.navigate(["/home-cliente"]);
//       } catch (error) {
//         console.error('Error during login:', error);
//       }
//     }
//   }

//   salir() {
//     try {
//       this.authenticationService.logOut();
//     } catch (error) {
//       console.error('Error during logout:', error);
//     }
//   }
// }

