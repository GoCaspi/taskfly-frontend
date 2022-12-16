import {Injectable, Self} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { Buffer } from 'buffer';
import {BrowserStorageService} from "../storage.service";
import {User} from "../user";
import {Team} from "../team";

/**
 * class of AuthenticationService
 */
@Injectable()

export class AuthenticationService {

  baseURL : string| undefined;

  constructor(private http:HttpClient, @Self() private sessionStorageService: BrowserStorageService) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
  }

  /**
   * Here the login point is called with the email address and with the password that was passed in the parameters.
   * @param email
   * @param password
   */
  login(email: string, password: string){
    let cred =  "Basic " + Buffer.from(email +":"+ password).toString('base64')
    let headers_object = new HttpHeaders({
      "Authorization":cred
    });
    return  this.http.post(this.baseURL+"/user/login" ,{},{headers:headers_object,responseType:"text"});
  }

  /**
   * Here the update endpoint for the user is called. first the id of the loggedin user is stored in a variable to
   * know which user should be updated. Then the body is passed with the fields that should be updated
   * @param firstName
   * @param lastName
   * @param email
   */
  userUpdate(firstName: string, lastName: string, email: string){
    let userid = this.sessionStorageService.get("loggedInUserId")

    let body: User = {
      "id": this.sessionStorageService.get("loggedInUserId") || "",
      "srole": this.sessionStorageService.get("srole"),
      "password": null,
      "reseted": false,
      "firstName": firstName,
      "lastName": lastName,
      "email": email,
      "body":{
        "team": this.sessionStorageService.get("team") || ""
      }
    }
    return this.http.put<User>(this.baseURL + "/user/" + userid, body, {responseType:"json"})
  }

  /**
   * Here the endpoint is called to create a team. First the id of the logged in user is stored in a variable.
   * The ID is needed here to know who is the owner of the team. After that the fields that are necessary for
   * the creation of a team are filled in the body.
   * @param teamName
   * @param member
   */
  createTeam(teamName: string, member: string[]){
    let userid = this.sessionStorageService.get("loggedInUserId") || ""

    let body: Team ={
      "userID": userid,
      "teamName": teamName,
      "members": member,
    }
    return this.http.post<Team>(this.baseURL + "/teammanagement", body,{responseType:'json'})
  }

  /**
   * In the method the endpoint is called to get the info about the logged in user
   * @param email
   * @param password
   */
  userInfo(email: string , password: string){
    let cred =  "Basic " + Buffer.from(email +":"+ password).toString('base64')
    let headers_object = new HttpHeaders({
      "Authorization":cred
    });
    return this.http.get<User>(this.baseURL+"/user/userInfo?email="+ email,{headers:headers_object})
  }
}
