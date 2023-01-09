import { ComponentFixture, TestBed } from '@angular/core/testing';
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {UserSettingsComponent } from './user-settings.component';
import {AuthenticationService} from "../serives/authentication.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MatMenuModule} from "@angular/material/menu";
import {MatTabsModule} from "@angular/material/tabs";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatFormFieldModule} from "@angular/material/form-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {Body, User} from "../user";
import {Observable} from "rxjs";
import {Team} from "../team";

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;
  let service: AuthenticationService;
  let authServiceSpy: Spy<AuthenticationService>;
  let mockBody: Body = {team: ""}
  let mockUser: User = {firstName: "", lastName: "", email:"", id:"", body: mockBody, srole: "", reseted: false, password: ""}
  let mockTeam: Team = {teamName: "", members:[""], userID: ""}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSettingsComponent ],
      providers: [{provide:AuthenticationService,usevalue: createSpyFromClass(AuthenticationService)},HttpClient, HttpHandler],
      imports: [MatMenuModule, MatTabsModule, BrowserAnimationsModule, MatFormFieldModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        FormsModule, MatInputModule, MatButtonModule, MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSettingsComponent);
    service = TestBed.inject(AuthenticationService);
    authServiceSpy = TestBed.inject<any>(AuthenticationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update user',() => {
    component.Settings.controls['firstName'].setValue("test")
    component.Settings.controls['lastName'].setValue("test1")
    component.Settings.controls['email'].setValue("test@gmail.com")
    expect(component.Settings.valid).toBeFalsy()
  });

  it('should create Team',() => {
    component.Settings.controls['teamName'].setValue("test")
    component.Settings.controls['members'].setValue("test1")
    expect(component.Settings.valid).toBeFalsy()
  });

  it('Function for update User', function(){
    component.emaill = "test"
    component.firstName = "test"
    component.lastName = "test"
    //authServiceSpy.userUpdate.and.returnValue(mockUser)
    const spy = spyOn(authServiceSpy, "userUpdate").and.returnValue(new Observable())
    expect(spy).toBeTruthy()
    component.updateUser()
    expect(component).toBeTruthy();
  });

  it('Function for update User if abfrage', function(){
    service.userUpdate("", "", "")
    component.updateUser()
    expect(component).toBeTruthy();
  });

  it('Function for create Team', function(){
    component.teamName = "Test"
    component.membersInput = "Test 1"
    //authServiceSpy.userUpdate.and.returnValue(mockUser)
    const spy = spyOn(authServiceSpy, "createTeam").and.returnValue(new Observable())
    expect(spy).toBeTruthy()
    authServiceSpy.createTeam.and.returnValue(new Observable())
    component.createTeam()
    expect(component).toBeTruthy();
  });

  it('Function for create Team if abfrage', function(){
    service.createTeam("", ["", ""])
    component.createTeam()
    expect(component).toBeTruthy();
  });

  it('get password test', function () {
    component.Settings.get("test")
    component.password
    expect(component).toBeTruthy();
  });

  it('get email test', function () {
    component.Settings.get("test")
    component.email
    expect(component).toBeTruthy();
  })
});

