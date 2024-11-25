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

  constructor(private reservaService:ReservasService) { }
  ngOnInit() {
    console.log(this.id)
    this.reservaService.obtenerReservaId(this.id).subscribe(res=>{
      this.reserva = res
    })
  }

  actualizarReserva(){
    this.reservaService.actualizarReserva(this.reserva)
  }

  eliminarReserva(){
    this.reservaService.eliminarReserva(this.id)
  }

}
