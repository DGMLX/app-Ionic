import { Component, Input, OnInit } from '@angular/core';
import { Reserva, ReservasService } from 'src/managers/reservaService';
import { ModalController } from '@ionic/angular';

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
  fecha:string
  hora:string 
  fechaReserva:string

  reservaActualizada :Reserva

  constructor(private reservaService:ReservasService,private modalCtrl:ModalController) { }
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

  onCapturarFecha(event:any){
    const fechaCapturada = new Date(event.detail.value)
    const dia = fechaCapturada.getDate()
    const mes = fechaCapturada.getMonth() +1
    const anio = fechaCapturada.getFullYear()
    const fecha = `${dia}/${mes}/${anio}`
    this.fecha=fecha
  }

  onCapturarHora(event:any){
    this.hora = event.detail.value
  }

  actualizarReserva(){
    console.log(this.fecha)
    console.log(this.hora)
 
    this.reservaActualizada = {
      id:this.reserva.id,
      userId:this.reserva.userId,
      fecha: this.fecha ? this.fecha : this.reserva.fecha,
      servicio: this.reserva.servicio,
      hora: this.hora ? this.hora : this.reserva.hora 
    }
    this.reservaService.actualizarReserva(this.reservaActualizada)
    alert("Editado correctamente")
    this.modalCtrl.dismiss()
  }

  eliminarReserva(){
    this.reservaService.eliminarReserva(this.id)
    alert("Eliminado correctamente")
    this.modalCtrl.dismiss()
  }

}
