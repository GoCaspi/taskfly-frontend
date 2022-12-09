import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Overlay} from "@angular/cdk/overlay";
import {Spy} from "jasmine-auto-spies";
import {AuthenticationService} from "../serives/authentication.service";
describe('HomeComponent', () => {
  let service: AuthenticationService;
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let fakeResponseFromAPI =""
  let httpSpy: Spy<HttpClient>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [ HomeComponent ],
      providers:[HomeComponent,HttpClient,HttpHandler,MatSnackBar,Overlay
      ,]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 /* it('userinfo test', function (){
    httpSpy.post.and.nextWith(fakeResponseFromAPI)
    let fakeName = "Test"
    let fakeUserId = "123"
    service.(fakeName, fakeName).subscribe(r=>{
      expect(httpSpy.get.calls.count()).toBe(1);
    })
  });*/
});
