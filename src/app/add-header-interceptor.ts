import {Injectable, Self, SkipSelf} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,} from '@angular/common/http';
import { Buffer } from 'buffer';
import { Observable } from 'rxjs';
import {BrowserStorageService} from "./storage.service";

/** Edit  the request and pass through to the next request handler. */

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {
BASE_URL:string|undefined ="";
constructor(@Self() private sessionStorageService: BrowserStorageService,
            @SkipSelf() private localStorageService: BrowserStorageService) {
 this.BASE_URL = process.env['NG_APP_PROD_URL'];
}
  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

   let cred =  "Basic " + Buffer.from(this.localStorageService.get("email") + ":" + this.localStorageService.get("password")).toString('base64')


    const authReq = req.clone({
     url: `${this.BASE_URL}/${req.url}`,
      headers: req.headers.set("authorization", cred)
    });

    return next.handle(authReq);
  }
}
