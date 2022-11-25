import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RegistrationService} from "../registration.service";
import {User} from "../user";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  implements OnInit{

  user = new User();

  constructor(private service : RegistrationService) {
  }

  loginForm = new FormGroup({

    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });

ngOnInit(){}
 get email(){
    return this.loginForm.get('email');
 }
  get password(){
    return this.loginForm.get('password');
  }
  loginUser(){
this.service.loginUserFromRemote(this.user).subscribe(
  data=> console.log("Response recieved"),
    error=> console.log(error)

)
  }
}
