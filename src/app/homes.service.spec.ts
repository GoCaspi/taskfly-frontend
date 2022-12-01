import { TestBed } from '@angular/core/testing';

import { HomeserviceService } from './homeservice.service';
import {AuthenticationService} from "./serives/authentication.service";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";

describe('HomeserviceService', () => {
  let service: HomeserviceService;
  let httpSpy: Spy<HttpClient>;
  let fakeApiResponse = ""

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
        AuthenticationService,{
          provide:HttpClient,
          useValue:HttpClient
        },HttpClient,{provide:HttpClient, useValue:createSpyFromClass(HttpClient)}
      ]}
    );
    httpSpy = TestBed.inject<any>(HttpClient);
    service = TestBed.inject(HomeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have a method that calls /assets endpoint with a gett request', function () {
    httpSpy.get.and.nextWith(fakeApiResponse)
    service.getHomeData().subscribe(response =>{
      expect(response).toEqual(fakeApiResponse)
    })
  });
});
