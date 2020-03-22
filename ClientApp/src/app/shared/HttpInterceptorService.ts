import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.reportProgress == false) {
      request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
      request = request.clone({ headers: request.headers.set('Accept', 'application/json') })
    }

    if (localStorage.getItem('token')) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'bearer ' + JSON.parse(localStorage.getItem('token')).token)
      });
    }
    return next.handle(request);
  }
}
