
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {AuthenticationService} from "../serives/authentication.service";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {By} from "@angular/platform-browser";
import {ActivatedRoute, Router} from "@angular/router";
import {User, Body} from "../user";
import {AppComponent} from "../app.component";
import {ListService} from "../serives/list.service";
import {BrowserStorageService} from "../storage.service";
import {MAT_DIALOG_SCROLL_STRATEGY} from "@angular/material/dialog";
import {Dialog} from "@angular/cdk/dialog";
import {of} from "rxjs";
import {MatMenuModule} from "@angular/material/menu";
import {LocalService} from "../serives/local.service";

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthenticationService;
  let authServiceSpy: Spy<AuthenticationService>;
  let listServiceSpy: Spy<ListService>
  let listServiceSpy2: Spy<ListService>
  let httpSpy : Spy<HttpClient>
  let storageSpy:Spy<BrowserStorageService>
  let mockBody: Body = {team: ""}
  let mockUser: User = {firstName: "", lastName: "", email:"", id:"", body: mockBody, srole: "", password: "", reseted: false}
  let authserviceStub = {login(){
    return of("test")
  },userInfo(){
    return of(mockUser)
    }}
  let routerStub = {navigate(){
    return new Promise(er =>{

    })
    }}
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  const storageServiceStub ={
    get(key:string){
      let mockVal = "12345"
      if (key == "loginStatus"){
        return "false"
      }
      return mockVal
    },
    set(){}
  }
  const localServiceStub = {
    getData(key:string){
      let mockVal = "12345"
      if (key == "loginStatus"){
        return "false"
      }
      return mockVal
    },
    saveData(){},
    setUserLoginDTOToStore(){},
    getUserLoginDTOFromStore(){},
    setUserInfoDTOToStore(){},
    getUserInfoDTOFromStore(){}
  }
  const httpServiceStub = {
    get(){
      let mockuser = {id:"12345", email:"mockMail", firstName:"fName", lastName:"lName"}
      return of(mockuser)
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[MatMenuModule],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide:AuthenticationService,useValue:authserviceStub},HttpClient,HttpHandler,{
          provide : MAT_DIALOG_SCROLL_STRATEGY,
          useValue : {}
        },{provide: Dialog, useValue: {}},{provide:BrowserStorageService,useValue: storageServiceStub},{provide: HttpClient,useValue: httpServiceStub}
         ,{
        provide: Router,useValue: routerStub
        },
        {provide: LocalService,useValue: localServiceStub}
      ],

    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    httpSpy = TestBed.inject<any>(HttpClient)
    storageSpy = TestBed.inject<any>(BrowserStorageService)
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
    spyOn(component.router, 'navigate').and.returnValue(new Promise(resolve => true))
    window.sessionStorage.setItem("loginStatus", "true")
    component.loginUser()
    expect(component).toBeTruthy();
  });
  it('test 2 login User', () => {
    spyOn(component.router, 'navigate').and.returnValue(new Promise(resolve => true))
    window.sessionStorage.setItem("loginStatus", "false")
    component.loginUser()
    expect(component).toBeTruthy();
  });
  it('Login test1 UserEmail', () => {
   component.userPassword ="test"
    component.userEmail =""
    component.loginUser()
    expect(component).toBeTruthy();
  });

  it('Login test UserPassword', () => {
    component.userPassword =""
    component.userEmail ="email@test.de"
    component.loginUser()
    expect(component).toBeTruthy();
  });
  it('Login test123', () => {
    component.userPassword ="test"
    component.userEmail ="email@test.de"

    component.loginUser()
    expect(component).toBeTruthy();
  });

  it('setUIdOfCurrentUser test', () => {
    spyOn(component.router, 'navigate').and.returnValue(new Promise(resolve => true))

    window.sessionStorage.setItem("", "")
    component.setUIdOfCurrentUser()
    expect(component).toBeTruthy();
  });


  it('getUIDOfCurrentUser: case user can be found in the database and the email input was set', function () {
    const fixture = TestBed.createComponent(LoginComponent);
    const app = fixture.componentInstance;
    let emailReturn = "mockMail"
    let mockUser = {id:"12345", email:"mockMail", firstName:"fName", lastName:"lName"}
    window.sessionStorage.setItem("email", "mockEmail")
    app.setUIdOfCurrentUser()
    expect(storageSpy.get("loggedInUserId")).toEqual(mockUser.id)
  });


});

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let service: AuthenticationService;
  let authServiceSpy: Spy<AuthenticationService>;
  let listServiceSpy: Spy<ListService>
  let listServiceSpy2: Spy<ListService>
  let httpSpy : Spy<HttpClient>
  let storageSpy:Spy<BrowserStorageService>
  const fakeActivatedRoute = {
    snapshot: { data: {} }
  } as ActivatedRoute;

  const storageServiceStub ={
    get(key:string){
      let mockVal = ""
      return mockVal
    },
    set(){}
  }
  const httpServiceStub = {
    get(){
      let mockuser = {id:"12345", email:"mockMail", firstName:"fName", lastName:"lName"}
      return of(mockuser)
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports:[MatMenuModule],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute},
        {provide:AuthenticationService,useValue: createSpyFromClass(AuthenticationService)},HttpClient,HttpHandler,{
          provide : MAT_DIALOG_SCROLL_STRATEGY,
          useValue : {}
        },{provide: Dialog, useValue: {}},{provide:BrowserStorageService,useValue: storageServiceStub},{provide: HttpClient,useValue: httpServiceStub}
      ],

    })
      .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    httpSpy = TestBed.inject<any>(HttpClient)
    storageSpy = TestBed.inject<any>(BrowserStorageService)
    service = TestBed.inject(AuthenticationService);
    authServiceSpy = TestBed.inject<any>(AuthenticationService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



    it('getUIDOfCurrentUser: case no user is logged in and therefore no email was set to the storage', function () {
      let emailReturn = "mockMail"
      let mockUser = {id:"12345", email:"mockMail", firstName:"fName", lastName:"lName"}
      component.setUIdOfCurrentUser()
      expect(storageSpy.get("loggedInUserId")).toEqual("")
    });
});
