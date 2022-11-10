import { ComponentFixture, TestBed } from '@angular/core/testing';
import {Axios} from "axios";
import { MydayComponent } from './myday.component';
import { HttpTestingController, HttpClientTestingModule } from '@angular/common/http/testing';
import {HttpClient} from "@angular/common/http";

 describe('MydayComponent', () => {
  let component: MydayComponent;
  let fixture: ComponentFixture<MydayComponent>;
  let httpMock : HttpTestingController
   let httpClient : HttpClient

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MydayComponent, HttpClientTestingModule ],
    })
    .compileComponents();

    httpMock = TestBed.get(HttpTestingController)
    httpClient = TestBed.inject(HttpClient)
    fixture = TestBed.createComponent(MydayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
/*
it("should render a list with tasks",async () => {
  let axios = require("axios");
  let MockAdapter = require("axios-mock-adapter");

// This sets the mock adapter on the default instance
  let mock = new MockAdapter(axios);
  mock.onGet("/users").reply(200, {data: [{listId: "MyDay"}]});
  let expected = [{listId: "MyDay"}]
  let actual = await component.MyDayTasks()
  expect(expected).toEqual(actual)
})

 */


});
