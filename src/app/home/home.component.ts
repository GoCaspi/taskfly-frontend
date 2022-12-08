import {Component, Inject, OnInit, Self, SkipSelf,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {Buffer} from "buffer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {HotToastService} from "@ngneat/hot-toast";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BrowserStorageService,{provide: BROWSER_STORAGE,useFactory:()=>sessionStorage}]
})
export class HomeComponent implements OnInit{

  baseURL : string| undefined;
   userKollection="";
  KollectionForm = new FormGroup({
    list: new FormControl('',[Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,private toast: HotToastService,

    @Inject(MAT_DIALOG_DATA) public data:any,@Self() private sessionStorageService: BrowserStorageService,
    @SkipSelf() private localStorageService: BrowserStorageService,private http:HttpClient,private _snackBar: MatSnackBar
  ) { this.baseURL = process.env['NG_APP_PROD_URL'];}

get list(){
    return this.KollectionForm.get('userKollection');
}


  ngOnInit() {}

  openSnackBar(message:string, action:string) {
    this._snackBar.open(message,action,{
      duration:2000,
    })
  }
  onNoClick(): void {
    this.dialogRef.close([]);
  }
kollectionUser(){
    let name = this.KollectionForm.value.list
    let userid = this.localStorageService.get("userid")
  let body = {
      "name": name,
      "ownerID": userid
    }
  let cred =  "Basic " + Buffer.from(this.localStorageService.get("email") +":"+this.localStorageService.get("password")).toString('base64')
  let headers_object = new HttpHeaders({
    "Authorization":cred
  });
    console.log(body)
  this.http.post(this.baseURL+"/tc",body,{headers:headers_object,responseType:"text"}).pipe(
    this.toast.observe({
      success : "List wurde zugefügt",
      loading :'Logging in...',
      error : "There was an error"
    })
  ).subscribe(()=>{
    this.dialogRef.close()
  })
}



}
