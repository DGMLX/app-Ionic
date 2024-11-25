import { Component, OnInit } from '@angular/core';
import { SessionManager } from '../../managers/sessionManager';
import { ReservasService } from 'src/managers/reservaService';
import { ModalController } from '@ionic/angular';

export class Reserva{
  id?:string;
  userId:string;
  fecha: string;
  servicio: string;
  hora: string;

  constructor(userId:string,fecha:string,servicio:string,hora:string){
      this.userId = userId;
      this.fecha = fecha;
      this.hora = hora;
      this.servicio = servicio;
  }
}



@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.page.html',
  styleUrls: ['./reservas.page.scss'],
})

export class ReservasPage implements OnInit {
  userId:any
  reservas :Reserva[] = []

  constructor(private authService:SessionManager,private reservaService:ReservasService,private modalCtrl:ModalController) { }

  ngOnInit() {
    this.authService.getProfile().then(user=>{
      this.userId=user?.uid
      console.log(this.userId)
      this.reservaService.obtenerReserva(this.userId).subscribe(res=>{
        this.reservas = res
        console.log(this.reservas)
      })
    })
  }

  async abrirModal(){
    const modal = await this.modalCtrl
  }

}
