import {ComponentFixture, TestBed} from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import {AddTaskService} from "../add-task.service";
import {of} from "rxjs";


describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  const serviceStub={createTask(){
    let massage = "test";
    return of(massage);
    }};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTaskComponent ],
      providers:[{ provide:AddTaskService,useValue: serviceStub}]
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

  it('onSubmit', function () {
    component.onSubmit();
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
