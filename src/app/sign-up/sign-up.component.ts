import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";

export function passwordsMatchValidator():ValidatorFn{
  // @ts-ignore
  return (control: AbstractControl): ValidationErrors | null =>{
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password && confirmPassword && password !== confirmPassword){
      return {
        passwordsDontMatch: true
      }
    }
    return null;
  };
}

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required),
  },{validators: passwordsMatchValidator()})



  constructor() { }

  ngOnInit(): void {
  }
  get name() {
    return this.signUpForm.get('email');
  }
  get password() {
    return this.signUpForm.get('password');
  }
  get email() {
    return this.signUpForm.get('email');
  }
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

}
