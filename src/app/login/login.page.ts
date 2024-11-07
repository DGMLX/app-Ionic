// file: login.page.ts
import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SessionManager } from '../manager/SessionManager';
import { AuthenticationService } from '../firebase/authentication.service';
import { Models } from '../models/models';
// import { StorageService } from 'src/managers/StorageService';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form!: FormGroup;
  user!: { email: string, password: string };
  formModel!: Models.Auth.DatosLogin;

  constructor(
    private router: Router,
    private sessionManager: SessionManager,
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    // private storageService: StorageService
  ) { 
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit() {}

  onRegisterButtonPressed() {
    this.router.navigate(["register"]);
  }

  onRecuperarPasswordButtonPressed() {
    this.router.navigate(["/recuperar-password"]);
  }

  async onHomeButtonPressed() {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      try {
        await this.authenticationService.logIn(email, password);
        // await this.storageService.set('userEmail', email)
        // await this.storageService.set('isSessionActive', true)
        this.router.navigate(["/home-cliente"],{queryParams:{email:email}});
      } catch (error) {
        console.error('Error during login:', error);
      }
    }
  }

  salir() {
    try {
      this.authenticationService.logOut();
    } catch (error) {
      console.error('Error during logout:', error);
    }
  }
}
