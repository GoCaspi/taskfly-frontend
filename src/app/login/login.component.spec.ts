
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "../serives/authentication.service";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {By} from "@angular/platform-browser";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthenticationService;
  let authServiceSpy: Spy<AuthenticationService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers: [
        {provide:AuthenticationService,useValue: createSpyFromClass(AuthenticationService)}
        ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    service = TestBed.inject(AuthenticationService);
    authServiceSpy = TestBed.inject<any>(AuthenticationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();

  });

  it('should create input fields for email and password of the user, who wants to login', function () {
    let emailInput = fixture.debugElement.query(By.css('#emailInput'))
    let lastNameInput = fixture.debugElement.query(By.css('#pwdInput'))
    expect(emailInput).toBeTruthy()
    expect(lastNameInput).toBeTruthy()
  });

  it('should have a login method. Calling this method calls the service mehtod: login(). if the service doesnt return any error then the username and password gets saved to the local storage service.', () => {
    //  const openDialogSpy = spyOn(component., 'open').and.returnValue({afterClosed: () => EMPTY} as any)
    authServiceSpy.login.and.nextWith("")
    component.loginUser()
    expect(component).toBeTruthy();

  });
});
