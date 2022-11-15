import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { StaticListService } from './static-list.service';
import {HttpClient} from "@angular/common/http";

describe('StaticListService', () => {
  let service: StaticListService;
  let httpSpy: Spy<HttpClient>;
  interface TaskBody{
    topic : string;
    priority: string;
    description: string;
  }

  interface Task{
    body: TaskBody;
    userId : string;
    listId : string;
    taskIdString : string;
    team : string;
    deadline : string;
  }

  let fakeBody : TaskBody = {topic:"fakeTopic",priority:"middle",description:"userDescription"}
  let fakeTask : Task = {body:fakeBody,userId:"1",listId:"MyDay",taskIdString:"1",team:"red",deadline:"01/01/1001"}
  let fakeCustomers: Task[] = [fakeTask,fakeTask,fakeTask];
  interface Testcase{
    taskArr: Task[];
    listId:string;
  }
let testcases:Testcase[] =[{taskArr:fakeCustomers,listId:"myDay"},{taskArr:fakeCustomers,listId:"myDay"},{taskArr:[],listId:"myDay"}]
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ StaticListService, { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }]
    });
    service = TestBed.inject(StaticListService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('the service should be created', () => {
    expect(service).toBeTruthy();
  });
  it('getMyDayTasks should return an array with the length of the mocked data', () => {
    httpSpy.get.and.nextWith(fakeCustomers);

    service.getMyDayTasks("1").subscribe(
      tasks => {
        expect(tasks).toHaveSize(fakeCustomers.length);
        expect(httpSpy.get.calls.count()).toBe(1);
  });
});



  it('getMyDayTasks should return an array with the mocked data from the backend', () => {
    httpSpy.get.and.nextWith(fakeCustomers);

    service.getMyDayTasks("1").subscribe(
      tasks => {
     let t : Task[] = <Task[]>tasks
        t.forEach(t =>{
          let check = false;
          if(t.listId == "MyDay"){
            check = true
          }
          expect(check).toBe(true)
        })

      });
  });
})
