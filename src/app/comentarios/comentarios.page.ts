import { Component, inject, OnInit } from '@angular/core';

import {Router} from "@angular/router";
import {ActivatedRoute} from "@angular/router";
import { ComentariosService } from '../../managers/comentariosService';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  comentarios:any = []
  comentariosNoAPI= [ {
    "nombre":"Felix Astudillo",
    "comentario":"Recomendado 100%, Gran equipo de trabajo con un local impecable."
},
{
    "nombre":"Diego Espinoza",
    "comentario":"Buen trato de los barberos y excelente servicio."
},
{
    "nombre":"Gonzalo Jeldes",
    "comentario":"Trabajo totalmente recomendado, los mejores de la región en cuanto a cortes de cabello."
},
{
    "nombre":"Tomás Torres",
    "comentario":"Trabajo de calidad, recomendado para niños, adultos y adolescentes. Gran servicio."
},
{
    "nombre":"Hans Bravo",
    "comentario":"En cuanto a calidad y trabajo, los mejores de la zona. Recomendado para todos los panas."
},
{
    "nombre":"Luis Salas",
    "comentario":"The best barber, los mejores en el rubro, recomiendo el servicio de excelencia y calidad que ofrecen."
},{
    "nombre":"Emilio Gallardo",
    "comentario":"Siempre dando lo mejor y con la mejor calidad a sus clientes, recomendados 100%, calidad garantizada."
},{
    "nombre":"Jaime Carriel",
    "comentario":"Lo mejor del mercado, sin duda alguna."
}
] 

  constructor(private router: Router,
    private route: ActivatedRoute
    ,private comentariosService: ComentariosService
  ) { }

  ngOnInit() {
    this.loadComentarios()
  }

  loadComentarios() {
    this.comentariosService.getComentarios().subscribe(
      (response) => {
        this.comentarios=response;
        console.log('Cometarios obtenidos:', response);
      },
      (error) => {
        console.error('Error al obtener los comentarios:', error);
      }
    );
  }

  onLogoutButtonPressed(){
    this.router.navigate(["/login"])
  }

  onVolverAtras(){
    this.router.navigate(["/home-cliente"])
  }
}
