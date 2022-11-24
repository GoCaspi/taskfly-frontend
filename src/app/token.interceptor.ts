import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthenticationService} from "./serives/authentication.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {


  constructor(private account: AuthenticationService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    console.log('url ==>',request.url);

    if (!request.url.endsWith('user.json')){
      const headers = request.headers.set("token",this.account.getToken());
      const newRequest = request.clone({headers});

      console.log(newRequest.headers);
      return next.handle(newRequest);
    }else {
      return next.handle(request);
    }
  }
}
