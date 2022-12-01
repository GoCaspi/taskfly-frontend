import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";
import {Overlay} from "@angular/cdk/overlay";
import {AuthenticationService} from "./serives/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MatDialog,ResetDialogComponent,Overlay]
})
export class AppComponent {
  title = 'TaskFly-frontend';
  opened=false;
  private dialogRef: MatDialogRef<ResetDialogComponent> | undefined

constructor( public authService: AuthenticationService,public dialog:MatDialog, public rd:ResetDialogComponent) {
}

openReset(){
  this.dialogRef = this.dialog.open(ResetDialogComponent)
  this.dialogRef.afterClosed().subscribe(() =>{
    console.log("dialog is closed!")
  })
}

}
