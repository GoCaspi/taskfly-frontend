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
import {LocalService} from "../serives/local.service";

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
  let mockMyDayList : List = {id:"123",name:"MyDay",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""]}
  let mockWichtigList : List = {id:"123",name:"Important",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""]}
  /*
  const localStub = {
    getData(key : string){
      if (key === "loggedInUserId" || key === "inspectedListOwnerId"){return "12345"}
      return ""
    }
  }

   */
  const todosServiceStub = {
    getListById(id:string) {
      const todos = mockList;
      return of( todos );
    },
    deleteList(id:string) {
      const todos = mockList;
      return of( todos );
    },
   toggleRenderList() {
      const todos = mockList;
      return of( todos );
    },
    toggleRender() {
      const todos = mockList;
      return of( todos );
    },
renderCheck:new BehaviorSubject(true)
  };
  const storageStub = {
    saveData(key:string,data:string){
    },
    getData(key:string){
      if(key == "loginStatus"){return "true"}
      return""
    },
    setTaskDTOToStore(){}
  }

  let body: TaskBody = {topic:"", highPriority: "", description: ""}
  let task: Task = {body: body, deadline: "",userId:"", listId:"", team:"", taskIdString:"", id:""}
  let list: List = {id: "", name:"", teamId:"",members: [""] ,tasks: [task]}


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [MatMenuModule],
      providers:[MatDialog,Overlay,{provide : MAT_DIALOG_SCROLL_STRATEGY, useValue : {}},
        {provide: Dialog, useValue: {}},ListService,HttpClient,HttpHandler,{provide:BrowserStorageService,useValue: createSpyFromClass(BrowserStorageService)}
        ,{provide: TaskService, useValue: createSpyFromClass(TaskService)},{provide: ListService,useValue: todosServiceStub},{provide:LocalService,useValue: storageStub}
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
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should openListDialog', () => {
    storageSpy.get.and.returnValue("123")
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)
 //   listSpy.getListById.and.resolveTo(mockList)

    component.openListDialog()
    expect(openDialogSpy).toHaveBeenCalled()
  });

  it('should deleteList', () => {
    const app = fixture.componentInstance;
    const toggleRenderSpy = spyOn(todosServiceStub, 'toggleRender')
    const toggleRenderListSpy = spyOn(todosServiceStub, 'toggleRenderList')
    storageSpy.get.and.returnValue("123")
    component.deleteList()
    expect(app).toBeTruthy();
    expect(toggleRenderSpy).toHaveBeenCalled()
    expect(toggleRenderListSpy).toHaveBeenCalled()
    expect(component.enabled).toEqual(false)
  });

  it('openTaskDialog', function (){
    let fakeId = ""
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)
    console.log(openDialogSpy)
    taskServiceSpy.getTaskById.and.nextWith(task)
    component.openTaskDialog(fakeId)
    expect(component).toBeTruthy();
  });



/*
  it('should 1', function () {
  //storageSpy.get.and.returnValue("MyDay")
    window.sessionStorage.setItem("inspectedListName", "MyDay")
   let res = component.IAmStatic1()
    expect(res).toEqual(true)
  });

 */

  it('should 2', function () {
    window.sessionStorage.setItem("loggedInUserId", "MyDay")
    window.sessionStorage.setItem("inspectedListName", "MyDay")
    window.sessionStorage.setItem("inspectedListOwnerId", "MyDay")
    fixture.detectChanges()
   // storageSpy.get("")!.and.returnValue("MyDay")
    let res = component.isOwner()
    expect(res).toEqual(true)
  });
  it('should 3', function () {
    window.sessionStorage.setItem("loggedInUserId", "Important")
    window.sessionStorage.setItem("inspectedListName", "Important")
    window.sessionStorage.setItem("inspectedListOwnerId", "Important")
    fixture.detectChanges()
    // storageSpy.get("")!.and.returnValue("MyDay")
    let res = component.isOwner()
    expect(res).toEqual(true)
  });
  it('should 4', function () {
    window.sessionStorage.setItem("loggedInUserId", "Geplant")
    window.sessionStorage.setItem("inspectedListName", "Geplant")
    window.sessionStorage.setItem("inspectedListOwnerId", "Geplant")
    fixture.detectChanges()
    // storageSpy.get("")!.and.returnValue("MyDay")
    let res = component.isOwner()
    expect(res).toEqual(true)
  });
  it('should 5', function () {
    /*storageSpy.set("inspectedListName","Geplant")
    storageSpy.set("loggedInUserId","123")
    storageSpy.set("inspectedListOwnerId","234")*/
    window.sessionStorage.setItem("loggedInUserId", "123")
    window.sessionStorage.setItem("inspectedListName", "Geplant")
    window.sessionStorage.setItem("inspectedListOwnerId", "234")
    fixture.detectChanges()
    // storageSpy.get("")!.and.returnValue("MyDay")
    let res = component.isOwner()
  //  expect(res).toEqual(false)
    expect(res).toEqual(true)
  });


});
