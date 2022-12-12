import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

import {AuthenticationService} from "./serives/authentication.service";

import {HttpClient, HttpHandler, HttpHeaders} from "@angular/common/http";
import {MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";
import {Dialog} from "@angular/cdk/dialog";
import {By} from "@angular/platform-browser";
import {EMPTY} from "rxjs";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {ListService} from "./serives/list.service";

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
  let httpSpy: Spy<ListService>
  let mockTaskBody:TaskBody ={topic:"mockTopic",highPriority:"hoch",description:"mockDescription"}
  let mockTask : Task = {body:mockTaskBody,userId:"54321",listId:"123",taskIdString:"6789",team:"blue",deadline:"",id:"6789"}
  let mockList : List = {id:"123",name:"mockName",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""]}
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,ResetDialogComponent
      ],
      providers: [
        AuthenticationService,{
        provide:HttpClient,
        useValue:HttpClient
        },
        HttpClient,ResetDialogComponent,{provide:MatDialog, useValue:MatDialog},{
          provide : MAT_DIALOG_SCROLL_STRATEGY,
          useValue : {}
        },{provide: Dialog, useValue: {}},{provide:ListService,useValue: createSpyFromClass(ListService)},HttpClient,HttpHandler
      ],

    }).compileComponents();
    httpSpy = TestBed.inject<any>(ListService);
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
  //  const openDialogSpy = spyOn(app, 'fetchAllListsOfUser').and.returnValue({afterClosed: () => EMPTY} as any)
    httpSpy.getAllListsByUserId.and.nextWith(mockList)
    app.fetchAllListsOfUser();

    expect(app.allLists).toEqual([])

  });


});
