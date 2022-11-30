import { TestBed } from '@angular/core/testing';

import { HomeserviceService } from './homeservice.service';
import {AuthenticationService} from "./serives/authentication.service";
import {HttpClient} from "@angular/common/http";

describe('HomeserviceService', () => {
  let service: HomeserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
        AuthenticationService,{
          provide:HttpClient,
          useValue:HttpClient
        }
      ]}
    );
    service = TestBed.inject(HomeserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
