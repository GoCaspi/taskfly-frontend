import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ListService {
  checkListSwitch : boolean = false;
  renderCheck : BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.renderCheck = new BehaviorSubject<boolean>(this.checkListSwitch);
  }
  getTasksOfList(userId: string){
    return this.http.get("http://localhost:8080/task/userId/"+userId);
  }
  getAllListsByUserId(userId:string){
    return this.http.get("http://localhost:8080/tc/user/" + userId);
  }
  toggleRender(){
    this.renderCheck.next(!this.checkListSwitch)
  }
}
