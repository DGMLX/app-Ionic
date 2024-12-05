import { Component, OnInit } from '@angular/core';
import { SessionManager } from '../../managers/sessionManager';
import { ReservasService } from 'src/managers/reservaService';
import { ModalController } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ReservaPage } from '../reserva/reserva.page';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

export class Reserva{
  id?:string;
  userId:string;
  fecha: string;
  servicio: string;
  hora: string;

  constructor(userId:string,fecha:string,servicio:string,hora:string,){
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

  constructor(private authService:SessionManager,private reservaService:ReservasService,private modalCtrl:ModalController,private router: Router,
    private route: ActivatedRoute) { }

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

  async abrirReserva(reserva:Reserva){
    const modal = await this.modalCtrl.create({
      component:ReservaPage,
      componentProps:{id:reserva.id},
      breakpoints: [0, 0.5, 0.8],
      initialBreakpoint: 0.6
    })

    await modal.present()
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      console.log(ev.detail.data);
    }
  }

  
  onLogoutButtonPressed(){
    this.router.navigate(["/login"])
  }

  onVolverAtras(){
    this.router.navigate(["/home-cliente"])
  }


}
