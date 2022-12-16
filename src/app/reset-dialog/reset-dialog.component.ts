import { Component, } from '@angular/core';
import {HttpClient} from "@angular/common/http";

/**
 * class of RestDialogComponent
 */
@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.css']
})
export class ResetDialogComponent  {
  baseURL : string| undefined;
  lastNameInput : string = "";
  emailInput : string = "";
  constructor(private http: HttpClient) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
  }


  /**
   * In this method the password will be reseted
   */
  resetPwd(){
    let resetBody = {lastName:this.lastNameInput,email:this.emailInput}
    let resetBodyString = JSON.stringify(resetBody)
    this.http.post(this.baseURL+"/reset/", resetBodyString, {responseType: 'text'}).subscribe(r =>{console.log(r)})
    return this.http.post(this.baseURL+"/reset/", resetBodyString, {responseType: 'text'})
  }




}
