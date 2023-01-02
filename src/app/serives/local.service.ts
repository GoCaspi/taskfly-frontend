import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Buffer} from "buffer";
import {HttpHeaders} from "@angular/common/http";
import {User} from "../user";


// DTO for userData
 export interface UserLoginData{
   email:string;
   password:string;
   loginStatus:string;
 }
 export interface UserInfoData{
   firstName:string;
   lastName:string;
   loggedInUserId:string;
 }
 export interface TaskData{
   currentListId:string;
   currentDeadline:string;
   currentTopic:string;
   currentDescription:string;
   currentPriority:string;
   currentTeam:string;
 }
@Injectable({
  providedIn: 'root'
})
export class LocalService {

  key = "123";

  constructor() { }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, this.encrypt(value));
  }

  public getData(key: string) {
    let data = localStorage.getItem(key)|| "";
    return this.decrypt(data);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
  }

  public clearData() {
    localStorage.clear();
  }
  public getUserStatusFromStore():boolean{
   return this.getData("loginStatus") === "true";
  }

  public setUserLoginDTOToStore(userLoginDTO : UserLoginData){
    this.saveData("email",userLoginDTO.email)
    this.saveData("password",userLoginDTO.password)
    this.saveData("loginStatus",userLoginDTO.loginStatus)
  }
  public getUserLoginDTOFromStore():UserLoginData{
   let DTO : UserLoginData = {email:"",password:"",loginStatus:""}
    if(this.getData("email") && this.getData("password") &&this.getData("loginStatus")){
      DTO.email = this.getData("email")
      DTO.password = this.getData("password")
      DTO.loginStatus = this.getData("loginStatus")
    }
   return DTO
  }
  public setUserInfoDTOToStore(userInfoDTO : UserInfoData){
    this.saveData("loggedInUserId",userInfoDTO.loggedInUserId)
    this.saveData("lastName",userInfoDTO.lastName)
    this.saveData("firstName",userInfoDTO.firstName)
  }
  public getUserInfoDTOFromStore():UserInfoData{
    let DTO : UserInfoData = {loggedInUserId:"",firstName:"",lastName:""}
    if(this.getData("loggedInUserId") && this.getData("firstName") &&this.getData("lastName")){
      DTO.firstName = this.getData("firstName")
      DTO.lastName = this.getData("lastName")
      DTO.loggedInUserId = this.getData("loggedInUserId")
    }
    return DTO
  }
  public setTaskDTOToStore(taskDataDTO: TaskData){
 this.saveData("currentListId", taskDataDTO.currentListId)
    this.saveData("currentDeadline", taskDataDTO.currentDeadline)
    this.saveData("currentTopic", taskDataDTO.currentTopic)
    this.saveData("currentDescription", taskDataDTO.currentDescription)
    this.saveData("currentPriority", taskDataDTO.currentPriority)
    this.saveData("currentTeam",taskDataDTO.currentTeam)
  }

  public getTaskDTOFromStore():TaskData{
    let taskDTO:TaskData = {currentListId:"",currentTeam:"",currentPriority:"",currentDescription:"",currentTopic:"", currentDeadline:""}
    if(this.getData("currentListId") && this.getData("currentDeadline") && this.getData("currentTopic") && this.getData("currentDescription")
      && this.getData("currentPriority") && this.getData("currentTeam")){
      taskDTO.currentDeadline = this.getData("currentDeadline")
      taskDTO.currentTopic = this.getData("currentTopic")
      taskDTO.currentDescription = this.getData("currentDescription")
      taskDTO.currentListId = this.getData("currentListId")
      taskDTO.currentPriority = this.getData("currentPriority")
      taskDTO.currentTeam = this.getData("currentTeam")
    }
    return taskDTO
  }

  public getTaskDTOFromStore1():TaskData{
    let taskDTO:TaskData = {currentListId:"",currentTeam:"",currentPriority:"",currentDescription:"",currentTopic:"", currentDeadline:""}

      taskDTO.currentDeadline = this.getData("currentDeadline")
      taskDTO.currentTopic = this.getData("currentTopic")
      taskDTO.currentDescription = this.getData("currentDescription")
      taskDTO.currentListId = this.getData("currentListId")
      taskDTO.currentPriority = this.getData("currentPriority")
      taskDTO.currentTeam = this.getData("currentTeam")

    return taskDTO
  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

}
