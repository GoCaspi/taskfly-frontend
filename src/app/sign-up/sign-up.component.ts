import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";

/**
 * Here it is checked if the passwords entered when creating a user are the same.
 */
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

/**
 * class of SignUpComponent
 */
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent   {
  signUpForm = new FormGroup({
    name: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required),
  },{validators: passwordsMatchValidator()})



  /**
   * return the name that it gets
   */
  get name() {
    return this.signUpForm.get('email');
  }
  /**
   * return the password that it gets
   */
  get password() {
    return this.signUpForm.get('password');
  }
  /**
   * return the email that it gets
   */
  get email() {
    return this.signUpForm.get('email');
  }
  /**
   * return the confirmPassword that it gets
   */
  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

}
