import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
import { MatDialog } from '@angular/material/dialog';



@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
  ) {}

  // called when angular is done creating the component
  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  //Nav functions
  userLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }
  profileRoute(): void {
    this.router.navigate(["profile"]);
  }

  //dialog functions
  genreInfo(movie: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Genre.Name,
        description: movie.Genre.Description,
      },
      width: '350px',
    });
  }
  directorInfo(movie: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Director.Name,
        description: movie.Director.Bio,
      },
      width: '350px',
    });
  }
  synopsisInfo(movie:any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Title,
        description: movie.Description,
      },
      width: '350px',
    });
  }

}
