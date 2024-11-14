import { Component, Injectable, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
// import {AngularFirestore} from "@angular/fire/compat/firestore"



@Component({
  selector: 'app-seleccionar-hora',
  templateUrl: './seleccionar-hora.page.html',
  styleUrls: ['./seleccionar-hora.page.scss'],
})
export class SeleccionarHoraPage implements OnInit {
  fecha : string = '';
  hora :string = '';
  servicio:string = '';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    // private firestore : AngularFirestore
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=> {
      this.fecha = params['fecha'] || "";
      this.servicio = params['servicio'] || '';
    })
  }
  onLogoutButtonPressed(){
    this.router.navigate(["/login"])
  }

  async onAgendarServicio(){
   
    const datosReserva = {
      "servicio":this.servicio,
      "fecha":this.fecha,
      "hora":this.hora
    }
    if(this.servicio !== '' && this.fecha !== '' && this.hora !== ''){
      try {
        alert("Cita agendada")
        // await this.firestore.collection("reservas").add(datosReserva)
        console.log(datosReserva)
        this.router.navigate(['/home-cliente']);
      } catch (error) {
        console.log('error al reservar la hora-> ', error);
      }
    }else{
      console.log("faltan datos para reservar el servicio")
    }
  }


  onVolverAtras(){
    this.router.navigate(["/calendario"])
  }

  onCapturarHora(event:any){
    this.hora = event.detail.value
    console.log(this.hora)
  }
}
