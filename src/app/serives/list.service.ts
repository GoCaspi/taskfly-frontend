import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, map} from "rxjs";
import {RxStomp, RxStompConfig, RxStompState} from "@stomp/rx-stomp";
import type {Task} from "./task.service";
import {TaskDialogPayload} from "./task.service";

export interface List{
  id:string;
  name:string;
  teamId:string;
  tasks:Task[]
  members:string[];

  ownerID:string;
}
@Injectable({
  providedIn: 'root'
})
export class ListService {
  checkListSwitch : boolean = false;
  renderCheck : BehaviorSubject<boolean>;
  rxStomp: RxStomp
  checkListUpdate : boolean = false;
  renderCheckList : BehaviorSubject<boolean>;
  baseURL:string|undefined
  wsUrl: string | undefined

  constructor(private http: HttpClient) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
    this.wsUrl = process.env['NG_APP_WS_URL'];
    this.renderCheck = new BehaviorSubject<boolean>(this.checkListSwitch);
    this.renderCheckList = new BehaviorSubject<boolean>(this.checkListUpdate);
    this.rxStomp = new RxStomp()
  }
  getTasksOfList(userId: string){
    return this.http.get(this.baseURL+"/task/userId/"+userId);
  }
  getAllListsByUserId(userId:string){
    return this.http.get<List[]>(this.baseURL+"/tc/user/" + userId);
  }
  toggleRender(){
    this.renderCheck.next(!this.checkListSwitch)
  }
  toggleRenderList(){
    this.renderCheckList.next(!this.checkListUpdate)
  }

  getGeplantTasks(userId:string){
    return this.http.get<List>(this.baseURL+"/task/scheduled/week/" + userId);
  }

  getListById(listId:string){
    return this.http.get<List>(this.baseURL+"/tc/id/" + listId);
  }
  updateListe(listId:string, update:List){
    return this.http.patch(this.baseURL+"/tc?id="+listId,update)
  }
  deleteList(listId:string){
    return this.http.delete(this.baseURL+"/tc/"+listId)
  }

  initializeStomp(username: string, password: string): BehaviorSubject<RxStompState>{
      const stompConfig: RxStompConfig = {
        connectHeaders: {
          username: username,
          password: password
        },
        brokerURL: this.wsUrl,
        reconnectDelay: 200

      }
      this.rxStomp.configure(stompConfig)
      this.rxStomp.activate()
      return this.rxStomp.connectionState$
  }

  getStompState(): BehaviorSubject<RxStompState>{
    return this.rxStomp.connectionState$
  }

  sendTaskCollectionUpdates(data: TaskDialogPayload, collectionID: string){
    console.log(data)
    console.log(collectionID)
    this.rxStomp.publish({destination: "/app/collection/broker/" + collectionID, body: JSON.stringify(data)})
  }


  receiveTaskCollectionUpdates(collectionID: string): Observable<TaskDialogPayload>{

    return this.rxStomp.watch('/collection/' + collectionID).pipe(map(function (message){
      console.log(message.body)
      return JSON.parse(message.body)
    }))
  }


}
