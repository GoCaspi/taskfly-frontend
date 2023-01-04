import {Component, OnInit,} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HotToastService} from "@ngneat/hot-toast";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {get} from "@angular/fire/database";

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
    let resetBodyString = JSON.stringify(resetBody)
    this.http.post(this.baseURL+"/reset/", resetBodyString, {responseType: 'text'}).pipe(
      this.toast.observe({
        success : "List wurde zugefügt",
        loading :'Logging in...',
        error : "text field is empty"
      })
    ).subscribe(r =>{console.log(r)})
    return this.http.post(this.baseURL+"/reset/", resetBodyString, {responseType: 'text'})
  }




}
