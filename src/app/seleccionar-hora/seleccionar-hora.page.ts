import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-seleccionar-hora',
  templateUrl: './seleccionar-hora.page.html',
  styleUrls: ['./seleccionar-hora.page.scss'],
})
export class SeleccionarHoraPage implements OnInit {

  constructor(private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
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
}
