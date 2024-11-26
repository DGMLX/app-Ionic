import { Component, Input, OnInit } from '@angular/core';
import { Reserva, ReservasService } from 'src/managers/reservaService';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  @Input() id : string
  reserva : Reserva

  dia:string
  mes:string
  horaReservada:string

  fechaReserva:string

  constructor(private reservaService:ReservasService) { }
  ngOnInit() {
    console.log(this.id)
    this.reservaService.obtenerReservaId(this.id).subscribe(res=>{
      this.reserva = res
      console.log(this.reserva.hora)

      this.dia = this.reserva.fecha.split('/')[0]
      this.mes = this.reserva.fecha.split('/')[1]
      if(this.dia.length == 1){
        this.dia = '0' + this.dia
      }
      if(this.mes.length == 1){
        this.mes = '0' + this.mes
      }

      this.fechaReserva = this.reserva.fecha.split('/')[2] + '-' + this.mes + '-' + this.dia

      this.horaReservada = this.reserva.hora + ':00'
    })
  }

  actualizarReserva(){
    this.reservaService.actualizarReserva(this.reserva)
  }

  eliminarReserva(){
    this.reservaService.eliminarReserva(this.id)
  }

}
