import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogComponent } from './task-dialog.component';
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog} from "@angular/material/dialog";
import {TaskService} from "../serives/task.service";
import {HttpClient, HttpHandler} from "@angular/common/http";
import {ListService} from "../serives/list.service";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;
  let listServiceSpy: Spy<ListService>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskDialogComponent ],
      providers:[MatDialog,{provide:MatDialog, useValue:MatDialog},{
        provide : MAT_DIALOG_SCROLL_STRATEGY,
        useValue : {}
      },TaskService,{provide:TaskService, useValue: HttpClient}, HttpClient,ListService, HttpHandler]
    })
    .compileComponents();
    listServiceSpy = TestBed.inject<any>(HttpClient);
    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
