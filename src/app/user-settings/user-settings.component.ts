import {Component, OnInit, Self, SkipSelf} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {AuthenticationService} from "../serives/authentication.service";
import {HotToastService} from "@ngneat/hot-toast";
import {Team} from "../team";
@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]
})
export class UserSettingsComponent implements OnInit{

  firstName: string = ""
  lastName: string = ""
  emaill: string = ""
  teamName: string = ""
  members: string[] = []
  membersInput: string = ""
  constructor(
    @Self() private sessionStorageService: BrowserStorageService,
    @SkipSelf() private localStorageService: BrowserStorageService,
    private authentication: AuthenticationService,
    private toast: HotToastService,
  ){}
  Settings = new FormGroup({
    firstName: new FormControl(this.sessionStorageService.get("firstName"), Validators.required),
    email: new FormControl(this.sessionStorageService.get("email"),[Validators.email,Validators.required]),
    lastName: new FormControl(this.sessionStorageService.get("lastName"),Validators.required),
    teamName: new FormControl('', Validators.required),
    members: new FormControl('', Validators.required),
  })

  updateUser(){
    if(this.emaill == "" || this.firstName == "" || this.lastName == ""){
      this.toast.error("All fields must be filled in")
    } else {
      this.authentication.userUpdate(this.firstName, this.lastName, this.emaill).pipe(
        this.toast.observe({
          success: "User Updated",
          loading: 'Logging in...',
          error: 'There was an error'
        })
      ).subscribe((data)=>{

      })
    }

  }

  createTeam (){
    let membersArray = this.membersInput.split(",")

    if(this.membersInput == "" || this.teamName == ""){
      this.toast.error("Please enter a team name and at least one team member")
    } else {
      this.authentication.createTeam(this.teamName, membersArray).pipe(
        this.toast.observe({
          success: "Team Created",
          loading: 'Logging in...',
          error: 'There was an error'
        })
      ).subscribe((data:Team)=>{

      })
    }
  }
  get password() {
    return this.Settings.get('password');
  }
  get email() {
    return this.Settings.get('email');
  }
  ngOnInit(): void {
    this.firstName = this.sessionStorageService.get("firstName") || ""
    this.lastName = this.sessionStorageService.get("lastName") || ""
    this.emaill = this.sessionStorageService.get("email") || ""
  }
}
