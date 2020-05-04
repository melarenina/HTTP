import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})

export class AuthInterceptor implements HttpInterceptor{

    // This method will run BEFORE ou request lives the application
    intercept(request: HttpRequest<any>, next: HttpHandler) {

        const modifiedRequest = request.clone({headers: request.headers.append('Auth', 'xyz')});

        // This is what lets the request continue
        return next.handle(modifiedRequest);
        // return next.handle(request);

        // You can also grab the url
        // request.url

        // const modifiedRequest = request.clone({url: 'some-new-url', headers: request.headers.append('...')});
    }
}
