import { Component, } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.css']
})
export class ResetDialogComponent  {
  lastNameInput : string = "";
  emailInput : string = "";
  constructor(private http: HttpClient) {
    let l = process.env['NG_APP_PROD_URL'];
    console.log(l)
  }



  resetPwd(){
    let resetBody = {lastName:this.lastNameInput,email:this.emailInput}
    let resetBodyString = JSON.stringify(resetBody)
    return this.http.post("http://taskflybackend.westeurope.azurecontainer.io:80/reset/", resetBodyString, {responseType: 'text'})
  }



}
