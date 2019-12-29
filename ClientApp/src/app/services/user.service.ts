import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {

    this.myAppUrl = environment.appUrl;
    this.myApiUrl = 'api/Users/';
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.myAppUrl + this.myApiUrl)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  getUser(postId: number): Observable<User> {
    return this.http.get<User>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveUser(blogPost): Observable<User> {
    return this.http.post<User>(this.myAppUrl + this.myApiUrl, JSON.stringify(blogPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateUser(postId: number, blogPost): Observable<User> {
    return this.http.put<User>(this.myAppUrl + this.myApiUrl + postId, JSON.stringify(blogPost), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteUser(postId: number): Observable<User> {
    return this.http.delete<User>(this.myAppUrl + this.myApiUrl + postId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  
  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

}
