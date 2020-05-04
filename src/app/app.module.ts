import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthInterceptor } from './Interceptors/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    { // Token
      provide: HTTP_INTERCEPTORS,
      // Interceptor
      useClass: AuthInterceptor,
      // You can have multiple interceptors
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
