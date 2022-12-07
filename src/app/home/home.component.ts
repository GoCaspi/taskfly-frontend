import {Component, Inject, OnInit, Self, SkipSelf,} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";




@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [BrowserStorageService,{provide: BROWSER_STORAGE,useFactory:()=>sessionStorage}]
})
export class HomeComponent implements OnInit{
  userKollection="";

value ='';
  KollectionForm = new FormGroup({
    list: new FormControl('',[Validators.required])
  });

  constructor(
    public dialogRef: MatDialogRef<HomeComponent>,
    @Inject(MAT_DIALOG_DATA) public data:any,
  ) {}
get list(){
    return this.KollectionForm.get('userKollection');
}

  ngOnInit() {}

  onNoClick(): void {
    this.dialogRef.close();
    console.log(this.data)
  }
kollectionUser(){

}

}
