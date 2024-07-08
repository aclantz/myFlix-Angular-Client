import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
// Material 
import { MatDialog } from '@angular/material/dialog';
import {MDCIconButtonToggle} from '@material/icon-button';




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

      let user = JSON.parse(localStorage.getItem("userInfo") || "");
            this.movies.forEach((movie: any) => {
                movie.isFavorite = user.favoritemovies.includes(movie._id);
            })
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

  modifyFavoriteMovies(movie: any): void {
    let userInfo = JSON.parse(localStorage.getItem("userInfo") || "");
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (userInfo.favoritemovies.includes(movie._id)) {
        this.fetchApiData.deleteFavMovies(movie._id).subscribe(res => {
            icon?.setAttribute("fontIcon", "favorite_border");

            console.log("del success")
            console.log(res);
            userInfo.favoritemovies = res.favoritemovies;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }, err => {
            console.error(err)
        })
    } else {
        // icon?.setAttribute("fontIcon", "favorite");
        // user.favoriteMovies.push(movie._id);
        // addFavoriteMovie return unauth, debugging
        this.fetchApiData.putFavMovies(movie._id).subscribe(res => {
            icon?.setAttribute("fontIcon", "favorite");

            console.log("add success")
            console.log(res);
            userInfo.favoritemovies = res.favoritemovies;
            localStorage.setItem("userInfo", JSON.stringify(userInfo));
        }, err => {
            console.error(err)
        })
    }
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
}

  

}
