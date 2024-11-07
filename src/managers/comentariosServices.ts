import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class comentariosService {

  constructor(private http: HttpClient) {}

  obtenerComentarios() {
    const url = `https://jsonplaceholder.typicode.com/posts/1/comments`;
    return this.http.get(url);
  }


}