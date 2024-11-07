import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.page.html',
  styleUrls: ['./calendario.page.scss'],
})
export class CalendarioPage implements OnInit {

  fecha :string = '';
  servicio:string='';

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=> {
      this.servicio = params['servicio'] || "";
  })
  }
  onLogoutButtonPressed(){
    this.router.navigate(["/login"])
  }

  onVolverAtras(){
    this.router.navigate(["/home-cliente"])
  }

  onAgendarDia(){
    if(this.fecha === ''){
      alert("Debes seleccionar una fecha")
    }else{
      this.router.navigate(["/seleccionar-hora"],{queryParams:{fecha:this.fecha,servicio:this.servicio}})
    }
  }

  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  onCapturarFecha(event:any){
    const fechaCapturada = new Date(event.detail.value)
    const dia = fechaCapturada.getDate()
    const mes = fechaCapturada.getMonth()
    const anio = fechaCapturada.getFullYear()
    const fecha = `${dia}/${mes}/${anio}`
    this.fecha=fecha
    console.log(fecha)
  }

}
