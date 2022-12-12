import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Spy} from "jasmine-auto-spies";
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

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;
  let service: AuthenticationService;
  let authServiceSpy: Spy<AuthenticationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSettingsComponent ],
      providers: [AuthenticationService, HttpClient, HttpHandler],
      imports: [MatMenuModule, MatTabsModule, BrowserAnimationsModule, MatFormFieldModule,
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        FormsModule, MatInputModule, MatButtonModule, MatIconModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSettingsComponent);
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

/*
  it('should create input fields for firstName, lastName and email of the user, who wants to update Information', function () {
    let emailInput = fixture.debugElement.query(By.css('#emailInput'))
    let firstNameInput = fixture.debugElement.query(By.css('#firstNameInput'))
    let lastNameInput = fixture.debugElement.query(By.css('#lastNameInput'))
    expect(emailInput).toBeTruthy()
    expect(firstNameInput).toBeTruthy()
    expect(lastNameInput).toBeTruthy()
  });

  it('should create input fields for teamName and members of the team, who wants to create a team', function () {
    let teamName = fixture.debugElement.query(By.css('#teamName'))
    let members = fixture.debugElement.query(By.css('#members'))
    expect(teamName).toBeTruthy()
    expect(members).toBeTruthy()
  });

  it('should have a createTeam method. Calling this method calls the service mehtod: createTeam(). if the service' +
    ' doesnt return any error then the new team is created.', () => {

    authServiceSpy.createTeam.and.nextWith()
    component.createTeam()
    expect(component).toBeTruthy();
  });*/
});

