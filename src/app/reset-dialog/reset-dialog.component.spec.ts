import {ComponentFixture, TestBed, tick} from '@angular/core/testing';

import { ResetDialogComponent } from './reset-dialog.component';
import {HttpClient} from "@angular/common/http";

import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {By} from "@angular/platform-browser";

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


  it('should have a button to send the reset request', function () {
   let ResetBtn = fixture.debugElement.query(By.css('#resetBtn'))
    expect(ResetBtn).toBeTruthy()
  });

  it('should have a button to cancle the reset request', function () {
    let ResetBtn = fixture.debugElement.query(By.css('#cancleBtn'))
    expect(ResetBtn).toBeTruthy()
  });

  it('should have two input fields, one for the email the other for the lastName', function () {
    let emailInput = fixture.debugElement.query(By.css('#emailUserInput'))
    let lastNameInput = fixture.debugElement.query(By.css('#lastNameUserInput'))
    expect(emailInput).toBeTruthy()
    expect(lastNameInput).toBeTruthy()
  });

  it('should save the correct input values of the user to the component', function () {
   fixture.debugElement.query(By.css('#emailUserInput')).nativeElement.value = "fakeEmail";
    fixture.debugElement.query(By.css('#lastNameUserInput')).nativeElement.value="fakeLastName";
    fixture.debugElement.query(By.css('#emailUserInput')).nativeElement.dispatchEvent('input')
    fixture.debugElement.query(By.css('#lastNameUserInput')).nativeElement.dispatchEvent('input')

    expect(fixture.componentInstance.lastNameInput).toEqual("fakeLastName")
  });

  it('should bind input text value to Component property', () => {
    const hostElement = fixture.nativeElement;
    const nameInput: HTMLInputElement = hostElement.querySelector('#lastNameUserInput');
    const ageInput: HTMLInputElement = hostElement.querySelector('#emailUserInput');

    fixture.detectChanges();

    nameInput.value = 'Amit Shah';
    ageInput.value = '20';

    nameInput.dispatchEvent(new Event('input'));
    ageInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(component.lastNameInput).toBe('Amit Shah');
    expect(component.emailInput.toString()).toBe('20');
  });
});
