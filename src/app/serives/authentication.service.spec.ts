import { TestBed } from '@angular/core/testing';

import { AuthenticationService } from './authentication.service';
import {HttpClient} from "@angular/common/http";

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [
        AuthenticationService,{
          provide:HttpClient,
          useValue:HttpClient
        }
      ]}

    );
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
