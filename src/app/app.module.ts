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
import { UserSettingsComponent } from './user-settings/user-settings.component';
import {MatTabsModule} from "@angular/material/tabs";
import { ListComponent } from './list/list.component';
import { TaskDialogComponent } from './task-dialog/task-dialog.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from "@angular/material/core";
import { UpdateListDialogComponent } from './update-list-dialog/update-list-dialog.component';
import {MatRadioModule} from "@angular/material/radio";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import { AddTaskComponent } from './add-task/add-task.component';
import {MatSelectModule} from "@angular/material/select";
import {ResetFormComponent} from "./reset-form/reset-form.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

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
    AddTaskComponent,
    UserSettingsComponent,
    ListComponent,
    TaskDialogComponent,
    UpdateListDialogComponent,
    ResetFormComponent
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
        MatTabsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatRadioModule,
        MatSnackBarModule,
        MatProgressBarModule,
        MatSelectModule,
        MatProgressSpinnerModule
    ],

  providers: [MatMenuModule],
  bootstrap: [AppComponent],
  schemas:[
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class AppModule { }
