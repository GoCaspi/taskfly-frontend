import {ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { AddTaskComponent } from './add-task.component';
import {AddTaskService} from "../add-task.service";
import {createSpyFromClass, Spy} from "jasmine-auto-spies"
import {from, of} from "rxjs";


describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;
  let authServiceSpy: Spy<AddTaskService>;
  let service: AddTaskService;
  const serviceStub={createTask(){
    let massage = "test";
    return of(massage);
    }};

  //let task: Task = {};
  //let body: service ={};


  beforeEach(async () => {
    //jasmine.clock().install();
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
    //jasmine.clock().uninstall();
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
    //authServiceSpy.createTask.and.nextWith()
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
