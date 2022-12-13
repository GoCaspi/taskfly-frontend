import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import {AuthenticationService} from "./serives/authentication.service";

import {HttpClient, HttpHandler, HttpHeaders} from "@angular/common/http";
import {MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";
import {Dialog} from "@angular/cdk/dialog";
import {By} from "@angular/platform-browser";
import {BehaviorSubject, EMPTY, Observable} from "rxjs";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {ListService} from "./serives/list.service";
import {BrowserStorageService} from "./storage.service";

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
describe('AppComponent', () => {
  let listServiceSpy: Spy<ListService>
  let listServiceSpy2: Spy<ListService>
  let httpSpy : Spy<HttpClient>
  let storageSpy:Spy<BrowserStorageService>
  let mockTaskBody:TaskBody ={topic:"mockTopic",highPriority:"hoch",description:"mockDescription"}
  let mockTask : Task = {body:mockTaskBody,userId:"54321",listId:"123",taskIdString:"6789",team:"blue",deadline:"",id:"6789"}
  let mockList : List = {id:"123",name:"mockName",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""]}
  let mockMyDayList : List = {id:"123",name:"MyDay",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""]}
  let mockWichtigList : List = {id:"123",name:"Important",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""]}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,ResetDialogComponent
      ],
      providers: [
        AuthenticationService,{
        provide:HttpClient,
        useValue:createSpyFromClass(HttpClient)
        },{provide:BrowserStorageService,useValue: createSpyFromClass(BrowserStorageService)},
        ResetDialogComponent,{provide:MatDialog, useValue:MatDialog},{
          provide : MAT_DIALOG_SCROLL_STRATEGY,
          useValue : {}
        },{provide: Dialog, useValue: {}},{provide:ListService,useValue: createSpyFromClass(ListService)}
      ],

    }).compileComponents();
    listServiceSpy = TestBed.inject<any>(ListService);
    listServiceSpy2 = TestBed.inject<any>(ListService);
    httpSpy = TestBed.inject<any>(HttpClient)
    storageSpy = TestBed.inject<any>(BrowserStorageService)
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'TaskFly-frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app.title).toEqual('TaskFly-frontend');
  });

  it('should have a button to reset the password. The inner text of the button element is : "Passwort vergessen?"', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(fixture.debugElement.query(By.css('#openResetButton'))).toBeTruthy();
    expect(fixture.debugElement.query(By.css('#openResetButton')).nativeElement.innerHTML).toEqual("Passwort vergessen?");
  });
  it('should have a button-method openResetDialog, that opens the ResetDialog if clicked', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    const openDialogSpy = spyOn(app.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)

    app.openReset();

    expect(openDialogSpy).toHaveBeenCalled();
    expect(openDialogSpy).toHaveBeenCalledWith(ResetDialogComponent);
  });

  it('fetch all lists of user', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let listResponseDynamic_MyDay_Important : List[] = [mockList,mockMyDayList,mockWichtigList];

    interface Testcase{
      listServiceReturn:List[];
      expectedStaticLists:List[];
      expectedDynamicList:List[];
      expectedAllLists:List[];
    };

    let testcases:Testcase[] =[
      {listServiceReturn:listResponseDynamic_MyDay_Important,expectedStaticLists:[mockMyDayList,mockWichtigList],expectedDynamicList:[mockList],expectedAllLists:listResponseDynamic_MyDay_Important}
    ]

    testcases.forEach(tc =>{
      listServiceSpy.getAllListsByUserId.and.nextWith(tc.listServiceReturn)
      app.fetchAllListsOfUser();


      expect(app.allLists).toEqual(tc.expectedAllLists);
      expect(app.allStaticList).toEqual(tc.expectedStaticLists)
      expect(app.allDynamicLists).toEqual(tc.expectedDynamicList)
    })

  });

  it('getUIDOfCurrentUser: case user can be found in the database and the email input was set', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let emailReturn = "mockMail"
    let mockUser = {id:"12345", email:"mockMail", firstName:"fName", lastName:"lName"}
    storageSpy.get.and.returnValue(mockUser.id)
    storageSpy.set.and.returnValue({})
    httpSpy.get.and.nextWith(mockUser)
   app.getUIdOfCurrentUser()
    expect(storageSpy.get("loggedInUserId")).toEqual(mockUser.id)
  });

  it('getUIDOfCurrentUser: case no user is logged in and therefore no email was set to the storage', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let emailReturn = "mockMail"
    let mockUser = {id:"12345", email:"mockMail", firstName:"fName", lastName:"lName"}
    storageSpy.get.and.returnValue("")
    storageSpy.set.and.returnValue({})
    httpSpy.get.and.nextWith(mockUser)
    app.getUIdOfCurrentUser()
    expect(storageSpy.get("loggedInUserId")).toEqual("")
  });

  it('saveCurrentListId', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let emailReturn = "mockMail"
    let mockUser = {id:"12345", email:"mockMail", firstName:"fName", lastName:"lName"}
    listServiceSpy.getAllListsByUserId.and.nextWith([mockList])
    storageSpy.get.and.returnValue("")
    storageSpy.set.and.returnValue({})
    httpSpy.get.and.nextWith(mockUser)
    app.saveCurrentListId("","","")
    expect(storageSpy.get("inspectedList")).toEqual("")
  });
/*
  it('ngOnInit', function () {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    let emailReturn = "mockMail"
    let mockUser = {id:"12345", email:"mockMail", firstName:"fName", lastName:"lName"}
    listServiceSpy2.renderCheckList.next(true)
    listServiceSpy.getAllListsByUserId.and.nextWith([mockList])

 //  const spion = spyOn(listServiceSpy,"renderCheckList")
    storageSpy.get.and.returnValue("")
    storageSpy.set.and.returnValue({})
    httpSpy.get.and.nextWith(mockUser)
    app.ngOnInit()
    expect(storageSpy.get("inspectedList")).toEqual("")
  });

 */



});
