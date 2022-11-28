import {Component, OnInit, Self, SkipSelf} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../serives/authentication.service";
import {Router, RouterEvent} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {User} from "../user";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})
export class LoginComponent  implements OnInit {
  user = new User();
  testemail = ""
  testpassword = ""

  userEmail=""
  userPassword=""

  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authservice: AuthenticationService,
              private router: Router,
              private toast: HotToastService,@Self() private sessionStorageService: BrowserStorageService,
              @SkipSelf() private localStorageService: BrowserStorageService
  ) {
  }

  testlogin() {
    let info = {
      password: this.testpassword,
      email: this.testemail
    }
    this.authservice.getLoginByEmail(info.password, info.email)
  }

  ngOnInit(): void {}

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  loginUser() {

    this.authservice.login(this.userEmail,this.userPassword).subscribe(res =>{
                 this.localStorageService.set("email",this.userEmail),
                 this.localStorageService.set("password",this.userPassword)
            });

   console.log("Test Email save:",this.localStorageService.get("email"))
  }
}
