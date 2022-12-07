import {Component, OnInit, Self, SkipSelf} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {AuthenticationService} from "../serives/authentication.service";
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]
})
export class UserSettingsComponent implements OnInit{

  firstName: string = ""
  constructor(
    @Self() private sessionStorageService: BrowserStorageService,
    @SkipSelf() private localStorageService: BrowserStorageService,
    private authentication: AuthenticationService
  ){}
  Settings = new FormGroup({
    firstName: new FormControl(this.sessionStorageService.get("firstName"), Validators.required),
    email: new FormControl(this.sessionStorageService.get("email"),[Validators.email,Validators.required]),
    lastName: new FormControl(this.sessionStorageService.get("lastName"),Validators.required),
    teamName: new FormControl('', Validators.required)
  })

  updateUser(){
    this.authentication.userUpdate(this.firstName, "a", "l").subscribe((data)=>{

    })
  }
  get name() {
    return this.Settings.get('name');
  }
  get password() {
    return this.Settings.get('password');
  }
  get email() {
    return this.Settings.get('email');
  }

  ngOnInit(): void {
    this.firstName = this.sessionStorageService.get("firstName") || ""
  }
}
