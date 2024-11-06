import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-seleccionar-hora',
  templateUrl: './seleccionar-hora.page.html',
  styleUrls: ['./seleccionar-hora.page.scss'],
})
export class SeleccionarHoraPage implements OnInit {
  fecha : string = '';
  hora :string = '';

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params=> {
      this.fecha = params['fecha'] || "";
  })
  }
  onLogoutButtonPressed(){
    this.router.navigate(["/login"])
  }

  onAgendarServicio(){
    alert("Cita agendada")
  }

  onVolverAtras(){
    this.router.navigate(["/calendario"])
  }

  onCapturarHora(event:any){
    this.hora = event.detail.value
    console.log(this.hora)
  }
}
