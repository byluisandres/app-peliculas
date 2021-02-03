import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private carteleraPage = 1;
  public cargando = false;
  constructor(private http: HttpClient) {}

  get parametros() {
    return {
      api_key: '4e5d0990973bb9d400910a2cc2c20688',
      language: 'es-ES',
      page: this.carteleraPage.toString(),
    };
  }
  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      //cargando películas
      return of([]);
    }

    this.cargando = true;
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: this.parametros,
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.carteleraPage += 1;
          this.cargando = false;
        })
      );
  }
  resetCarteleraPage() {
    this.carteleraPage = 1;
  }
  buscarPeliculas(textBuscar: string): Observable<Movie[]> {
    const params = { ...this.parametros, page: '1', query: textBuscar };
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
        params,
      })
      .pipe(map((respuesta) => respuesta.results));
  }
}
