import {Component, NgModule, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatFormField} from "@angular/material/form-field";
import {HotToastService} from "@ngneat/hot-toast";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {bothFieldsMatch} from "./passwordFormValidator";

interface isValidResponse{
  isValid: boolean | null

}

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.css']
})
export class ResetFormComponent implements OnInit {

  isLoading: boolean | null
  baseURL: string | undefined
  public resetToken: string | null
  public isValid: boolean | null = false
  constructor(private route: ActivatedRoute, private http: HttpClient, private toast: HotToastService, public router: Router) {
    this.resetToken = null
    this.isLoading = true
    this.baseURL = process.env['NG_APP_PROD_URL']
  }

  ngOnInit(): void {
    this.resetToken = this.route.snapshot.queryParamMap.get('token')
    console.log(this.resetToken)
    this.tokenIsValid()
    console.log(this.isValid)

  }


resetForm = new FormGroup({
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', Validators.required),
  }, {validators: bothFieldsMatch});

  get password(){
    return this.resetForm.get('password')
  }

  get repeatPassword(){
    return this.resetForm.get('repeatPassword')
  }

  tokenIsValid(): void {
    this.http.get<isValidResponse>(this.baseURL + "/reset/valid/" + this.resetToken)
      .subscribe(data => {
        if (!data.isValid){
          this.toast.error("this link is expired, invalid or have been used already.")
          this.router.navigate(["login"])
            .then(() => console.log("Successfully redirected"))
        } else {
          this.isLoading = false
        }
      })
  }

  submitNewPassword(): void {
    const body = {
      pwd: this.password?.value,
      token: this.resetToken
    }
    console.log(body)
    this.http.post(this.baseURL + "/reset/setNew", body)
      .pipe(
        this.toast.observe({
          success: "successfully updated the current password!",
          error: "there was an error when updating the password",
          loading: "loading..."
        })
      )
      .subscribe({
        next: () => {
          this.router.navigate(["login"])
            .then(() => console.log("Successfully redirected"))
        }
    })
  }



}
