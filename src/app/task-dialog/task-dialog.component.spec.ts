import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogComponent } from './task-dialog.component';
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TaskService, Task} from "../serives/task.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ListService,List} from "../serives/list.service";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {AuthenticationService} from "../serives/authentication.service";
import {BrowserStorageService} from "../storage.service";
import {EMPTY, Observable, observable, of} from "rxjs";
import { Dialog } from '@angular/cdk/dialog';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  let listServiceSpy: Spy<ListService>;
  let taskServiceSpy: Spy<TaskService>;
  let storageSpy: Spy<BrowserStorageService>
  let mockList: List[] = [{id: "test", name: "test", teamId:"test", tasks:[], members:[], ownerID:""}]
  let body: TaskBody = {topic:"", highPriority: "", description: ""}
  let update: TaskUpdate ={body, deadline: "", listId: "", team: ""}
  let nameIdMap:Map<string, string>= new Map<string, string>();
  let mockTask : Task = {body:body,userId:"54321",listId:"123",team:"blue",deadline:"",id:"6789"}

   interface List{
    id:string;
    name:string;
    teamId:string;
    tasks:Task[]
    members:string[];

    ownerID:string;
  }
  interface TaskUpdate{
    body: TaskBody;
    listId : string;
    team : string;
    deadline : string;
  }
  interface TaskBody{
    topic : string;
    highPriority: string;
    description: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDialogComponent ],
      providers:[MatDialog,{provide:MatDialog, useValue:MatDialog},{
        provide : MAT_DIALOG_SCROLL_STRATEGY,
        useValue : {}
      },TaskService,{provide:TaskService, useValue: HttpClient},
        {provide: TaskService, useValue:createSpyFromClass(TaskService)},
        {provide:BrowserStorageService, useValue:createSpyFromClass(BrowserStorageService)},
        {provide:MatDialog, useValue:MatDialog},
        {provide: Dialog, useValue: {}},{provide: MatDialogRef,useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: mockTask },
        HttpClient,ListService , HttpHandler]
    })
      .compileComponents();
    listServiceSpy = TestBed.inject<any>(ListService);
    taskServiceSpy = TestBed.inject<any>(TaskService);
    storageSpy = TestBed.inject<any>(BrowserStorageService);
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formatListNameToId Test', function (){
    let name = "";
    component.formatListNameToId(name);
    nameIdMap.get(name)
    expect(component).toBeTruthy();
  });

  it('formatListNameToId Test2', function (){

    component.formatListNameToId("");
    nameIdMap.get("")
    expect(component).toBeTruthy();
  });

  it('sendUpdate', async () =>{
    component.selectedDate= new Date()
  //  component.deadlineInput = new Date()
    fixture.detectChanges()
    taskServiceSpy.updateTask.and.returnValue(new Promise(resolve =>{}))
    component.sendUpdate()
    expect(component).toBeTruthy()
  })

  it('deleteTask', async () => {
    taskServiceSpy.deleteTask.and.returnValue(new Promise(resolve => {
      storageSpy.setBody("updated", true)
    }))
    component.deleteTask()
    expect(component).toBeTruthy()
  });

  it('nameListIdMap', function(){
    component.nameListIdMap(mockList)
    expect(component).toBeTruthy();
  });

});
describe('NgOnint Test', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  let listServiceStup = {getAllListsByUserId(){return of(mockList)
    }}
  let taskServiceSpy: Spy<TaskService>;
  let storageSpy: Spy<BrowserStorageService>
  let mockList: List[] = [{id: "test", name: "test", teamId:"test", tasks:[], members:[], ownerID:""}]
  let body: TaskBody = {topic:"", highPriority: "", description: ""}
  let update: TaskUpdate ={body, deadline: "", listId: "", team: ""}
  let nameIdMap:Map<string, string>= new Map<string, string>();
  let mockTask : Task = {body:body,userId:"54321",listId:"123",team:"blue",deadline:"",id:"6789"}

  interface List{
    id:string;
    name:string;
    teamId:string;
    tasks:Task[]
    members:string[];

    ownerID:string;
  }
  interface TaskUpdate{
    body: TaskBody;
    listId : string;
    team : string;
    deadline : string;
  }
  interface TaskBody{
    topic : string;
    highPriority: string;
    description: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDialogComponent ],
      providers:[MatDialog,{provide:MatDialog, useValue:MatDialog},{
        provide : MAT_DIALOG_SCROLL_STRATEGY,
        useValue : {}
      },TaskService,{provide:TaskService, useValue: HttpClient},
        {provide: TaskService, useValue:createSpyFromClass(TaskService)},
        {provide:BrowserStorageService, useValue:createSpyFromClass(BrowserStorageService)},
        {provide:MatDialog, useValue:MatDialog},
        {provide: Dialog, useValue: {}},{provide: MatDialogRef,useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: mockTask },
        HttpClient,{
          provide: ListService, useValue: listServiceStup
        }, HttpHandler]
    })
      .compileComponents();

    taskServiceSpy = TestBed.inject<any>(TaskService);
    storageSpy = TestBed.inject<any>(BrowserStorageService);
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('NgOnit Test 2',() => {
    component.ngOnInit()
    expect(component).toBeTruthy()
  });


});
