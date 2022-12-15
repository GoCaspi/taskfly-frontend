import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateListDialogComponent } from './update-list-dialog.component';
import {ListService} from "../serives/list.service";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {Dialog} from "@angular/cdk/dialog";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";

describe('UpdateListDialogComponent', () => {
  let component: UpdateListDialogComponent;
  let fixture: ComponentFixture<UpdateListDialogComponent>;
let listSpy:Spy<ListService>
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateListDialogComponent ],
      providers:[{provide:ListService, useValue:createSpyFromClass(ListService)},MatDialog,Overlay,{
        provide : MAT_DIALOG_SCROLL_STRATEGY,
        useValue : {}
      },{provide: Dialog, useValue: {}}]
    })
    .compileComponents();
    listSpy = TestBed.inject<any>(ListService)
    fixture = TestBed.createComponent(UpdateListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create', () => {
    component.listMembersString = "1,2,3,4"
    listSpy.updateListe.and.nextWith()
    component.sendUpdate()
    expect(component).toBeTruthy();
  });
});
