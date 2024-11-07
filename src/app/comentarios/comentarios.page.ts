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
