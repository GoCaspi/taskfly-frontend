import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydayComponent } from './myday.component';
import {StaticListService} from "../services/static-list.service";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import { EMPTY} from 'rxjs';
import {MatMenuModule} from "@angular/material/menu";
import {TaskService} from "../services/task.service";


describe('MydayComponent', () => {
 let component: MydayComponent;
 let fixture: ComponentFixture<MydayComponent>;
  let fakeId : string = "1";
  let service: TaskService;
  let taskServiceSpy: Spy<TaskService>;

  interface TaskBody{
    topic : string;
    priority: string;
    description: string;
  }

  interface Task{
    body: TaskBody;
    userId : string;
    listId : string;
    taskIdString : string;
    team : string;
    deadline : string;
  }

  let fakeBody : TaskBody = {topic:"fakeTopic",priority:"middle",description:"userDescription"}
  let fakeTask : Task = {body:fakeBody,userId:"1",listId:"MyDay",taskIdString:"1",team:"red",deadline:"01/01/1001"}
  let fakeCustomers: Task[] = [fakeTask,fakeTask,fakeTask];


 beforeEach(async () => {
   await TestBed.configureTestingModule({
     imports:[MatDialogModule,MatMenuModule],
     declarations: [ MydayComponent,],
     providers: [StaticListService,{ provide: HttpClient, useValue: createSpyFromClass(HttpClient) }, TaskDialogComponent,{provide: MatDialog},
       MatDialog,{provide: MatDialog},TaskService,{provide:TaskService,useValue: createSpyFromClass(TaskService)}],
   })
   .compileComponents();

   service = TestBed.inject(TaskService);
   taskServiceSpy = TestBed.inject<any>(TaskService);


   fixture = TestBed.createComponent(MydayComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

    it('shouldeate', () => {
     expect(component).toBeTruthy();

  });

  it('openDialog() should open a dialog and the class that is used is TaskDialogComponent', () => {
 //   taskServiceSpy.getTaskById.and.nextWith(fakeCustomers)
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)
   // const getByIdSpy = spyOn(service,'getTaskById').andReturn()
    component.openTaskDialog(fakeId);

    expect(openDialogSpy).toHaveBeenCalled();
   expect(openDialogSpy).toHaveBeenCalledWith(TaskDialogComponent);
  });
});

