import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../serives/authentication.service";
import {Router, RouterEvent} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";
import {User} from "../user";
import {user} from "@angular/fire/auth";
import {error} from "@angular/compiler-cli/src/transformers/util";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit {
  user = new User();
  testemail = ""
  testpassword = ""

  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private authservice: AuthenticationService,
              private router: Router,
              private toast: HotToastService,
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
    this.authservice.loginUserFromRemote(this.user).subscribe(
      data => console.log("response recieved"),
        error =>console.log("exception recieved")
    )
  }
}
