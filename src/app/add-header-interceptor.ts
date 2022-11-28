import {Injectable, Self, SkipSelf} from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders
} from '@angular/common/http';

import { Observable } from 'rxjs';
import {BrowserStorageService} from "./storage.service";

/** Edit  the request and pass through to the next request handler. */

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

constructor(@Self() private sessionStorageService: BrowserStorageService,
            @SkipSelf() private localStorageService: BrowserStorageService) {
}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.

    let testauth = "Basic " + btoa(this.localStorageService.get("email") + ":" + this.localStorageService.get("password"));

    let headers_object = new HttpHeaders({
      "Authorization" : testauth
    });
    const authReq = req.clone({
      headers: req.headers.set("authorization", testauth)
    });
    return next.handle(authReq);
  }
}
