import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClient} from "@angular/common/http";
import {AuthenticationService} from "./serives/authentication.service";


describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent
      ],
      providers: [
        AuthenticationService,{
        provide:HttpClient,
        useValue:HttpClient
        }
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });


});
