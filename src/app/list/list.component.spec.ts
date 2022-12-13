import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {Dialog} from "@angular/cdk/dialog";
import {MatMenuModule} from "@angular/material/menu";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {ListService} from "../serives/list.service";
import {BrowserStorageService} from "../storage.service";
import {AppComponent} from "../app.component";
import {TaskService} from "../serives/task.service";
import {BehaviorSubject, EMPTY, Observable, of} from "rxjs";

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
  id:string;
}
interface List{
  id:string;
  name:string;
  teamId:string;
  tasks:Task[]
  members:string[];
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let storageSpy:Spy<BrowserStorageService>
  let taskServiceSpy: Spy<TaskService>;
  let listSpy:Spy<ListService>
  let mockTaskBody:TaskBody ={topic:"mockTopic",highPriority:"hoch",description:"mockDescription"}
  let mockTask : Task = {body:mockTaskBody,userId:"54321",listId:"123",taskIdString:"6789",team:"blue",deadline:"",id:"6789"}
  let mockList : List = {id:"123",name:"mockName",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""]}

  const todosServiceStub = {
    getListById(id:string) {
      const todos = mockList;
      return of( todos );
    },
renderCheck:new BehaviorSubject(true)
  };

  let body: TaskBody = {topic:"", highPriority: "", description: ""}
  let task: Task = {body: body, deadline: "",userId:"", listId:"", team:"", taskIdString:"", id:""}
  let list: List = {id: "", name:"", teamId:"",members: [""] ,tasks: [task]}

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [MatMenuModule],
      providers:[MatDialog,Overlay,{provide : MAT_DIALOG_SCROLL_STRATEGY, useValue : {}},
        {provide: Dialog, useValue: {}},ListService,HttpClient,HttpHandler,{provide:BrowserStorageService,useValue: createSpyFromClass(BrowserStorageService)}
        ,{provide: TaskService, useValue: createSpyFromClass(TaskService)},{provide: ListService,useValue: todosServiceStub}
       ]
    })
    .compileComponents();
    storageSpy = TestBed.inject<any>(BrowserStorageService)
    taskServiceSpy = TestBed.inject<any>(TaskService)
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
  //  listSpy.getListById.and.nextWith(mockList)
   // spyOn<any>(listSpy, 'getListById').and.returnValue(new Promise(resolve => true))
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should openListDialog', () => {
    storageSpy.get.and.returnValue("123")
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)
 //   listSpy.getListById.and.resolveTo(mockList)

    component.openListDialog()
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




  it('should ', function () {
  storageSpy.get.and.returnValue("MyDay")
   let res = component.IAmStatic1()
    expect(res).toEqual(true)
  });

  it('should ', function () {
    storageSpy.set("inspectedListName","MyDay")
    storageSpy.set("loggedInUserId","MyDay")
    storageSpy.set("inspectedListOwnerId","MyDay")
    fixture.detectChanges()
   // storageSpy.get("")!.and.returnValue("MyDay")
    let res = component.isOwner()
    expect(res).toEqual(true)
  });
  it('should ', function () {
    storageSpy.set("inspectedListName","Important")
    storageSpy.set("loggedInUserId","Important")
    storageSpy.set("inspectedListOwnerId","Important")
    fixture.detectChanges()
    // storageSpy.get("")!.and.returnValue("MyDay")
    let res = component.isOwner()
    expect(res).toEqual(true)
  });
  it('should ', function () {
    storageSpy.set("inspectedListName","Geplant")
    storageSpy.set("loggedInUserId","Geplant")
    storageSpy.set("inspectedListOwnerId","Geplant")
    fixture.detectChanges()
    // storageSpy.get("")!.and.returnValue("MyDay")
    let res = component.isOwner()
    expect(res).toEqual(true)
  });
  it('should ', function () {
    storageSpy.set("inspectedListName","Geplant")
    storageSpy.set("loggedInUserId","123")
    storageSpy.set("inspectedListOwnerId","234")
    fixture.detectChanges()
    // storageSpy.get("")!.and.returnValue("MyDay")
    let res = component.isOwner()
    expect(res).toEqual(true)
  });


});
