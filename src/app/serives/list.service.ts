import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

/**
 * interface of TaskBody
 */
interface TaskBody{
  topic : string;
  highPriority: string;
  description: string;
}

/**
 * interface of Task
 */
interface Task{
  body: TaskBody;
  userId : string;
  listId : string;
  taskIdString : string;
  team : string;
  deadline : string;
  id:string;
}

/**
 * interface of List
 */
interface List{
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

  checkListUpdate : boolean = false;
  renderCheckList : BehaviorSubject<boolean>;
  baseURL:string|undefined

  constructor(private http: HttpClient) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
    this.renderCheck = new BehaviorSubject<boolean>(this.checkListSwitch);
    this.renderCheckList = new BehaviorSubject<boolean>(this.checkListUpdate);
  }
  /**
   * Here the tasks for the specified user id are displayed
   * @param userId
   */
  getTasksOfList(userId:string){
    return this.http.get(this.baseURL+"/task/userId/"+userId);
  }

  /**
   * Here all lists created by a specific user are displayed by the user id
   * @param userId
   */
  getAllListsByUserId(userId:string){
    return this.http.get<List[]>(this.baseURL+"/tc/user/" + userId);
  }
  toggleRender(){
    this.renderCheck.next(!this.checkListSwitch)
  }
  toggleRenderList(){
    this.renderCheckList.next(!this.checkListUpdate)
  }

  /**
   * here the tasks are displayed that are planned for a week for the assigned user id
   * @param userId
   */
  getGeplantTasks(userId:string){
    return this.http.get<List>(this.baseURL+"/task/scheduled/week/" + userId);
  }

  /**
   * here the lists are displayed for a selected list id
   * @param listId
   */
  getListById(listId:string){
    return this.http.get<List>(this.baseURL+"/tc/id/" + listId);
  }

  /**
   * Here the list can be updated for this the list id and a variable of the object List is passed as parameter
   * @param listId
   * @param update
   */
  updateListe(listId:string, update:List){
    return this.http.patch(this.baseURL+"/tc?id="+listId,update)
  }
  /**
   * Here a list is deleted for the selected list id
   */
  deleteList(listId:string){
    return this.http.delete(this.baseURL+"/tc/"+listId)
  }
}
