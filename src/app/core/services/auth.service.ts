import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {environment as env} from 'environments/environment';

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {}

  logIn(username: string, password: string): Observable<any> {
    const url = `${env.backendBaseUrl}/oauth/token`;
    return this.http.post(url, {username, password, grant_type: 'password', client_id: env.oAuthClientID, client_secret: env.oAuthClientSecret}, {headers: this.nonAuthHeaders()});
  }

  nonAuthHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
        'Accept':'application/vnd.api.v1+json',
        'Content-Type': 'application/json',
    });
    return headers;
  }

  authHeaders(): HttpHeaders {
    const headers = new HttpHeaders({
      'Accept':'application/vnd.api.v1+json',
      'Content-Type': 'application/json',
    });
    return headers;
  }

  /*signUp(email: string, password: string): Observable<User> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, {email, password});
  }*/
}