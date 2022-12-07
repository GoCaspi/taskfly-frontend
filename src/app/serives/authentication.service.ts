import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Buffer } from 'buffer';
import {BrowserStorageService} from "../storage.service";
import {User} from "../user";

@Injectable()
export class AuthenticationService {

  baseURL : string| undefined;

  constructor(private http:HttpClient, @Self() private sessionStorageService: BrowserStorageService) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
  }

  login(email: string | null | undefined, password: string | null | undefined){
    let cred =  "Basic " + Buffer.from(email +":"+ password).toString('base64')
    let headers_object = new HttpHeaders({
      "Authorization":cred
    });
    return  this.http.post(this.baseURL+"/user/login" ,{},{headers:headers_object,responseType:"text"});
  }

  userUpdate(firstName: string, lastName: string, email: string){
    /*let psw = this.sessionStorageService.get("password")
    let pswValue = "";
    if(psw != undefined){
      let cred =  "Basic " + Buffer.from(email +":"+ this.sessionStorageService.get("password")).toString('base64')
      let headers_object = new HttpHeaders({
        "Authorization":cred
      });
    }*/
    let userid = this.sessionStorageService.get("userid")

    let body: User = {
      "id": this.sessionStorageService.get("userid") || "",
      "srole": this.sessionStorageService.get("srole"),
      "password": this.sessionStorageService.get("password"),
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "body":{
        "team": this.sessionStorageService.get("team") || ""
      }
    }
    return this.http.put<User>(this.baseURL + "/user/" + userid, body)
  }

  userInfo(email: string | null | undefined, password: string | null | undefined){
    let cred =  "Basic " + Buffer.from(email +":"+ password).toString('base64')
    let headers_object = new HttpHeaders({
      "Authorization":cred
    });
    return this.http.get<User>(this.baseURL+"/user/userInfo?email="+ email,{headers:headers_object})
  }
}
