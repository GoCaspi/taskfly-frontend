import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {AuthenticationService} from "../serives/authentication.service";
import {User} from "../user";
describe('HomeComponent', () => {
  let mockuser: User = {firstName:"",lastName:"",password:"",srole:"",id:"",email:"",reseted: true}
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
      }
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
  })

});
