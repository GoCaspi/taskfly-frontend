import {Component, Self, SkipSelf} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../serives/authentication.service";
import {ActivatedRoute, Router,} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {AppComponent} from "../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})
export class LoginComponent {

  userEmail=""
  userPassword=""
  userid=""

  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authservice: AuthenticationService,
              //private appComponent : AppComponent,
              public route :ActivatedRoute,
              public router: Router,
              private toast: HotToastService,@Self() private sessionStorageService: BrowserStorageService,
              @SkipSelf() private localStorageService: BrowserStorageService
  ) {
  }


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
                 this.authservice.userInfo(this.userEmail,this.userPassword).subscribe((data) =>{
                   this.localStorageService.set("userid",data.id)
                 //  this.appComponent.getUserList()
                 })
                  this.router.navigate(['myday']).then(r =>console.log(r) )
            });

  }
}
