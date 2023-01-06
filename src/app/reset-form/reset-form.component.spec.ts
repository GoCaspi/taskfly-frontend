import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetFormComponent } from './reset-form.component';
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {Observable, from, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {LoginComponent} from "../login/login.component";

describe('ResetFormComponent', () => {
  let component: ResetFormComponent;
  let fixture: ComponentFixture<ResetFormComponent>;
  let route: ActivatedRoute
  let httpSpy = jasmine.createSpyObj('HttpClient', ['get', 'post'])
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
          provide: HttpClient,
          useValue: httpSpy

        },
        {
          provide: Router,
          useValue: routerStub
        }
      ]
    })
    .compileComponents();
    //httpSpy = TestBed.inject<any>(HttpClient);
    fixture = TestBed.createComponent(ResetFormComponent);
    httpSpy.get.and.returnValue(of({ status: 200, data: {isValid:true} }));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it("isValid should be true by default", () => {
    httpSpy.get.and.returnValue(of({ status: 200, data: {isValid:true} }));


    expect(component.isValid).toEqual(true)
  })
});
