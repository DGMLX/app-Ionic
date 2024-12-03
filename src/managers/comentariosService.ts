import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})

export class ComentariosService {
    // private baseUrl = "https://jsonplaceholder.typicode.com/posts/1/comments";
    private baseUrl = "http://localhost:4000/api/comentarios/barber"
  
    constructor(private http: HttpClient) {}

    getComentarios() {
        const url = this.baseUrl;
        return this.http.get(url);
      }
}