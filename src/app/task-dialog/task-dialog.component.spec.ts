import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogComponent } from './task-dialog.component';
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
import {TaskService, Task} from "../serives/task.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ListService} from "../serives/list.service";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {BrowserStorageService} from "../storage.service";
import { Dialog } from '@angular/cdk/dialog';

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  let listServiceSpy: Spy<ListService>;
  let taskServiceSpy: Spy<TaskService>;
  let storageSpy: Spy<BrowserStorageService>
  let mockList: List[] = [{id: "test", name: "test", teamId:"test"}]
  let body: TaskBody = {topic:"", highPriority: "", description: ""}
  let update: TaskUpdate ={body, deadline: "", listId: "", team: ""}
  let nameIdMap:Map<string, string>= new Map<string, string>();

  let mockTask : Task = {body:body,userId:"54321",listId:"123",team:"blue",deadline:"",id:"6789"}

  interface List{
    id:string;
    name:string;
    teamId:string;
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
        HttpClient,ListService, HttpHandler]
    })
      .compileComponents();
    listServiceSpy = TestBed.inject<any>(HttpClient);
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

  it('sendUpdate', async () =>{
    component.deadlineInput = new Date()
    taskServiceSpy.updateTask.and.returnValue(new Promise(resolve =>{
    }))
    component.sendUpdate()
    expect(component).toBeTruthy()
  });


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
  })

  it('sendUpdate if hoch', async () =>{
    component.bPriorityInput = "hoch"
    component.deadlineInput = new Date()
    taskServiceSpy.updateTask.and.returnValue(new Promise(resolve =>{

    }))
    component.sendUpdate()
    expect(component).toBeTruthy()
  })

  it('sendUpdate if niedrig', async () =>{
    component.bPriorityInput = "niedrig"
    component.deadlineInput = new Date()
    taskServiceSpy.updateTask.and.returnValue(new Promise(resolve =>{

    }))
    component.sendUpdate()
    expect(component).toBeTruthy()
  })

  it('sendUpdate if true', async () =>{
    component.bPriorityInput = ""
    component.deadlineInput = new Date()
    taskServiceSpy.updateTask.and.returnValue(new Promise(resolve =>{

    }))
    component.sendUpdate()
    expect(component).toBeTruthy()
  })
});
