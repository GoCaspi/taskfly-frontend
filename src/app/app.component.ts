import {Component, Self, SkipSelf} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";
import {Overlay} from "@angular/cdk/overlay";
import {AuthenticationService} from "./serives/authentication.service";
import {BROWSER_STORAGE, BrowserStorageService} from "./storage.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MatDialog,ResetDialogComponent,Overlay, AuthenticationService, BrowserStorageService,
    { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})
export class AppComponent {
  title = 'TaskFly-frontend';
  loginStatus: boolean | undefined = false;
  opened = false;

  private dialogRef: MatDialogRef<ResetDialogComponent> | undefined

  constructor(public authService: AuthenticationService, public dialog: MatDialog, public rd: ResetDialogComponent, @Self() private sessionStorageService: BrowserStorageService,
              @SkipSelf() private localStorageService: BrowserStorageService, public router: Router) {
  }

  openReset() {
    this.dialogRef = this.dialog.open(ResetDialogComponent)
    this.dialogRef.afterClosed().subscribe(() => {
      console.log("dialog is closed!")
    })
    let status = this.sessionStorageService.get("loginStatus")
    if (status == "true") {
      this.loginStatus = true;
      console.log(this.loginStatus)
    }
  }

  test(){
    let status = this.sessionStorageService.get("loginStatus")
    if (status == "true") {
      this.loginStatus = true;
      console.log(this.loginStatus)
    }
  }

  logout(){
    this.authService.logout().subscribe(() => {
      this.router.navigate(['myday']).then(r =>console.log(r))
    });
  }
}


