import {Component, SkipSelf} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../serives/authentication.service";
import {ActivatedRoute, Router,} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {User} from "../user";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {Buffer} from "buffer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ListService} from "../serives/list.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})
export class LoginComponent {
  user = new User();

  userEmail=""
  userPassword=""

  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authservice: AuthenticationService,
              public route :ActivatedRoute,
              public router: Router,
              private toast: HotToastService,
              @SkipSelf() private localStorageService: BrowserStorageService, private http:HttpClient, private listService:ListService
  ) {
  }

 /* testlogin() {
    let info = {
      password: this.testpassword,
      email: this.testemail
    }
    this.authservice.getLoginByEmail(info.password, info.email)
  }*/



  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser() {

    this.authservice.login(this.userEmail,this.userPassword).subscribe(() =>{
                 this.localStorageService.set("email",this.userEmail);
                 this.localStorageService.set("password",this.userPassword)
      this.setUIdOfCurrentUser()
      this.listService.toggleRenderList();this.listService.toggleRender();
                  this.router.navigate(['list']).then(_r =>{
                    this.setUIdOfCurrentUser()
                    window.location.reload()
                  })
            });
  }

  setUIdOfCurrentUser(){
    let email= this.localStorageService.get("email")
    if(email == undefined || email == ""){
      console.log("No email identified")
      return
    }

    let cred =  "Basic " + Buffer.from(this.localStorageService.get("email") + ":" + this.localStorageService.get("password")).toString('base64')
    console.log("Identified email is :",email)
    console.log("Identified pwd is :",this.localStorageService.get("password"))


    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': cred
      })
    };
    this.http.get<User>("http://localhost:8080/user/userInfo?email=" + email,httpOptions).subscribe(data=>{
      console.log(data.id);
      this.localStorageService.set("loggedInUserId",data.id);
      console.log(this.localStorageService.get("loggedInUserId"))
    })
    this.listService.toggleRenderList();
    this.listService.toggleRender()
//  this.listServicce.getAllListsByUserId(this.localStorageService.get("loggedInUserId")!).subscribe(listData =>{
//    console.log("ListDData from service",listData)
//  })
  }



}
