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
  constructor(private http: HttpClient) { }



  resetPwd(){
    let resetBody = {lastName:this.lastNameInput,email:this.emailInput}
    let resetBodyString = JSON.stringify(resetBody)
    return this.http.post("https://taskflybackend.azurewebsites.net/reset/", resetBodyString, {responseType: 'text'})
  }



}
