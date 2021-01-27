import { Component, HostListener, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/cartelera-response';
import { PeliculasService } from 'src/app/services/peliculas.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  moviesSlideshow: Movie[] = [];
  @HostListener('window:scroll', ['$event']) onWindowScroll() {
    const pos =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1500;
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;
    if (pos > max) {
      this.peliculasService.getCartelera().subscribe(respuesta=>{
this.movies.push(...respuesta.results);
      })
    }
  }
  constructor(private peliculasService: PeliculasService) {}

  ngOnInit(): void {
    this.peliculasService.getCartelera().subscribe((resp) => {
      this.movies = resp.results;
      this.moviesSlideshow = resp.results;
    });
  }
}
