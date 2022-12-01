
import { AddHeaderInterceptor } from './add-header-interceptor';

import { TestBed } from '@angular/core/testing';

import { HomeserviceService } from './homeservice.service';
import {AuthenticationService} from "./serives/authentication.service";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {BrowserStorageService} from "./storage.service";

describe('AddHeader-Interceptors', () => {
  let inceptor: AddHeaderInterceptor;
  let httpSpy: Spy<HttpClient>;
  let fakeApiResponse = ""
  let browserStorageSpy : Spy<BrowserStorageService>;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
        AddHeaderInterceptor,{
          provide:AddHeaderInterceptor,
          useValue:AddHeaderInterceptor
        },BrowserStorageService,{provide:BrowserStorageService, useValue:createSpyFromClass(BrowserStorageService)},
        HttpClient,{provide:HttpClient,useValue: HttpClient}
      ]}
    );
    browserStorageSpy = TestBed.inject<any>(BrowserStorageService);
    httpSpy = TestBed.inject<any>(HttpClient);
    inceptor = TestBed.inject(AddHeaderInterceptor);
  });

  it('should be created', () => {
    let fakeInterceptor = new AddHeaderInterceptor(browserStorageSpy,browserStorageSpy);
    expect(fakeInterceptor).toBeTruthy();
    expect(inceptor).toBeTruthy();
  });


});
