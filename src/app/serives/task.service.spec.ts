import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[HttpClient,HttpHandler]
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
