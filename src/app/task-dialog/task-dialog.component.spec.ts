import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskDialogComponent } from './task-dialog.component';
import {StaticListService} from "../services/static-list.service";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass} from "jasmine-auto-spies";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {TaskService} from "../services/task.service";

describe('TaskDialogComponent', () => {
  let component: TaskDialogComponent;
  let fixture: ComponentFixture<TaskDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[MatDialogModule],
      declarations: [ TaskDialogComponent ],
      providers:[MatDialog, { provide: MatDialog,  },TaskService, { provide: HttpClient, useValue: createSpyFromClass(HttpClient) }]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
