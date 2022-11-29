import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetDialogComponent } from './reset-dialog.component';
import {HttpClient} from "@angular/common/http";
import Spy = jasmine.Spy;
import {createSpyFromClass} from "jasmine-auto-spies";

describe('ResetDialogComponent', () => {
  let component: ResetDialogComponent;
  let fixture: ComponentFixture<ResetDialogComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetDialogComponent ],
      providers:[HttpClient,{provide:HttpClient, useValue:createSpyFromClass(HttpClient)}]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
