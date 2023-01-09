import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {SignUpService} from "../serives/sign-up.service";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {User, Body} from "../user";

describe('SignUpComponent', () => {
  let component: SignUpComponent;
  let componen
  let fixture: ComponentFixture<SignUpComponent>;
  let serviceSpy: Spy<SignUpService>
  let mockBody: Body = {team: ""}
  let mockUser: User = {id: "", email: "", lastName: "", firstName: "", reseted: false, srole: "", password: "", body: mockBody }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        {provide:SignUpService, useValue: createSpyFromClass(SignUpService)}
      ]
    })
    .compileComponents();

    serviceSpy = TestBed.inject<any>(SignUpService);
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('confirmPassword', () => {
    component.confirmPassword?.get("")
    expect(component).toBeTruthy();
  });

  it('If password not matched', () => {
    component.passsword = "test"
    component.confirmPasssword = "test123"
    component.lastName = ""
    component.firstName = ""
    component.emaill = ""
    component.createUser()
    expect(component).toBeTruthy();
  });

  it('If password not matched 2', () => {
    component.passsword = ""
    component.confirmPasssword = ""
    component.lastName = ""
    component.firstName = ""
    component.emaill = ""
    component.createUser()
    expect(component).toBeTruthy();
  });

  it('If password matched', () => {
    component.passsword = "test"
    component.confirmPasssword = "test"
    component.lastName = "test"
    component.firstName = "test"
    component.emaill = "test@test.de"
    serviceSpy.createUser.and.nextWith(mockUser);
    component.createUser()
    expect(component).toBeTruthy();
  });

  it('Correct email address', () => {
    component.emaill = "test@test.de"
    component.createUser()
    expect(component).toBeTruthy();
  });

  it('Correct email address 2', () => {
    component.signUpForm.setValue({firstName: "test", lastName: "test", email: "test@test.de", password: "sssss", confirmPassword: "sssss"})
    component.createUser()
    expect(component.signUpForm.get("email")?.valid).toBeTruthy();
  });

 /* it('should create', () => {
    let passwordInput = document.getElementById("password")
    component.signUpForm.controls['password'].setValue("123")
    component.signUpForm.controls['confirmPassword'].setValue("321")
    expect(component.signUpForm.valid).toBeFalsy()
    // @ts-ignore
 //   passwordInput.innerHTML = "123"
  //  let  confirmInput = document.getElementById("confirmPassword")
    // @ts-ignore
 //   confirmInput.innerHTML = "321"
 //component.confirmPassword
  //  expect(component.confirmPassword).toBeFalsy();
  });*/
});
