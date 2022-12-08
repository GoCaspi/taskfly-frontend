import {Component, Self, SkipSelf} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";
import {Overlay} from "@angular/cdk/overlay";
import {AuthenticationService} from "./serives/authentication.service";
import {HomeComponent} from "./home/home.component";
import {BehaviorSubject} from "rxjs";
import {Buffer} from "buffer";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BrowserStorageService} from "./storage.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MatDialog,ResetDialogComponent,Overlay, AuthenticationService]
})
export class AppComponent {
  baseURL : string| undefined;
  sideList : BehaviorSubject<[]>
  title = 'TaskFly-frontend';
  opened=false;

  private dialogRef: MatDialogRef<ResetDialogComponent> | undefined

constructor( public authService: AuthenticationService,
             public dialog:MatDialog,
             public rd:ResetDialogComponent,
             public dialoge: MatDialog ,
) {
                this.sideList = new BehaviorSubject([])
}
  openDialoge(){
    this.dialoge.open(HomeComponent,{
      width:'500px',
      height:"350px",
      data:"right click"
    })
  }
openReset(){
  this.dialogRef = this.dialog.open(ResetDialogComponent)
  this.dialogRef.afterClosed().subscribe(() =>{
    console.log("dialog is closed!")
  })
}


}
