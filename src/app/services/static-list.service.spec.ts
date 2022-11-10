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
  let fakeCustomers: Task[] = [{description:"",userId:"",listId:""}];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ StaticListService, { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }]
    });
    service = TestBed.inject(StaticListService);
    httpSpy = TestBed.inject<any>(HttpClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should be created', () => {
    httpSpy.get.and.nextWith(fakeCustomers);

    service.getMyDayTasks().subscribe(
      tasks => {
        expect(tasks).toHaveSize(fakeCustomers.length);
        expect(httpSpy.get.calls.count()).toBe(1);
  });
});
})
