import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { ResetDialogComponent } from './reset-dialog.component';
import {HttpClient} from "@angular/common/http";

import {createSpyFromClass, Spy} from "jasmine-auto-spies";

describe('ResetDialogComponent', () => {
  let component: ResetDialogComponent;
  let fixture: ComponentFixture<ResetDialogComponent>;
  let httpSpy: Spy<HttpClient>;

  interface User{
    userId : String;
    lastName: String;
    firstName:String;
  }
  interface ResetBody{
    lastName: String;
    email:String;
  }

  let fakeUser : User = {userId:"1",lastName:"lName",firstName:"fName"}
  let fakeReset : ResetBody = {lastName:"lName", email:"email"}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetDialogComponent ],
      providers:[HttpClient,{provide:HttpClient, useValue:createSpyFromClass(HttpClient)}]
    })
    .compileComponents();
    httpSpy = TestBed.inject<any>(HttpClient);
    fixture = TestBed.createComponent(ResetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a method that calls the reset endpoint of taskfly api',  function () {
    httpSpy.post.and.nextWith(fakeUser);
    component.emailInput = "email"
    component.lastNameInput = "lName"
   component.resetPwd().subscribe(user =>{
     expect(httpSpy.post.calls.count()).toBe(1);
   //  expect(user).toEqual(fakeUser)
   });

  });
});
