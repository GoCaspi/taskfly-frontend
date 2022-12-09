import { ComponentFixture, TestBed } from '@angular/core/testing';
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import { UserSettingsComponent } from './user-settings.component';
import {By} from "@angular/platform-browser";
import {first} from "rxjs";
import {AuthenticationService} from "../serives/authentication.service";

describe('UserSettingsComponent', () => {
  let component: UserSettingsComponent;
  let fixture: ComponentFixture<UserSettingsComponent>;
  let service: AuthenticationService;
  let authServiceSpy: Spy<AuthenticationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

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
  });
});
