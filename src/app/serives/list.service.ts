import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
interface List{
  id:string;
  name:string;
  teamId:string;
}
@Injectable({
  providedIn: 'root'
})
export class ListService {
  checkListSwitch : boolean = false;
  renderCheck : BehaviorSubject<boolean>;

  checkListUpdate : boolean = false;
  renderCheckList : BehaviorSubject<boolean>;

  constructor(private http: HttpClient) {
    this.renderCheck = new BehaviorSubject<boolean>(this.checkListSwitch);
    this.renderCheckList = new BehaviorSubject<boolean>(this.checkListUpdate);
  }
  getTasksOfList(userId: string){
    return this.http.get("http://localhost:8080/task/userId/"+userId);
  }
  getAllListsByUserId(userId:string){
    return this.http.get<List>("http://localhost:8080/tc/user/" + userId);
  }
  toggleRender(){
    this.renderCheck.next(!this.checkListSwitch)
  }
  toggleRenderList(){
    this.renderCheckList.next(!this.checkListUpdate)
  }

  getGeplantTasks(userId:string){
    return this.http.get<List>("http://localhost:8080/task/scheduled/week/" + userId);
  }
}
