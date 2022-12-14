import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Buffer } from 'buffer';



@Injectable()
export class AuthenticationService {

  baseURL : string| undefined;
  constructor(private http:HttpClient) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
  }


  login(email: string | null | undefined, password: string | null | undefined){
    let cred =  "Basic " + Buffer.from(email +":"+ password).toString('base64')
    let headers_object = new HttpHeaders({
      "Authorization":cred
    });

    return  this.http.post(this.baseURL+"/user/login" ,{},{headers:headers_object,responseType:"text"});

  }



}
