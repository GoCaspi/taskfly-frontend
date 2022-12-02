import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Buffer } from 'buffer';


@Injectable()
export class AuthenticationService {


  constructor(private http:HttpClient) { }


  login(email: string | null | undefined, password: string | null | undefined){
    let cred =  "Basic " + Buffer.from(email +":"+ password).toString('base64')
    let headers_object = new HttpHeaders({
      "Authorization":cred
    });

   return  this.http.post("http://taskflybackend.westeurope.azurecontainer.io:80/user/login" ,{},{headers:headers_object,responseType:"text"});

  }

}
