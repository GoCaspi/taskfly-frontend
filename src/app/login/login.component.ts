import {Component, Self} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../serives/authentication.service";
import {ActivatedRoute, Router,} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {User} from "../user";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {Buffer} from "buffer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ListService} from "../serives/list.service";
import {LocalService, UserInfoData, UserLoginData} from "../serives/local.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})
export class LoginComponent {

  loginStatus: boolean | undefined = false;
  userEmail=""
  userPassword=""
  userid=""
  baseURL:string|undefined;


  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authservice: AuthenticationService,
              public route :ActivatedRoute,
              public router: Router,
              private toast: HotToastService,
              @Self() private sessionStorageService: BrowserStorageService,
              private http:HttpClient,
              private listService:ListService,
              private localService: LocalService
  ) {
    this.baseURL = process.env['NG_APP_PROD_URL']
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
/*
  loginUser() {

    this.authservice.login(this.userEmail,this.userPassword).subscribe(() =>{
                 this.localStorageService.set("email",this.userEmail);
                 this.localStorageService.set("password",this.userPassword)
                  this.router.navigate(['myday']).then(r =>console.log(r) )
            });
  }

  loginUser() {

    this.authservice.login(this.userEmail,this.userPassword).subscribe(() =>{
                 this.localStorageService.set("email",this.userEmail);
                 this.localStorageService.set("password",this.userPassword)
                 this.authservice.userInfo(this.userEmail,this.userPassword).subscribe((data) =>{
                   this.localStorageService.set("userid",data.id)
                 })
                  this.router.navigate(['myday']).then(r =>console.log(r) )
            });

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
  */
  loginUser() {
  //  let status = this.sessionStorageService.get("loginStatus");
let status = this.localService.getData("loginStatus")
    if(status == "false" || status == undefined){
      this.authservice.login(this.userEmail, this.userPassword).pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: 'There was an error'
        })
      ).subscribe(() =>{
        let userLoginDTO: UserLoginData = {email:this.userEmail,password:this.userPassword,loginStatus:"true"}
        this.localService.setUserLoginDTOToStore(userLoginDTO)
        console.log("USERLOGINDTO DTO: ",this.localService.getUserLoginDTOFromStore())
        /*
        this.sessionStorageService.set("email",this.userEmail)
        this.sessionStorageService.set("password",this.userPassword)
        this.sessionStorageService.set("loginStatus", "true")

         */
        this.authservice.userInfo(this.userEmail, this.userPassword).subscribe((data) =>{
          let userInfoDTO:UserInfoData = {loggedInUserId:data.id,firstName:data.firstName,lastName:data.lastName}
          this.localService.setUserInfoDTOToStore(userInfoDTO)
          console.log("USERINFODTO DTO: ",this.localService.getUserInfoDTOFromStore())
          /*
          this.sessionStorageService.set("loggedInUserId", data.id)
          this.sessionStorageService.set("firstName", data.firstName)
          this.sessionStorageService.set("lastName", data.lastName)

           */
          this.listService.toggleRenderList()
          this.listService.toggleRender()
        })

        this.router.navigate(['myday']).then(r =>console.log(r))
      });
      this.setUIdOfCurrentUser()

    }
  }

  setUIdOfCurrentUser(){
 //   let email= this.sessionStorageService.get("email")
    let email = this.localService.getData("email")
    if(email == undefined || email == ""){
      console.log("No email identified")
    } else {
   //   let cred =  "Basic " + Buffer.from(this.sessionStorageService.get("email") + ":" + this.sessionStorageService.get("password")).toString('base64')
      let cred =  "Basic " + Buffer.from(this.localService.getData("email") + ":" + this.localService.getData("password")).toString('base64')
      console.log("Identified email is :",email)
      console.log("Identified pwd is :",this.sessionStorageService.get("password"))


      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': cred
        })
      };
      this.http.get<User>( this.baseURL+"/user/userInfo?email=" + email,httpOptions).subscribe(data=>{
        console.log("test:", data.id);
     //   this.sessionStorageService.set("loggedInUserId",data.id);
        this.localService.saveData("loggedInUserId",data.id)
        console.log(this.sessionStorageService.get("loggedInUserId"))
        this.listService.toggleRenderList();
        this.listService.toggleRender()
      })

    }

//  this.listServicce.getAllListsByUserId(this.localStorageService.get("loggedInUserId")!).subscribe(listData =>{
//    console.log("ListDData from service",listData)
//  })
  }
}
