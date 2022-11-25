import { Injectable } from '@angular/core';

import {from, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {User} from "../user";

@Injectable()
export class AuthenticationService {


  constructor(private http:HttpClient) { }

public loginUserFromRemote(user :User):Observable<any>{
    return this.http.post("http://localhost:8080/user/login",user)
}
  login(email: string | null | undefined, password: string | null | undefined){

    let headers_object = new HttpHeaders();
    headers_object.append("Authorization", "Basic " + btoa(email +":"+ password));
    const httpOptions = {
      headers: headers_object
    };
   return  this.http.post<any>("http://localhost:8080/user/login" ,null,{headers:headers_object});
  }

  logout(){}

  getLoginByEmail(email:string | null | undefined , password: string | null | undefined){

    let headers_object = new HttpHeaders();

    headers_object.append("Authorization", "Basic " + btoa(email +":"+ password));

    this.http.get("http://localhost:8080/user").subscribe(r=>console.log(r))


  }

}
