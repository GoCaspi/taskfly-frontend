import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {AuthenticationService} from "../serives/authentication.service";
import {User, Body} from "../user";
import {By} from "@angular/platform-browser";
import {MatDialogRef} from "@angular/material/dialog";
describe('HomeComponent', () => {
  let mockbody: Body = {team: ""}
  let mockuser: User = {firstName:"",lastName:"",password:"",srole:"",id:"",email:"",reseted: true, body:mockbody}
  let service: AuthenticationService;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let fakeResponseFromAPI =""
  let httpSpy: Spy<HttpClient>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers:[HomeComponent,HttpClient,HttpHandler,MatSnackBar,Overlay,{
        provide:HttpClient,useValue:createSpyFromClass(HttpClient)
      },{provide: MatDialogRef,useValue: {}}
      ,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    httpSpy = TestBed.inject<any>(HttpClient);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('kollectionUser ', function () {
    httpSpy.post.and.nextWith("Successfuly Created")
    const fixture = TestBed.createComponent(HomeComponent);
    const app = fixture.componentInstance;
    expect(fixture).toBeTruthy()
    expect(app).toBeTruthy()
    component.kollectionUser()
    component.list
  })
  /*it('should get list ',  () => {
    let kollectionInput =fixture.debugElement.query(By.css('#kollectionInput'))
    expect(kollectionInput).toBeTruthy()
    component.list

  });*/
});
