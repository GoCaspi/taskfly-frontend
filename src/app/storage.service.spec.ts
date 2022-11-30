import { TestBed } from '@angular/core/testing';

import { StorageService } from './storage.service';
import {AuthenticationService} from "./serives/authentication.service";


describe('StorageService', () => {
  let service: StorageService;

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
