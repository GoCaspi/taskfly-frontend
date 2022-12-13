import { TestBed } from '@angular/core/testing';

import { TaskService } from './task.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import * as url from "url";

describe('TaskService', () => {
  let service: TaskService;
  let httpSpy : Spy<HttpClient>

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{provide:HttpClient, useValue:createSpyFromClass(HttpClient)}]
    });
    service = TestBed.inject(TaskService);
    httpSpy = TestBed.inject<any>(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the delete endpoint of the taskfly api and add the provided userId (param String) as query-parameter', () => {
    let successMsg = "successfully deleted the task"
    let mockID = "123"
    httpSpy.delete.and.nextWith(successMsg)
    service.deleteTask(mockID)
    expect(httpSpy.delete).toHaveBeenCalledWith('http://localhost:8080/task/' + mockID, Object({ responseType: 'text' }))
  });

  it('should call the delete endpoint of the taskfly api and add the provided userId (param String) as query-parameter', () => {
    let successMsg = "successfully deleted the task"
    let mockID = "123"
    let mockTask = {id:"",listId:"",}

    interface Testcase{
      undefiendId:boolean;
      taskId:any;
    }

    let testcases : Testcase[] = [
      {undefiendId:false,taskId:mockID},
      {undefiendId:true,taskId:null},
    ]

    testcases.forEach(tc =>{
      httpSpy.get.and.nextWith(mockTask)
      service.getTaskById(tc.taskId)
      if(tc.undefiendId){

        expect(httpSpy.get).toHaveBeenCalledWith('http://localhost:8080/task/taskId/')
      }else{

        expect(httpSpy.get).toHaveBeenCalledWith('http://localhost:8080/task/taskId/' + tc.taskId )
      }
    })


  });
});
