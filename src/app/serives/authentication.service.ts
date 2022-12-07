import {Injectable, Self, SkipSelf} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Buffer } from 'buffer';
import {User} from "../user";
import {BrowserStorageService} from "../storage.service";


@Injectable()
export class AuthenticationService {

  baseURL : string| undefined;
  constructor(private http:HttpClient,
  ){
    this.baseURL = process.env['NG_APP_PROD_URL'];
  }


  login(email: string , password: string ){
    let cred =  "Basic " + Buffer.from(email +":"+ password).toString('base64')
    let headers_object = new HttpHeaders({
      "Authorization":cred
    });

    return  this.http.post(this.baseURL+"/user/login" ,{},{headers:headers_object,responseType:"text"});

  }
  userInfo(email: string ,password: string ){
    let cred =  "Basic " + Buffer.from(email +":"+password).toString('base64')
    let headers_object = new HttpHeaders({
      "Authorization":cred
    });
    return  this.http.get<User>(this.baseURL+"/user/userInfo?email="+email,{headers:headers_object});
  }
kollectionUser(name: string,userid: string ){

    let cred = "Basic" + Buffer.from(name+":"+userid).toString('base64')
    let headers_object = new HttpHeaders({
      "Authorization":cred
    });
    let userId= this.http.get("userId")
    var body = {
      "name": name,
      "ownerID": userid ,
    }

    return  this.http.post<User>(this.baseURL+"/user/tc"+userid,body);
  }

}
