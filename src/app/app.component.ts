import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MatDialog,ResetDialogComponent]
})
export class AppComponent {
  title = 'TaskFly-frontend';
  opened=false;
  private dialogRef: MatDialogRef<ResetDialogComponent> | undefined

constructor( public dialog:MatDialog, public rd:ResetDialogComponent) {
}

openReset(){
  this.dialogRef = this.dialog.open(ResetDialogComponent)
  this.dialogRef.afterClosed().subscribe(r =>{
    console.log("dialog is closed!")
  })
}

}
