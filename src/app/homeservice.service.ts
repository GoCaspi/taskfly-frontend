import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HomeserviceService {

  constructor(private http: HttpClient) { }
  getHomeData(): Observable<any>{
    return this.http.get('https://taskflybackend.azurewebsites.net');
  }
}
