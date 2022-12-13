import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskComponent } from './add-task.component';
import {AddTaskService} from "../add-task.service";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let authServiceSpy: Spy<AddTaskService>;
  let service: AddTaskService;
  //let task: Task = {};
  //let body: service ={};


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskComponent ],
      providers:[{provide:AddTaskService,useValue: createSpyFromClass(AddTaskService)}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Task', function () {
    let event = "test";
    //authServiceSpy.createTask.and.nextWith()
    component.task(event);
    expect(component).toBeTruthy();


  });
});
