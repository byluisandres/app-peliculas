import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  constructor(private http: HttpClient) {}

  get parametros() {
    return {
      api_key: '4e5d0990973bb9d400910a2cc2c20688',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
    };
  }
  getCartelera(): Observable<CarteleraResponse> {
    return this.http.get<CarteleraResponse>(
      `${this.baseUrl}/movie/now_playing`,{params:this.parametros}
    ).pipe(
      tap(()=>{
        this.carteleraPage+=1;
      })
    );
  }
}
