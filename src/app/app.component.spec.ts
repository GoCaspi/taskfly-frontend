import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MAT_DIALOG_SCROLL_STRATEGY, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";
import {Dialog} from "@angular/cdk/dialog";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,ResetDialogComponent
      ],
      providers:[HttpClient,ResetDialogComponent,{provide:MatDialog, useValue:MatDialog},{
        provide : MAT_DIALOG_SCROLL_STRATEGY,
        useValue : {}
      },{provide: Dialog, useValue: {}},{provide:HttpClient,useValue: HttpClient} ]
    }).compileComponents();
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

});
