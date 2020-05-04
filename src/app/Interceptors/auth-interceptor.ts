import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})

export class AuthInterceptor implements HttpInterceptor{

    // This method will run BEFORE ou request lives the application
    intercept(request: HttpRequest<any>, next: HttpHandler) {

        // You can also grab the url
        // request.url

        console.log('request is on its way');

        // This is what lets the request continue
        return next.handle(request);
    }
}
