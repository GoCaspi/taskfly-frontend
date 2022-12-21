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

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

}
