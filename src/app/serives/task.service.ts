import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

/**
 * interface of TaskBdoy
 */
interface TaskBody{
  topic : string;
  highPriority: boolean;
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
}

/**
 * interface of TaskUpdate
 */
interface TaskUpdate{
  body: TaskBody;
  listId : string;
  team : string;
  deadline : string;
}

@Injectable({
  providedIn: 'root'
})
/**
 * class of TaskService
 */
export class TaskService {
  baseURL:string|undefined

  constructor(private http:HttpClient) { this.baseURL = process.env['NG_APP_PROD_URL'];}

  /**
   * Here, either all tasks are displayed or only the task for a specific task id is displayed.
   * @param id
   */
  getTaskById(id : string|null){
    if(id == null){return this.http.get(this.baseURL+"/task/taskId/")}
    return this.http.get(this.baseURL+"/task/taskId/"+id)
  }

  /**
   * Here the task can be updated for this the task id and a variable of the object Task is passed as parameter
   * @param task
   * @param id
   */
  async updateTask(task: TaskUpdate, id: string) {
    this.http.put(this.baseURL+"/task/" + id, task, {responseType: 'text'}).subscribe(r => console.log(r))
  }

  /**
   * Here a task is deleted for the selected task id
   * @param id
   */
  async deleteTask(id: string) {
    this.http.delete(this.baseURL+"/task/" + id, {responseType: 'text'}).subscribe(r =>{console.log(r)})
  }
}
