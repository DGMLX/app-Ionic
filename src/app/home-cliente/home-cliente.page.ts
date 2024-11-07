import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-home-cliente',
  templateUrl: './home-cliente.page.html',
  styleUrls: ['./home-cliente.page.scss'],
})

export class HomeClientePage implements OnInit {
  user:string = "";
  servicio:string = '';
  constructor(private router: Router,
    private route: ActivatedRoute
  ) { }
  
  ngOnInit() {
      this.route.queryParams.subscribe(params=> {
        this.user = params['user'] || "";
    })
  }
  onLogoutButtonPressed(){
    this.router.navigate(["/login"])
  }

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



}
