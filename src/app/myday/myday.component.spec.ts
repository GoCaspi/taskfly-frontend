import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MydayComponent } from './myday.component';
import {StaticListService} from "../services/static-list.service";
import {HttpClient} from "@angular/common/http";
import {createSpyFromClass} from "jasmine-auto-spies";


describe('MydayComponent', () => {
 let component: MydayComponent;
 let fixture: ComponentFixture<MydayComponent>;


 beforeEach(async () => {
   await TestBed.configureTestingModule({
     declarations: [ MydayComponent,],
     providers: [StaticListService,{ provide: HttpClient, useValue: createSpyFromClass(HttpClient) }],
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

