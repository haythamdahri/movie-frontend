import {Injectable, OnInit} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Settings} from './settings.service';
import {User} from '../models/user.model';
import {catchError, map, retry} from 'rxjs/operators';

interface UserInterface {
  email: string;
  password: string;
}


@Injectable()
export class AuthenticationService implements OnInit {

  user: User = null;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
  }

  /*
  * Login method
  * */
  login(data: UserInterface): Observable<any> {
    return this.http.post(Settings.LOGIN_URL, data, {
      observe: 'response'
    });
  }

  // Logout user by removing token from local storage after user logout from backend server
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    this.user = null;
  }

  // Save token on localStorage to keep user connected either with page refresh
  saveToken(jwt: string, email: string) {
    localStorage.setItem('token', jwt);
    localStorage.setItem('email', email);
    this.saveUser(email);
  }

  // Retrieve the stored token
  getToken() {
    return localStorage.getItem('token');
  }

  // Returns true if user is authenticated
  isAuthenticated() {
    if (localStorage.getItem('email') != null && localStorage.getItem('token') != null) {
      if (this.user == null) {
        return this.saveUser(localStorage.getItem('email'));
      }
      return true;
    }
    return false;
  }

  // Get current user
  getUser() {
    return this.saveUser(localStorage.getItem('email'));
  }

  // Save authenticated user
  saveUser(email: string) {
    return this.http.get<User>(Settings.USER_BY_EMAIL_URL, {
      params: new HttpParams().append('email', email),
      headers: new HttpHeaders().append('Authorization', this.getToken()),
      observe: 'body'
    }).pipe(
      map(
        (user) => {
          return user;
        }
      ),
      catchError(this.handleError),
      retry<any>(5)
    );
  }

  // Handle http errors
  private handleError(error: HttpErrorResponse) {
    return throwError(error);
  }
}
