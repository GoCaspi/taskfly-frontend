import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('ListService', () => {
  let service: ListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler]
    });
    service = TestBed.inject(ListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
