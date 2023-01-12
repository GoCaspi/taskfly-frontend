import {Injectable, Self} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BrowserStorageService} from "../storage.service";
import {User} from "../user";


@Injectable()
export class SignUpService {
  baseURL : string| undefined;

  constructor(private http:HttpClient,
              @Self() private sessionStorageService: BrowserStorageService) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
  }

  createUser(firstName: string, lastName: string, email: string, password: string){
    let body: User = {
      "id": "",
      "firstName": firstName,
      "lastName": lastName,
      "password": password,
      "srole": "ROLE_WRITE",
      "email": email,
      "body":{
        "team": ""
      },
      "reseted": false
    }
    return this.http.post<User>(this.baseURL + "/user/create", body,{responseType:'json'})
  }
}
