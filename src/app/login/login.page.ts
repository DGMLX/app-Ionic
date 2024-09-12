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
    }else{
      alert("Las credenciales no son validas")
    }
  }

}
