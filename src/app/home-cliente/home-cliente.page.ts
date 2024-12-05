import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ActivatedRoute } from "@angular/router";
import { SessionManager } from "../../managers/sessionManager";
import { UserService } from 'src/managers/UserService';

@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})

export class HomeClientePage implements OnInit {
  userId: any;
  email: string = "";
  photoURL: string = 'assets/foto_perfil.jpg';
  servicio: string = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: SessionManager,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.authService.getProfile().then(user => {
      this.userId = user?.uid;
      console.log(this.userId);
    });

    this.route.queryParams.subscribe(params => {
      this.email = params['email'] || "";
    });

    this.userService.userProfile$.subscribe(profile => {
      if (profile) {
        this.photoURL = profile.imageUrl || this.photoURL;
      }
    });
  }
  async onLogoutButtonPressed(){
    // await this.storageService.clear()
    this.router.navigate(["/login"])
  }

  // async loadData() {
  //   const userEmail = await this.storageService.get('userEmail')
  //   this.user = userEmail
  // }

  onPressDegradadoAdulto(){
    this.servicio = 'Degradado adulto'
    this.router.navigate(["/calendario"],{queryParams:{servicio:this.servicio}})
  }

  onPressPerfiladoBarba(){
    this.servicio = 'Perfilado Barba'
    this.router.navigate(["/calendario"],{queryParams:{servicio:this.servicio}})
  }

  onPressPerfiladoCejas(){
    this.servicio = 'Perfilado Cejas'
    this.router.navigate(["/calendario"],{queryParams:{servicio:this.servicio}})
  }

  onPressTenidoPelo(){
    this.servicio = 'Teñido Pelo'
    this.router.navigate(["/calendario"],{queryParams:{servicio:this.servicio}})
  }

  onPressDegradadoInfantil(){
    this.servicio = 'Degradado Infantil'
    this.router.navigate(["/calendario"],{queryParams:{servicio:this.servicio}})
  }

  onPressPromo(){
    this.servicio = 'Promocion'
    this.router.navigate(["/calendario"],{queryParams:{servicio:this.servicio}})
  }

  onPressComentarios(){
    this.router.navigate(["/comentarios"])
  }

  onPressReservas(){
    this.router.navigate(["/reservas"])
  }


  onPressUbicacion(){
    this.router.navigate(["/ubicacion"])
  }

  onPressProfile(){
    this.router.navigate(["/profile"])
  }

}
