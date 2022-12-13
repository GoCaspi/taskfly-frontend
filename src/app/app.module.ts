import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { MatSidenavModule} from "@angular/material/sidenav";
import {RouterLinkActive, RouterLinkWithHref, RouterOutlet,RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatListModule} from "@angular/material/list";
import {AppRoutingModule} from "./app-routing.module";
import {MatDividerModule} from "@angular/material/divider";
import {HomeComponent} from "./home/home.component";
import {SideNavComponent} from "./side-nav/side-nav.component";
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { LandingComponent } from './landing/landing.component';
import { MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import { MatMenuModule} from "@angular/material/menu";
import { ImportantComponent } from './important/important.component';
import { PlannedComponent } from './planned/planned.component';
import { AssignedComponent } from './assigned/assigned.component';
import { TasksComponent } from './tasks/tasks.component';
import { MydayComponent } from './myday/myday.component';
import { ResetDialogComponent } from './reset-dialog/reset-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { OverlayModule } from '@angular/cdk/overlay';
import { HttpClientModule} from "@angular/common/http";
import {MatProgressBarModule} from "@angular/material/progress-bar";










@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideNavComponent,
    LoginComponent,
    SignUpComponent,
    LandingComponent,
    ImportantComponent,
    PlannedComponent,
    AssignedComponent,
    TasksComponent,
    MydayComponent,
    ResetDialogComponent,

  ],
  imports: [
    BrowserModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    RouterOutlet,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    RouterLinkWithHref,
    RouterLink,
    RouterLinkActive,
    MatListModule,
    AppRoutingModule,
    MatDividerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatMenuModule,
    MatDialogModule,
    OverlayModule,
    HttpClientModule,
    MatSnackBarModule,
    MatProgressBarModule,



  ],

  providers: [
  ],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
