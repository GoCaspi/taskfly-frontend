import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";


@Injectable()
export class AuthenticationService {


  constructor(private http:HttpClient) { }


  login(email: string | null | undefined, password: string | null | undefined){
    let testauth = "Basic " + btoa(email +":"+ password);

    let headers_object = new HttpHeaders({
      "Authorization":testauth
    });

   return  this.http.post("http://localhost:8080/user/login" ,{},{headers:headers_object,responseType:"text"});

  }

  logout(){}

  getLoginByEmail(email:string | null | undefined , password: string | null | undefined){

    let headers_object = new HttpHeaders();

    headers_object.append("Authorization", "Basic " + btoa(email +":"+ password));

    this.http.get("http://localhost:8080/user").subscribe(r=>console.log(r))


  }

}
