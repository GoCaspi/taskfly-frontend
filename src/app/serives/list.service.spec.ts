import { TestBed } from '@angular/core/testing';

import { ListService } from './list.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {createSpyFromClass, Spy} from "jasmine-auto-spies";

interface TaskBody{
  topic : string;
  highPriority: string;
  description: string;
}

interface Task{
  body: TaskBody;
  userId : string;
  listId : string;
  taskIdString : string;
  team : string;
  deadline : string;
  id:string;
}
interface List{
  id:string;
  name:string;
  teamId:string;
  tasks:Task[]
  members:string[];
}

describe('ListService', () => {
  let service: ListService;
  let httpSpy : Spy<HttpClient>
  let mockTaskBody:TaskBody ={topic:"mockTopic",highPriority:"hoch",description:"mockDescription"}
  let mockTask : Task = {body:mockTaskBody,userId:"54321",listId:"123",taskIdString:"6789",team:"blue",deadline:"",id:"6789"}
  let mockList : List = {id:"123",name:"mockName",teamId:"mockTeam",tasks:[mockTask,mockTask],members:[""]}

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers:[{provide:HttpClient, useValue:createSpyFromClass(HttpClient)}]
    });
    service = TestBed.inject(ListService);
    httpSpy = TestBed.inject<any>(HttpClient)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should getAllListsByUserId', () => {
    let mockId = "123"
    httpSpy.get.and.nextWith([mockList])
    service.getAllListsByUserId(mockId).subscribe(list =>{
      expect(list).toEqual([mockList])
      expect(httpSpy.get).toHaveBeenCalledWith('http://localhost:8080/tc/user/' + mockId)
    })
  });

  it('should getListById', () => {
    let mockId = "123"
    httpSpy.get.and.nextWith(mockList)
    service.getListById(mockId).subscribe(list =>{
      expect(list).toEqual(mockList)
      expect(httpSpy.get).toHaveBeenCalledWith('http://localhost:8080/tc/id/' + mockId)
    })
  });

  it('should updateListe', () => {
    let mockId = "123"
    httpSpy.patch.and.nextWith(mockList)
    service.updateListe(mockId, mockList).subscribe(list =>{
      expect(list).toEqual(mockList)
      expect(httpSpy.patch).toHaveBeenCalledWith('http://localhost:8080/tc?id=' + mockId,mockList)
    })
  });

  it('should deleteList', () => {
    let mockId = "123"
    httpSpy.delete.and.nextWith(mockList)
    service.deleteList(mockId).subscribe(list =>{
      expect(list).toEqual(mockList)
      expect(httpSpy.delete).toHaveBeenCalledWith('http://localhost:8080/tc/' + mockId)
    })
  });
});
