
import { AddHeaderInterceptor } from './add-header-interceptor';

import { TestBed } from '@angular/core/testing';

import { HomeserviceService } from './homeservice.service';
import {AuthenticationService} from "./serives/authentication.service";
import {HttpClient, HttpHandler, HttpRequest} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {BrowserStorageService} from "./storage.service";
import {Observable} from "rxjs";
import {LocalService} from "./serives/local.service";

describe('AddHeader-Interceptors', () => {
  let inceptor: AddHeaderInterceptor;
  let httpSpy: Spy<HttpClient>;
  let fakeApiResponse = ""
  let browserStorageSpy : Spy<BrowserStorageService>;
  let localSpy : Spy<LocalService>

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
        AddHeaderInterceptor,{
          provide:AddHeaderInterceptor,
          useValue:AddHeaderInterceptor
        },BrowserStorageService,{provide:BrowserStorageService, useValue:createSpyFromClass(BrowserStorageService)},
        HttpClient,{provide:HttpClient,useValue: HttpClient}, {provide:LocalService, useValue: createSpyFromClass(LocalService)}
      ]}
    );
    browserStorageSpy = TestBed.inject<any>(BrowserStorageService);
    localSpy = TestBed.inject<any>(LocalService)
    httpSpy = TestBed.inject<any>(HttpClient);
    inceptor = TestBed.inject(AddHeaderInterceptor);
  });

  it('should be created', () => {
    expect(inceptor).toBeTruthy();
  });

  it('should be created', () => {
    browserStorageSpy.get.and.returnValue("testCredentials")
    let fakeInterceptor = new AddHeaderInterceptor(browserStorageSpy,browserStorageSpy,localSpy);
    expect(fakeInterceptor).toBeTruthy();
    let fakeRequest = new HttpRequest("GET","http://localhost:8080/user/",{headers:null})
    const next: any = {
      handle: () => {
        return Observable.create((subscriber: { complete: () => void; }) => {
          subscriber.complete();
        });
      }
    };
    fakeInterceptor.intercept(fakeRequest,next)

  // let emptyHeader = fakeRequest.clone({headers:null})
    expect(fakeRequest.headers).toBeTruthy()
  });


});
