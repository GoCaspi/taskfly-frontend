import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Buffer } from 'buffer';
import {from} from "rxjs";
import {Auth, authState} from "@angular/fire/auth";



@Injectable()
export class AuthenticationService {

  baseURL : string| undefined;
  currentUser$ = authState(this.auth)


  constructor(private http:HttpClient, private  auth: Auth) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
  }


  login(email: string | null | undefined, password: string | null | undefined){
    let cred =  "Basic " + Buffer.from(email +":"+ password).toString('base64')
    let headers_object = new HttpHeaders({
      "Authorization":cred
    });
    return  this.http.post(this.baseURL+"/user/login" ,{},{headers:headers_object,responseType:"text"});
  }
  logout(){
    return from(this.auth.signOut());
  }


}
