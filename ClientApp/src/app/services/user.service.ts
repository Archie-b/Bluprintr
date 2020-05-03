import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { UserToken } from '../shared/UserToken';
import { User } from '../shared/user';
import { IService } from './service';

@Injectable()
export class UserService implements IService<User> {
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) { }
  add(item: User) {
    throw new Error("Method not implemented.");
  }
  getAll() {
    throw new Error("Method not implemented.");
  }

  get(id: string) {
    return this.http.get<any>(this.baseUrl + 'api/user/get/' + id, { observe: 'response' })
      .pipe(map(user => {
        return user.body;
      }));
  }

  login(user: User) {
    return this.http.post<any>('/api/user/Login', JSON.stringify(user))
      .pipe(map(user => {
        if (user['token']) {

          localStorage.setItem('token', JSON.stringify((new UserToken(user['token'], Date.now(), user['id']))));
        }
        return user;
      }));
  }

  signUp(user: User) {
    return this.http.post<any>(this.baseUrl + 'api/user/SignUp', JSON.stringify(user))
      .pipe(map(user => {
        if (user['token']) {
          localStorage.setItem('token', JSON.stringify((new UserToken(user['token'], Date.now(), user['id']))));
        }
        return user;
      }));
  }

  logout() {
    localStorage.removeItem('token');
  }

  updatePassword(user: User) {
    console.log(JSON.stringify(user));
    return this.http.post<any>(this.baseUrl + 'api/user/UpdatePassword', JSON.stringify(user))
      .pipe(map(success => {
        return success;
      }
      ));
  }
}
