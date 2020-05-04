import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class AuthInterceptor implements HttpInterceptor{

    // This method will run BEFORE ou request lives the application
    intercept(request: HttpRequest<any>, next: HttpHandler) {

        console.log('request is on its way');
        console.log(request.url);

        const modifiedRequest = request.clone({headers: request.headers.append('Auth', 'xyz')});

        // This is what lets the request continue
        return next.handle(modifiedRequest);

        // You can also grab the url
        // request.url

        // const modifiedRequest = request.clone({url: 'some-new-url', headers: request.headers.append('...')});
    }
}
