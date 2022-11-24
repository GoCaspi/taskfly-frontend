import { Injectable } from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword, user} from "@angular/fire/auth";
import {from} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable()
export class AuthenticationService {

currentUser$ = authState(this.auth);

  constructor(private  auth:Auth,private http:HttpClient) { }


  login(email: string | null | undefined, password: string | null | undefined){
    this.getLoginByEmail(email,password);
    return from(signInWithEmailAndPassword(this.auth, <string>email, <string>password));
  }
  logout(){
    return from(this.auth.signOut());
  }

  getLoginByEmail(email:string | null | undefined , password: string | null | undefined){
    let newbady = {

      "email":email,
      "password":password
    }
    let newbadystring = JSON.stringify(newbady)

    let headers_object = new HttpHeaders();
    headers_object.append('Content-Type', 'application/json');

    headers_object.append("Authorization", "Basic " + btoa(newbadystring));

    const httpOptions = {
      headers: headers_object

    };
    this.http.post("http://localhost:8080/user/login" , newbadystring, httpOptions).subscribe(r => console.log(r))

  }

}
