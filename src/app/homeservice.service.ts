import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {
  baseURL : string|undefined;

  constructor(private http: HttpClient) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
  }
  getHomeData(): Observable<any>{
    return this.http.get(""+this.baseURL);
  }
}
