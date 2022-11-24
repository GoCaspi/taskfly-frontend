import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../serives/authentication.service";
import {Router, RouterEvent} from "@angular/router";
import {HotToastService} from "@ngneat/hot-toast";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent   {

    testemail = ""
    testpassword = ""

  loginForm = new FormGroup({

    email: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required),
  });
 constructor(private authservice: AuthenticationService,
             private  route : Router,
             private toast: HotToastService,

 ) {}
  testlogin(){
   let  info = {
     password :this.testpassword,
     email : this.testemail
   }
   this.authservice.getLoginByEmail(info.password,info.email)
}

ngOnInit():void{}

 get email(){
    return this.loginForm.get('email');
 }
  get password(){
    return this.loginForm.get('password');
  }
  submit(){
   if (!this.loginForm.valid){
     return;
   }
   const { email, password } = this.loginForm.value;
   this.authservice.login( email , password).pipe(
     this.toast.observe({
     success: 'Logged is successfully',
     loading: 'Logging in...',
     error: 'There was an error'
   })
   ).subscribe(()=>{
     this.route.navigate(['/home']);
   });
  }
}
