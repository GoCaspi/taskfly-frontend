import {Component, Self, SkipSelf} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../serives/authentication.service";
import {ActivatedRoute, Router,} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {User} from "../user";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})
export class LoginComponent {
  user = new User();

  loginStatus: boolean | undefined = false;
  userEmail=""
  userPassword=""


  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authservice: AuthenticationService,
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
   let status = this.sessionStorageService.get("loginStatus");

    if(status == "false"){
      this.authservice.login(this.userEmail, this.userPassword).pipe(
        this.toast.observe({
          success: 'Logged in successfully',
          loading: 'Logging in...',
          error: 'There was an error'
        })
      ).subscribe(() =>{
        this.localStorageService.set("email",this.userEmail)
        this.localStorageService.set("password",this.userPassword)
        this.localStorageService.set("loginStatus", "true")
        this.router.navigate(['myday']).then(r =>console.log(r))
      });
    }

  }
}
