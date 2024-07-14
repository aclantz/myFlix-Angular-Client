import { Injectable } from '@angular/core';
//task 6.2
import { catchError } from 'rxjs/operators';//changed from 'rxjs/internal/operators' 
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl =
  'https://movie-api-project24-2fb853d4fde0.herokuapp.com/';

@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}

  /**
   * Error Handler
   * @remarks to handle errors for all consecutive API functions
   * @param error 
   * @returns status + message
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }


  /**
   * Non-typed Response extraction function
   * @param {object} res
   * @returns {object} empty
   * @returns body
   */
  private extractResponseData(res: object): any {
    const body = res;
    return body || {};
  }

  //----------------- ENDPOINTS ----------------------------------------------------------

  /**
   * User registration endpoint
   * POST /users
   * @param userDetails 
   * @returns success or error
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * User login endpoint
   * POST /login
   * @param userDetails 
   * @returns success or error
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * All movies endpoint
   * GET /movies
   * @remarks return entire array of movie objects
   * @returns {array} Movies 
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Add to favoriteMovies endpoint
   * PUT /users/{userName}/movies/{movieID}
   * @param {string} movieID 
   * @returns updated userInfo
   */
  public putFavMovies(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('userInfo.username');//updated from user instead of userInfo
    console.log('add favMovie test ->', {userName, token});
    return this.http
      .put(apiUrl + 'users/' + userName + '/movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Remove from favoriteMovies endpoint
   * DELETE /users/{userName}/movies/{movieID}
   * @param {string} movieID 
   * @returns updated userInfo
   */
  public deleteFavMovies(movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    console.log('del favMovie test ->', {userName, token});
    return this.http
      .delete(apiUrl + 'users/' + userName + '/movies/' + movieID, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Edit User endpoint
   * PUT /users/{userName}
   * @param userData 
   * @returns updated User
   */
  public putUserUpdate(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const userName = localStorage.getItem('user');
    console.log('test ->', {userName, token});

    return this.http
      .put(apiUrl + 'users/' + userName, userData,{
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Delete User endpoint
   * DELETE /users/{userName}
   * @returns success or error
   */
  public deleteUser(userName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + userName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(catchError(this.handleError));
  }

  //------------------------------------------------------------------------

   //NOT USED, added for lesson
  /**
   * Specific movie endpoint
   * GET /movies/{title}
   * @param {string} title
   * @returns {object} specific movie
   */
  public getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //NOT USED, added for lesson
  /**
   * Director endpoint
   * GET /movies/director/{directorName}
   * @param directorName 
   * @returns Director details
   */
  public getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + 'director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //NOT USED, added for lesson
  /**
   * Genre endpoint
   * GET /movies/Genre/{genreName}
   * @param genreName 
   * @returns Genre details
   */
  public getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + 'genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  //NOT USED, does not exist in API, added for lesson
  /**
   * Singular user endpoint
   * GET /users
   * @returns user info
   */
  public getUsers(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

}
