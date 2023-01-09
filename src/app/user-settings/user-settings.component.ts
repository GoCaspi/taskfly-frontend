import {Component, OnInit, Self, SkipSelf} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {AuthenticationService} from "../serives/authentication.service";
import {HotToastService} from "@ngneat/hot-toast";
import {Team} from "../team";
import {LocalService, UserInfoData} from "../serives/local.service";

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
    private toast: HotToastService, public localService:LocalService
  ){}
  Settings = new FormGroup({
    firstName: new FormControl(this.localService.getData("firstName"), Validators.required),
    email: new FormControl(this.localService.getData("email"),[Validators.email,Validators.required]),
    lastName: new FormControl(this.localService.getData("lastName"),Validators.required),
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
      ).subscribe((_data)=>{
        console.log("")
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
      ).subscribe((_data:Team)=>{
console.log("")
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
    let userInfoDTO : UserInfoData = this.localService.getUserInfoDTOFromStore()
    this.firstName = userInfoDTO.firstName
    this.lastName = userInfoDTO.lastName
    this.emaill = this.localService.getData("email")
  }
}
