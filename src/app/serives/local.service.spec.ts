import { TestBed } from '@angular/core/testing';

import {LocalService, TaskData, UserLoginData} from './local.service';

describe('LocalService', () => {
  let service: LocalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should save taskData to the storage', () => {
    let fakeTaskDTO : TaskData ={currentListId:"testLID",currentTeam:"testTeam",currentPriority:"testPrio",currentDescription:"testDescrip",currentTopic:"testTpoic", currentDeadline:"testDeadline"}
    service.setTaskDTOToStore(fakeTaskDTO)
    expect(service.decrypt(window.localStorage.getItem("currentListId")!)).toEqual(fakeTaskDTO.currentListId)
    expect(service.decrypt(window.localStorage.getItem("currentTeam")!)).toEqual(fakeTaskDTO.currentTeam)
    expect(service.decrypt(window.localStorage.getItem("currentPriority")!)).toEqual(fakeTaskDTO.currentPriority)
    expect(service.decrypt(window.localStorage.getItem("currentDescription")!)).toEqual(fakeTaskDTO.currentDescription)
    expect(service.decrypt(window.localStorage.getItem("currentTopic")!)).toEqual(fakeTaskDTO.currentTopic)
    expect(service.decrypt(window.localStorage.getItem("currentDeadline")!)).toEqual(fakeTaskDTO.currentDeadline)
  });
  it('should remove a stored item if the remove method is called', () => {
    let fakeItem = service.encrypt("fakeItem")
    window.localStorage.setItem(fakeItem,"fakeItem")
    service.removeData("fakeItem")
    expect(window.localStorage.getItem("fakeItem")).toEqual(null)
  });
  it('should set a userInfoDTO to the storage', () => {
    let DTO : UserLoginData = {email:"testEmail",password:"testPwd",loginStatus:"testStatus"}
    service.setUserLoginDTOToStore(DTO)
    expect(service.decrypt(window.localStorage.getItem("email")!)).toEqual(DTO.email)
  });
  it('should get a userInfoDTO to the storage', () => {
    let DTO : UserLoginData = {email:"testEmail",password:"testPwd",loginStatus:"testStatus"}
    service.setUserLoginDTOToStore(DTO)
    let actual = service.getUserLoginDTOFromStore()
    expect(actual).toEqual(DTO)
  });
});
