import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MovieInfoComponent } from '../movie-info/movie-info.component';
// Material 
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

  /**
   * Retrieve Movies Function
   * fetchAPIData.getAllMovies
   * @remarks function called to retrieve all movies and their data for movie-card display
   * @return {array} movies array
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      /**
       * isFavorite function
       * @remarks a way to define user favoriteMovies to display and save
       * @param {string} movie._id
       * @return isFavorite
       */
      let user = JSON.parse(localStorage.getItem("userInfo") || "");
            this.movies.forEach((movie: any) => {
                movie.isFavorite = user.favoritemovies.includes(movie._id);
            })
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * User Logout
   * Nav function
   */
  userLogout(): void {
    this.router.navigate(['welcome']);
    localStorage.removeItem('user');
  }
  /**
   * Profile Route
   * Nav Function 
   */
  profileRoute(): void {
    this.router.navigate(["profile"]);
  }

  /**
   * Genre info function
   * dialog
   * @remarks show specific Genre data
   * @param movie 
   * @return MovieInfoComponent + Genre data
   */
  genreInfo(movie: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Genre.Name,
        description: movie.Genre.Description,
      },
      width: '350px',
    });
  }
  /**
   * Director info function
   * dialog
   * @remarks show specific Director data
   * @param movie 
   * @return MovieInfoComponent + Director data
   */
  directorInfo(movie: any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Director.Name,
        description: movie.Director.Bio,
      },
      width: '350px',
    });
  }
  /**
   * Synopsis info function
   * dialog
   * @remarks show specific Synopsis data
   * @param movie 
   * @return MovieInfoComponent + Synopsis data
   */
  synopsisInfo(movie:any): void {
    this.dialog.open(MovieInfoComponent, {
      data: {
        title: movie.Title,
        description: movie.Description,
      },
      width: '350px',
    });
  }

  /**
   * favorite movie function
   * work in progress
   * @remarks add or remove movies form favoriteMovies array in user object
   * @param movie 
   */
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
