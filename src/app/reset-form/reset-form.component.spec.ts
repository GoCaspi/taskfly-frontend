import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { ResetFormComponent } from './reset-form.component';
import {ActivatedRoute, convertToParamMap, Router} from "@angular/router";
import {Observable, from, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {LoginComponent} from "../login/login.component";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {ResetConfirmationService} from "../serives/reset-confirmation.service";
import {RouterTestingModule} from "@angular/router/testing";
import {routes} from '../app-routing.module'
import {Location} from "@angular/common";

describe('ResetFormComponent', () => {
  let component: ResetFormComponent;
  let fixture: ComponentFixture<ResetFormComponent>;
  let httpMock : HttpTestingController
  const routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let router: Router
  let service: ResetConfirmationService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetFormComponent ],
      providers: [{
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            queryParamMap: convertToParamMap({token: "123"})
          }

        }
      },


      ],
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)]
    })
    .compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router)
    service = TestBed.inject(ResetConfirmationService)

    //httpSpy = TestBed.inject<any>(HttpClient);
    fixture = TestBed.createComponent(ResetFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {

    expect(component).toBeTruthy();
  });

  it("isValid should be true", () => {
    const req = httpMock.expectOne("undefined/reset/valid/123");
    req.flush({isValid: true})
    fixture.detectChanges()

    expect(component.isValid).toEqual(true)
  })

  it("isValid should be false", fakeAsync(() => {
    const req = httpMock.expectOne("undefined/reset/valid/123");
    req.flush({isValid: false})
    fixture.detectChanges()
    component.ngOnInit()
    expect(component.isValid).toEqual(false)
  }))

  it("no passwords given", () => {
    const req = httpMock.expectOne("undefined/reset/valid/123");
    req.flush({isValid: true})
    fixture.detectChanges()
    expect(component.resetForm.valid).toBeFalse()
    expect(component.resetForm.controls.password.errors?.["required"]).toBeTruthy()
    expect(component.resetForm.controls.repeatPassword.errors?.["required"]).toBeTruthy()
  })

  it("passwords do not match", () => {
    const req = httpMock.expectOne("undefined/reset/valid/123");
    req.flush({isValid: true})
    component.resetForm.controls.password.setValue("123")
    component.resetForm.controls.repeatPassword.setValue("456")
    fixture.detectChanges()
    expect(component.resetForm.valid).toBeFalse()
    expect(component.resetForm.controls.password.errors?.["required"]).toBeFalsy()
    expect(component.resetForm.controls.repeatPassword.errors?.["required"]).toBeFalsy()
    expect(component.resetForm.errors?.["passwordsUnequal"]).toBeTruthy()
  })

  it("form is valid and user is redirected at successful request", () => {
    const req = httpMock.expectOne("undefined/reset/valid/123");
    req.flush({isValid: true})
    component.resetForm.controls.password.setValue("123")
    component.resetForm.controls.repeatPassword.setValue("123")

    component.submitNewPassword()
    fixture.detectChanges()



  })
});
