import {Component} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HotToastService} from "@ngneat/hot-toast";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.css']
})
export class ResetDialogComponent{
  baseURL : string| undefined;
  lastNameInput : string = "";
  emailInput : string = "";
  loginForm = new FormGroup({

    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  constructor(private http: HttpClient, private toast: HotToastService,) {

    this.baseURL = process.env['NG_APP_PROD_URL'];
  }

  resetPwd(){
    let resetBody = {lastName:this.lastNameInput,email:this.emailInput}
    this.http.post(this.baseURL+"/reset", resetBody).pipe(
      this.toast.observe({
        success: "successfully requested a new password, please check you're mails.",
        loading: "sent request...",
        error: "there have been an error while requesting a new password"
      })
    ).subscribe(() => {

    })
  }




}
