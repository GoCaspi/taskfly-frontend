import {Component, OnInit} from '@angular/core';
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
export class LoginComponent implements OnInit{

  loginStatus: boolean | undefined = false;
  userEmail=""
  userPassword=""
  userid=""
  baseURL:string|undefined;
  alreadyLogin: boolean = false;

   hide = true;
  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authservice: AuthenticationService,
              public route :ActivatedRoute,
              public router: Router,
              private toast: HotToastService,
         //     @Self() private sessionStorageService: BrowserStorageService,
              private http:HttpClient,
              private listService:ListService,
              private localService: LocalService
  ) {
    this.baseURL = process.env['NG_APP_PROD_URL']
  }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }
  loginUser() {
    let status = this.localService.getData("loginStatus")

    if(status == "false" || status == undefined || status == ""){
      this.authservice.login(this.userEmail, this.userPassword).pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: 'Email and Password that not match'
        })
      ).subscribe(() =>{
        let userLoginDTO: UserLoginData = {email:this.userEmail,password:this.userPassword,loginStatus:"true"}
        this.localService.setUserLoginDTOToStore(userLoginDTO)
        this.authservice.userInfo(this.userEmail, this.userPassword).subscribe((data) =>{
          let userInfoDTO:UserInfoData = {loggedInUserId:data.id,firstName:data.firstName,lastName:data.lastName}
          this.localService.setUserInfoDTOToStore(userInfoDTO)
          this.listService.toggleRenderList()
          this.listService.toggleRender()
        })

        this.router.navigate(['myday']).then(r =>console.log(r))
      });
      this.setUIdOfCurrentUser()

    }
  }
  setUIdOfCurrentUser(){

    let email = this.localService.getData("email")
    if(email == undefined || email == ""){
      console.log("No email identified")
    } else {
      let cred =  "Basic " + Buffer.from(this.localService.getData("email") + ":" + this.localService.getData("password")).toString('base64')

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': cred
        })
      };
      this.http.get<User>( this.baseURL+"/user/userInfo?email=" + email,httpOptions).subscribe(data=>{
        this.localService.saveData("loggedInUserId",data.id)
        this.listService.toggleRenderList();
        this.listService.toggleRender()
      })
    }
  }

  ngOnInit(): void {
    if(this.localService.getData("loginStatus") == "true"){
      this.alreadyLogin = true;
    }
  }
}
