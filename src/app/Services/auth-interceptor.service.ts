import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
const USER_KEY = 'auth-user';
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userData = sessionStorage.getItem(USER_KEY);
    if (userData) {
      const user = JSON.parse(userData);
  const token = user.access_token;
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }

    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req);
  }
}
export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
  ];