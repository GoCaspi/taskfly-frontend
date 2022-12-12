import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateListDialogComponent } from './update-list-dialog.component';
import {ListService} from "../serives/list.service";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {Dialog} from "@angular/cdk/dialog";

describe('UpdateListDialogComponent', () => {
  let component: UpdateListDialogComponent;
  let fixture: ComponentFixture<UpdateListDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateListDialogComponent ],
      providers:[{provide:ListService, useValue:HttpClient},MatDialog,Overlay,{
        provide : MAT_DIALOG_SCROLL_STRATEGY,
        useValue : {}
      },{provide: Dialog, useValue: {}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
