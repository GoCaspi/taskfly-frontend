import {Component, Self, SkipSelf,} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {Buffer} from "buffer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {HotToastService} from "@ngneat/hot-toast";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BrowserStorageService,{provide: BROWSER_STORAGE,useFactory:()=>sessionStorage}]
})
export class HomeComponent {
 horizontalPosition: MatSnackBarHorizontalPosition='center';
 verticalPosition: MatSnackBarVerticalPosition='top';
  baseURL : string| undefined;
   userKollection="";
  KollectionForm = new FormGroup({
    list: new FormControl('',[Validators.required])
  });

  constructor(
   // public dialogRef: MatDialogRef<HomeComponent>,
    private toast: HotToastService,

  //  @Inject(MAT_DIALOG_DATA) public data:any,
   @Self() private sessionStorageService: BrowserStorageService,
    @SkipSelf() private localStorageService: BrowserStorageService,private http:HttpClient,private _snackBar: MatSnackBar
  ) { this.baseURL = process.env['NG_APP_PROD_URL'];}

get list(){
    return this.KollectionForm.get('userKollection');
}

  openSnackBar(message:string, action:string) {
    this._snackBar.open(message,action,{
      duration:3000,
      horizontalPosition:this.horizontalPosition,
      verticalPosition:this.verticalPosition,
    })
  }

kollectionUser(){
    let name = this.KollectionForm.value.list
    let userid = this.sessionStorageService.get("loggedInUserId")
  let body = {
      "name": name,
      "ownerID": userid
    }
  let cred =  "Basic " + Buffer.from(this.sessionStorageService.get("email") +":"+this.sessionStorageService.get("password")).toString('base64')
  let headers_object = new HttpHeaders({
    "Authorization":cred
  });
    console.log(body)
  this.http.post(this.baseURL+"/tc",body,{headers:headers_object,responseType:"text"}).pipe(
    this.toast.observe({
      success : "List has been added",
      loading :'Logging in...',
      error : "text field is empty"
    })
  ).subscribe(()=>{

  })
}



}
