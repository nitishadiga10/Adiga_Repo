import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../services/login-service.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private loginService: LoginService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = this.loginService.currentuser;
        console.log('in interceptor');
        if (currentUser) {
            let token = currentUser.source['_value'] ? currentUser.source['_value']['jwt'] : "";
            if (token) {
                request = request.clone({
                    setHeaders: {
                        Authorization: `Bearer ${currentUser.source['_value']['jwt']}`
                    }
                });
            }
        }

        return next.handle(request);
    }
}