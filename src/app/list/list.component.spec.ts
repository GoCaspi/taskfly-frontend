import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListComponent } from './list.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {MAT_DIALOG_SCROLL_STRATEGY, MatDialog} from "@angular/material/dialog";
import {Overlay} from "@angular/cdk/overlay";
import {Dialog} from "@angular/cdk/dialog";
import {MatMenuModule} from "@angular/material/menu";

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      imports: [MatMenuModule],
      providers:[HttpClient,HttpHandler,MatDialog,Overlay,{
        provide : MAT_DIALOG_SCROLL_STRATEGY,
        useValue : {}
      },{provide: Dialog, useValue: {}}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
