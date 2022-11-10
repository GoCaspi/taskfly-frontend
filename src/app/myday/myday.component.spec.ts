import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydayComponent } from './myday.component';
import {StaticListService} from "../services/static-list.service";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass} from "jasmine-auto-spies";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";


describe('MydayComponent', () => {
 let component: MydayComponent;
 let fixture: ComponentFixture<MydayComponent>;


 beforeEach(async () => {
   await TestBed.configureTestingModule({
     imports:[MatDialogModule],
     declarations: [ MydayComponent,],
     providers: [StaticListService,{ provide: HttpClient, useValue: createSpyFromClass(HttpClient) }, TaskDialogComponent,{provide: MatDialog}],
   })
   .compileComponents();


   fixture = TestBed.createComponent(MydayComponent);
   component = fixture.componentInstance;
   fixture.detectChanges();
 });

    it('shouldeate', () => {
     expect(component).toBeTruthy();

  });
});

