import { Injectable } from '@angular/core';
import {Auth, authState, signInWithEmailAndPassword} from "@angular/fire/auth";
import {from} from "rxjs";

@Injectable()
export class AuthenticationService {

currentUser$ = authState(this.auth);

  constructor(private  auth:Auth) { }


  login(email: string | null | undefined, password: string | null | undefined){
    return from(signInWithEmailAndPassword(this.auth, <string>email,<string>password));
  }
  logout(){
    return from(this.auth.signOut());
  }
}
