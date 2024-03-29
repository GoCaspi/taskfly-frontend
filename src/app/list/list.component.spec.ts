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
import {LocalService} from "../serives/local.service";
import {RxStompState} from "@stomp/rx-stomp";
import {BehaviorSubject, EMPTY, observable, Observable, of} from "rxjs";

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
  ownerID: string;
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let storageSpy:Spy<BrowserStorageService>
  let taskServiceSpy: Spy<TaskService>;
  let listSpy:Spy<ListService>
  let mockTaskBody:TaskBody ={topic:"mockTopic",highPriority:"hoch",description:"mockDescription"}
  let mockTask : Task = {body:mockTaskBody,userId:"54321",listId:"123",taskIdString:"6789",team:"blue",deadline:"",id:"6789"}
  let mockList : List = {id:"123",name:"mockName",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""] || null, ownerID:"test"}
  let mockMyDayList : List = {id:"123",name:"MyDay",teamId:"mockTeam",tasks:[mockTask,mockTask],members:["test"], ownerID:"test"}
  let mockWichtigList : List = {id:"123",name:"Important",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""], ownerID:"test"}
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
  let list: List = {id: "", name:"", teamId:"",members: [""] ,tasks: [task], ownerID:"test"}


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [MatMenuModule],
      providers:[MatDialog,Overlay,{provide : MAT_DIALOG_SCROLL_STRATEGY, useValue : {}},
        {provide: Dialog, useValue: {}},ListService,HttpClient,HttpHandler,{provide:BrowserStorageService,useValue: createSpyFromClass(BrowserStorageService)}
        ,{provide: TaskService, useValue: createSpyFromClass(TaskService)},{provide: ListService,useValue: /*todosServiceStub*/ createSpyFromClass(ListService)}
       ]
    })
    .compileComponents();
    storageSpy = TestBed.inject<any>(BrowserStorageService)
    taskServiceSpy = TestBed.inject<any>(TaskService)
    listSpy = TestBed.inject<any>(ListService)
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should openListDialog', () => {
    let fakeId = ""
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)
    window.sessionStorage.setItem("inspectedList", "123")
    listSpy.getListById.and.nextWith(mockList)
    component.openListDialog()
    expect(openDialogSpy).toHaveBeenCalled()
  });

  it('should openListDialog 2', () => {
    let fakeId = ""
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)
    window.sessionStorage.setItem("inspectedList", "123")
    listSpy.getListById.and.nextWith(mockMyDayList)
    component.openListDialog()
    expect(openDialogSpy).toHaveBeenCalled()
  });


  it('should deleteList', () => {
    const app = fixture.componentInstance;
    storageSpy.get.and.returnValue("123")
    listSpy.deleteList.and.nextWith("")
    component.deleteList()
    expect(app).toBeTruthy();
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


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let storageSpy:Spy<BrowserStorageService>
  let taskServiceSpy: Spy<TaskService>;
  let listSpy:Spy<ListService>
  let mockTaskBody:TaskBody ={topic:"mockTopic",highPriority:"",description:"mockDescription"}
  let mockTask : Task = {body:mockTaskBody,userId:"54321",listId:"123",taskIdString:"6789",team:"blue",deadline:"",id:"6789"}
  let mockList : List = {id:"123",name:"mockName",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""], ownerID:"test"}
  let mockMyDayList : List = {id:"123",name:"MyDay",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""], ownerID:"test"}
  let mockWichtigList : List = {id:"123",name:"Important",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""], ownerID:"test"}
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
    getHighPrioTasks(userId : string){
      const mockTasks = [mockTask,mockTask];
      return of( mockTasks );
    },
    renderCheck:new BehaviorSubject(true)
  };
  const storageStub = {
    saveData(key:string,data:string){
    },
    getData(key:string){
      if(key == "loginStatus"){return "true"}
      if(key === "inspectedListName"){return "staticTest"}
      if (key === "loggedInUserId"){return "123"}
      if (key === "inspectedListOwnerId"){return "123"}
      return""
    },
    setTaskDTOToStore(){}
  }

  let body: TaskBody = {topic:"", highPriority: "", description: ""}
  let task: Task = {body: body, deadline: "",userId:"", listId:"", team:"", taskIdString:"", id:""}
  let list: List = {id: "", name:"", teamId:"",members: [""] ,tasks: [task], ownerID:"test"}


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



  /*it('should openListDialog an team members are equal null', () => {

    storageSpy.get.and.returnValue("123")
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)
    //   listSpy.getListById.and.resolveTo(mockList)

    component.openListDialog()
    expect(openDialogSpy).toHaveBeenCalled()
  });*/

  it('should execute renderList1', () => {
    component.renderList1()
    fixture.detectChanges()
    expect(component.taskData).toEqual(mockList.tasks)
  });

  it(' renderHighPrioTasks should fetch all tasks assigned with high priority to taskData', () => {
  let serviceReturn = [mockTask,mockTask]
    taskServiceSpy.getHighPrioTasks.and.nextWith(serviceReturn)
    fixture.detectChanges()
    component.renderHighPrioTasks()
    expect(component.taskData).toEqual(serviceReturn)
    expect(component.renderListName).toEqual("Important")
  });
  it('renderScheduledTasks should fetch all tasks assigned with a deadline within the current week to taskData', () => {
    let serviceReturn = [mockTask,mockTask]
    taskServiceSpy.getScheduledTasks.and.nextWith(serviceReturn)
    fixture.detectChanges()
    component.renderScheduledTasks()
    expect(component.taskData).toEqual(serviceReturn)
    expect(component.renderListName).toEqual("Planned")
  });

  it('renderPrivateTasks should fetch all tasks assigned only to the user', () => {
    let serviceReturn = [mockTask,mockTask]
    taskServiceSpy.getPrivateTasks.and.nextWith(serviceReturn)
    fixture.detectChanges()
    component.renderPrivateTasks()
    expect(component.taskData).toEqual(serviceReturn)
    expect(component.renderListName).toEqual("My Tasks")
  });

});


