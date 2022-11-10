import { TestBed } from '@angular/core/testing';
import { createSpyFromClass, Spy } from 'jasmine-auto-spies';
import { StaticListService } from './static-list.service';
import {HttpClient} from "@angular/common/http";

describe('StaticListService', () => {
  let service: StaticListService;
  let httpSpy: Spy<HttpClient>;
  interface Task{
    description : string;
    userId : string;
    listId : string;
  }
  let fakeCustomers: Task[] = [{description:"des",userId:"1",listId:"MyDay"},{description:"cript",userId:"1",listId:"MyDay"},{description:"ion",userId:"1",listId:"MyDay"}];

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
