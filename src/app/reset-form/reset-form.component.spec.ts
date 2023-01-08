import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFormComponent } from './reset-form.component';
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {Observable, from, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {LoginComponent} from "../login/login.component";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ResetConfirmationService} from "../serives/reset-confirmation.service";

describe('ResetFormComponent', () => {
  let component: ResetFormComponent;
  let fixture: ComponentFixture<ResetFormComponent>;
  let service: ResetConfirmationService;
  let route: ActivatedRoute
  let resetServiceSpy: Spy<ResetConfirmationService>
  let resetService: ResetConfirmationService
  let httpMock : HttpTestingController
  let httpStub = {
    get(){
      return of({isValid: true})
    }
  }
  let routerStub = {
    navigate(){
      return new Promise<boolean>(resolve => {return resolve})
    }
  }
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetFormComponent, LoginComponent ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            queryParamMap: convertToParamMap({token: "123"})
          }

        }
      },
        {
          provide: Router,
          useValue: routerStub
        }
      ],
      imports: [HttpClientTestingModule]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    //httpSpy = TestBed.inject<any>(HttpClient);
    fixture = TestBed.createComponent(ResetFormComponent);

    component = fixture.componentInstance;

    fixture.detectChanges();

  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it("isValid should be true by default", () => {
    const req = httpMock.expectOne("undefined/reset/valid/123");
    req.flush({isValid: true})
    fixture.detectChanges()
    expect(component.isValid).toEqual(true)
  })
});