describe('ListComponent ngOnInit with a StompState of 1', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let storageSpy:Spy<BrowserStorageService>
  let taskServiceSpy: Spy<TaskService>;
  let mockTaskBody:TaskBody ={topic:"mockTopic",highPriority:"hoch",description:"mockDescription"}
  let mockTask : Task = {body:mockTaskBody,userId:"54321",listId:"123",taskIdString:"6789",team:"blue",deadline:"",id:"6789"}
  let mockList : List = {id:"123",name:"mockName",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""], ownerID:"test"}
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
    initializeStomp(){
      return new BehaviorSubject<RxStompState>(1)
    },
    receiveTaskCollectionUpdates(){
      return of(mockTask)
    },
    renderCheck:new BehaviorSubject(true)
  };
  const storageStub={
    get(key:string){
      if(key === "loggedInUserId")return "123"
      if(key === "inspectedListOwnerId")return "123"
      return ""
    }
  }

  let body: TaskBody = {topic:"", highPriority: "", description: ""}
  let task: Task = {body: body, deadline: "",userId:"", listId:"", team:"", taskIdString:"", id:""}
  let list: List = {id: "", name:"", teamId:"",members: [""] ,tasks: [task], ownerID:"test"}


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [MatMenuModule],
      providers:[MatDialog,Overlay,{provide : MAT_DIALOG_SCROLL_STRATEGY, useValue : {}},
        {provide: Dialog, useValue: {}},ListService,HttpClient,HttpHandler,{provide:BrowserStorageService,useValue: storageStub}
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

  it('should execute ngOnInit', () => {
    const app = fixture.componentInstance;
    app.ngOnInit()
    expect(app.wsStatus).toEqual(true)
    expect(app.userIsOwner).toEqual(true)
  });


});

describe('ListComponent ngOnInit with a StompState of 0', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let storageSpy:Spy<BrowserStorageService>
  let taskServiceSpy: Spy<TaskService>;
  let mockTaskBody:TaskBody ={topic:"mockTopic",highPriority:"hoch",description:"mockDescription"}
  let mockTask : Task = {body:mockTaskBody,userId:"54321",listId:"123",taskIdString:"6789",team:"blue",deadline:"",id:"6789"}
  let mockList : List = {id:"123",name:"mockName",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""], ownerID:"test"}
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
    initializeStomp(){
      return new BehaviorSubject<RxStompState>(0)
    },
    receiveTaskCollectionUpdates(){
      return of(mockTask)
    },
    renderCheck:new BehaviorSubject(true)
  };
  const storageStub={
    get(key:string){
      if(key === "loggedInUserId")return "123"
      if(key === "inspectedListOwnerId")return "123"
      if(key === "inspectedListName") return "123"
      return ""
    }
  }

  let body: TaskBody = {topic:"", highPriority: "", description: ""}
  let task: Task = {body: body, deadline: "",userId:"", listId:"", team:"", taskIdString:"", id:""}
  let list: List = {id: "", name:"", teamId:"",members: [""] ,tasks: [task], ownerID:"test"}


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [MatMenuModule],
      providers:[MatDialog,Overlay,{provide : MAT_DIALOG_SCROLL_STRATEGY, useValue : {}},
        {provide: Dialog, useValue: {}},ListService,HttpClient,HttpHandler,{provide:BrowserStorageService,useValue: storageStub}
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

  it('should execute ngOnInit and the recieved list is static', () => {
    const app = fixture.componentInstance;
    app.ngOnInit()
    expect(app.wsStatus).toEqual(false)
    expect(app.userIsOwner).toEqual(true)
  });


});
