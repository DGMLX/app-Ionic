import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})

export class ComentariosService {
    private baseUrl = "https://jsonplaceholder.typicode.com/posts/1/comments";
  
    constructor(private http: HttpClient) {}

    getComentarios() {
        const url = this.baseUrl;
        return this.http.get(url);
      }
}