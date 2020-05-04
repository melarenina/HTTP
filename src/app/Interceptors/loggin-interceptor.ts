import { HttpInterceptor, HttpRequest, HttpHandler, HttpEventType } from '@angular/common/http';
import { url } from 'inspector';
import { pipe } from 'rxjs';
import { tap } from 'rxjs/operators';

export class LogginInterceptor implements HttpInterceptor{
    intercept(request: HttpRequest<any>, next: HttpHandler){
        console.log('Outgoing Request');
        console.log(request.url)
        return next.handle(request).pipe(
            tap(event => {
                if (event.type === HttpEventType.Response){
                    console.log('Incoming Response');
                    console.log(event.body);
                }
            })
        );
    }
}
