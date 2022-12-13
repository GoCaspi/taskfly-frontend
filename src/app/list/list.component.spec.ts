import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {Dialog} from "@angular/cdk/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {TaskService} from "../serives/task.service";
import {EMPTY, Observable} from "rxjs";
import {ListService} from "../serives/list.service";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let taskServiceSpy: Spy<TaskService>;
  let listServiceSpy: Spy<ListService>
  let body: TaskBody = {topic:"", highPriority: "", description: ""}
  let task: Task = {body: body, deadline: "",userId:"", listId:"", team:"", taskIdString:"", id:""}
  let list: List = {id: "", name:"", teamId:"",members: [""] ,tasks: [task]}
  interface List{
    id:string;
    name:string;
    teamId:string;
    members: string[];
    tasks:Task[]
  }
  interface TaskBody{
    topic : string;
    highPriority: string;
    description: string;
  }

  interface Task{
    body: TaskBody;
    userId : string;
    listId : string;
    taskIdString : string;
    team : string;
    deadline : string;
    id: string;
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [MatMenuModule],
      providers:[HttpClient,HttpHandler,MatDialog,Overlay,
        {provide: MAT_DIALOG_SCROLL_STRATEGY, useValue: {}},
        {provide: Dialog, useValue: {}},
        {provide: TaskService, useValue:createSpyFromClass(TaskService)},
        {provide: ListService, useValue:createSpyFromClass(ListService)}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    taskServiceSpy = TestBed.inject<any>(TaskService);
    listServiceSpy = TestBed.inject<any>(ListService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('openTaskDialog', function (){
    let fakeId = ""
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)
    console.log(openDialogSpy)
    taskServiceSpy.getTaskById.and.nextWith(task)
    component.openTaskDialog(fakeId)
    expect(component).toBeTruthy();
  });

  it('openListDialog', function (){
    listServiceSpy.getListById.and.nextWith(list)
    component.openListDialog()
    expect(component).toBeTruthy();
  });

});
