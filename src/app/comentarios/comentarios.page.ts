import { Component, OnInit } from '@angular/core';
import { comentariosService } from 'src/managers/comentariosServices';

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  comentarios: any[] = []
  constructor(
    private comentariosService: comentariosService 
  ) { }

  ngOnInit() {
    this.loadData()
  }
  

  loadData() {
    this.comentariosService.obtenerComentarios().subscribe(
      (response) => {
        console.log('Comentarios obtenidos:', response);
      },
      (error) => {
        console.error('Error al obtener los comentarios:', error);
      }
    );
  }
}
