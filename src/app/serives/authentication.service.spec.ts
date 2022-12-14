import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  let httpSpy: Spy<HttpClient>;
  let fakeResponseFromAPI =""

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [AuthenticationService,HttpClient,{provide:HttpClient, useValue:createSpyFromClass(HttpClient)}]}

    );
    httpSpy = TestBed.inject<any>(HttpClient);
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should have a login method that takes useremail and password as input und calls the taskfly-API /login endpoint. The Authorisation headers will be set to the input values ', function () {
    httpSpy.post.and.nextWith(fakeResponseFromAPI)
    let fakeEmail = "testmail@mail.to"
    let fakePwd = "testpwd"

    service.login(fakeEmail,fakePwd).subscribe(r =>{
      expect(httpSpy.post.calls.count()).toBe(1);
    })
  });

  it('userinfo test', function (){
    httpSpy.get.and.nextWith(fakeResponseFromAPI)
    let fakeEmail = "testmail@mail.to"
    let fakePwd = "testpwd"
    service.userInfo(fakeEmail, fakePwd).subscribe(r=>{
      expect(httpSpy.get.calls.count()).toBe(1);
    })
  });

  it('create test', function() {
    httpSpy.post.and.nextWith(fakeResponseFromAPI)
    let fakeTeamName = "test"
    let fakeMember = ["test1", "test2"]
    service.createTeam(fakeTeamName, fakeMember).subscribe(r=>{
      expect(httpSpy.post.calls.count()).toBe(1);
    })
  });

  it('update user', function() {
    httpSpy.put.and.nextWith(fakeResponseFromAPI)
    let fakeFirstName = "test"
    let fakeLastName = "test1"
    let fakeEmail = "l@gmail.com"
    service.userUpdate(fakeFirstName, fakeLastName, fakeEmail).subscribe(r=>{
      expect(httpSpy.put.calls.count()).toBe(1);
    })
  });
});
