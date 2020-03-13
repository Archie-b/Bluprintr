import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserToken } from './shared/UserToken';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    return this.http.post<any>('/api/login', { username: username, password: password })
      .pipe(map(user => {
        if (user['token']) {
          localStorage.setItem('token', JSON.stringify((new UserToken(user['token'], Date.now()))));
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }
}
