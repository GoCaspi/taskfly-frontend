import {HttpClient} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {SignUpService} from "./sign-up.service";
import {TestBed} from "@angular/core/testing";


describe('SignUpService', () => {
  let service: SignUpService;
  let httpSpy: Spy<HttpClient>;
  let fakeResponseFromAPI =""

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [SignUpService,HttpClient,{provide:HttpClient, useValue:createSpyFromClass(HttpClient)}]}

    );
    httpSpy = TestBed.inject<any>(HttpClient);
    service = TestBed.inject(SignUpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('create userserivce', function() {
    httpSpy.post.and.nextWith(fakeResponseFromAPI)
    let firstName = "test"
    let lastName = "test"
    let email = "test@test.de"
    let password = "test123"
    service.createUser(firstName, lastName, email, password ).subscribe(r=>{
      expect(httpSpy.post.calls.count()).toBe(1);
    })
  });
});
