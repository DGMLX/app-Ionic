import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-recuperar-password',
  templateUrl: './recuperar-password.page.html',
  styleUrls: ['./recuperar-password.page.scss'],
})
export class RecuperarPasswordPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onRegisterButtonPressed(){
    this.router.navigate(["/register"])
  }

  onLoginButtonPressed(){
    this.router.navigate(["/login"])
  }


}
