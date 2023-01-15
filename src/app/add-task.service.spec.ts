import { TestBed } from '@angular/core/testing';
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";

describe('AddTaskService', () => {

  let httpSpy: Spy<HttpClient>;
  let fakeResponseFromAPI ="";

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [HttpClient,{provide:HttpClient, useValue:createSpyFromClass(HttpClient)}]}

    );
    TestBed.configureTestingModule({});
    httpSpy =TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    //expect(service).toBeTruthy();
  });

  it('create TaskService', function(){
    let taskTopic = "test";
    let userId = "test";
    let deadline = "test";
    let listId = "test";
    //service.createTask(taskTopic,userId,deadline, listId);
      expect(httpSpy.post.calls.count()).toBe(1);

  });
});
