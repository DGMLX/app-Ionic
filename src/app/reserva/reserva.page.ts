import { Component, Input, OnInit } from '@angular/core';
import { ReservasService } from 'src/managers/reservaService';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {
  @Input() id : string

  constructor(private reservaService:ReservasService) { }
  ngOnInit() {
    console.log(this.id)
    this.reservaService.obtenerReservaId(this.id)
  }

}
