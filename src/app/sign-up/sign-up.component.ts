import {Component, Self, SkipSelf} from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors, ValidatorFn,
  Validators
} from "@angular/forms";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {HotToastService} from "@ngneat/hot-toast";
import {SignUpService} from "../serives/sign-up.service";

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
  styleUrls: ['./sign-up.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }, SignUpService]
})
export class SignUpComponent   {

  firstName: string = ""
  lastName: string = ""
  emaill: string = ""
  passsword: string = ""
  confirmPasssword: string = ""
  constructor(
    @Self() private sessionStorageService: BrowserStorageService,
    @SkipSelf() private localStorageService: BrowserStorageService,
    private service: SignUpService,
    private toast: HotToastService,
  ){}

  signUpForm = new FormGroup({
    firstName: new FormControl('',Validators.required),
    lastName: new FormControl('',Validators.required),
    email: new FormControl('',[Validators.email,Validators.required]),
    password: new FormControl('',Validators.required),
    confirmPassword: new FormControl('',Validators.required),
  },{validators: passwordsMatchValidator()})


  get firstNamee() {
    return this.signUpForm.get('firstName');
  }
  get lastNamee() {
    return this.signUpForm.get('lastName');
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

  createUser(){
    if(this.firstName == "" || this.lastName == "" || this.emaill == ""){
      this.toast.error("All text field need to be filled")
    }else {
      this.service.createUser(this.firstName, this.lastName, this.emaill, this.confirmPasssword).pipe(
        this.toast.observe({
          success: "User created",
          loading: 'creating...',
          error: 'There was an error'
        })
      ).subscribe((_data)=>{
        console.log("")
      })
    }
  }

}
