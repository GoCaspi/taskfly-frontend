import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {StaticListService} from "./static-list.service";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass} from "jasmine-auto-spies";

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ StaticListService, { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }]
    });
    service = TestBed.inject(TaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
