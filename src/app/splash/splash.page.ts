import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
// import { StorageService } from 'src/managers/StorageService';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
})
export class SplashPage implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
    setTimeout(()=>{
       this.router.navigate(["/login"])
    },1100)
  }

  // async ionViewDidEnter() {
  //   this.checkSession()
  // }
  // async checkSession() {
  //   const sessionStatus = await this.storageService.get('isSessionActive')
  //   if (sessionStatus) {
  //     this.router.navigate(['/home-cliente'])
  //   } else {
  //     this.router.navigate(['/login'])
  //   }
  // }

}
