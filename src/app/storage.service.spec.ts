import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {AuthenticationService} from "./serives/authentication.service";
import {Spy} from "jasmine-auto-spies";
import {HttpClient} from "@angular/common/http";


describe('StorageService', () => {
  let service: StorageService;
  let httpSpy: Spy<HttpClient>;
  let fakeResponseFromAPI =""

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
        AuthenticationService,{
          provide:StorageService,

        }
      ]}

    );
    service = TestBed.inject(StorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
