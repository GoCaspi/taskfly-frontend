import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydayComponent } from './myday.component';
import {StaticListService} from "../services/static-list.service";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass} from "jasmine-auto-spies";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import { EMPTY} from 'rxjs';


describe('MydayComponent', () => {
 let component: MydayComponent;
 let fixture: ComponentFixture<MydayComponent>;


 beforeEach(async () => {
   await TestBed.configureTestingModule({
     imports:[MatDialogModule],
     declarations: [ MydayComponent,],
     providers: [StaticListService,{ provide: HttpClient, useValue: createSpyFromClass(HttpClient) }, TaskDialogComponent,{provide: MatDialog}, MatDialog,{provide: MatDialog}],
   })
   .compileComponents();


   fixture = TestBed.createComponent(MydayComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

    it('shouldeate', () => {
     expect(component).toBeTruthy();

  });

  it('openDialog() should open a dialog and the class that is used is TaskDialogComponent', () => {
    const openDialogSpy = spyOn(component.dialog, 'open').and.returnValue({afterClosed: () => EMPTY} as any)

    component.open();

    expect(openDialogSpy).toHaveBeenCalled();
    expect(openDialogSpy).toHaveBeenCalledWith(TaskDialogComponent);
  });
});

