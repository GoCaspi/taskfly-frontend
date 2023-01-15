import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import {Observable, of} from "rxjs";
import {ListService} from "../serives/list.service";


describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  const serviceStub={createTask(){
    let massage = "test";
    return of(massage);
    }};
  const listServiceStub={
    toggleRender() {
    },toggleRenderList() {
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskComponent ],
      providers:[{provide: ListService, useValue: listServiceStub}]
    })

    .compileComponents();
    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Task', function () {
    component.tasks="test";
    let event = "test";
    //authServiceSpy.createTask.and.nextWith()
    component.task(event);
    expect(component).toBeTruthy();
  });

  it('Massage', function () {
    component.tasks="";
    let event = "test";
    component.task(event);
    expect(component).toBeTruthy();
  });



  it('should ', function () {
    component.tasks="test";
    component.ngOnInit();
    setTimeout(function (){
      expect(component.hidden).toBe(true);
    },500)
  });


});
