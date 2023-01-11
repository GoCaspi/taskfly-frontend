import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

export interface Task{
  id: string;
  body: TaskBody;
  userId : string;
  listId : string;
  team : string;
  deadline : string;
}

export interface TaskBody {
  topic : string;
  highPriority: string;
  description: string;
}
@Injectable({
  providedIn: 'root'
})

export class TaskService {
  baseURL:string|undefined

  constructor(private http:HttpClient) { this.baseURL = process.env['NG_APP_PROD_URL'];}
  getTaskById(id : string|null){
    if(id == null){return this.http.get(this.baseURL+"/task/taskId/")}
    return this.http.get(this.baseURL+"/task/taskId/"+id)
  }

  async updateTask(task: Task, id: string) {
console.log("TASK HIGH PRIO VAL IN SERVICE", task.body.highPriority)
    this.http.put(this.baseURL+"/task/" + id,task, {responseType: 'text'}).subscribe(r => console.log(r))
  }

  async deleteTask(id: string) {
    this.http.delete(this.baseURL+"/task/" + id, {responseType: 'text'}).subscribe(r =>{console.log(r)})
  }
}
