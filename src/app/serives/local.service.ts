import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import {Buffer} from "buffer";
import {HttpHeaders} from "@angular/common/http";
import {User} from "../user";


// DTO for userData
 interface UserData{
   userId:string;
   email:string;
   password:string;
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

  public setUserToStore(){

  }

  private encrypt(txt: string): string {
    return CryptoJS.AES.encrypt(txt, this.key).toString();
  }

  private decrypt(txtToDecrypt: string) {
    return CryptoJS.AES.decrypt(txtToDecrypt, this.key).toString(CryptoJS.enc.Utf8);
  }

}
