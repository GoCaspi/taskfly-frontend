import { Injectable } from '@angular/core';
import {User} from "./user";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http:HttpClient) { }
  public loginUserFromRemote(user:User):Observable<any>{
   let email = "alpha-beta@gmail.com";
   let headers= new HttpHeaders();
   let password ="0123";
   console.log("Test")
    headers.append('Authorization', 'Basic ' + btoa(email+':'+password));
    return this.http.post<any>("http://localhost:8080/user/login",null,{headers:headers});

  }
}
