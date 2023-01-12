import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HotToastService} from "@ngneat/hot-toast";


interface TaskBody {
  topic : string;
  highPriority: string;
  description: string;
}

export interface Task{
  id: string;
  body: TaskBody;
  userId : string;
  listId : string;
  team : string;
  deadline : string;
}

interface TaskUpdate{
  body: TaskBody;
  listId : string;
  team : string;
  deadline : string;
}

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  baseURL:string|undefined

  constructor(private toast: HotToastService,private http:HttpClient) { this.baseURL = process.env['NG_APP_PROD_URL'];}
  getTaskById(id : string|null){
    if(id == null){return this.http.get(this.baseURL+"/task/taskId/")}
    return this.http.get(this.baseURL+"/task/taskId/"+id)
  }

  async updateTask(task: Task, id: string) {
    this.http.put(this.baseURL+"/task/" + id, task, {responseType: 'text'}).pipe(
      this.toast.observe({
        success: "Update Task Successfully",
        loading: 'Logging in...',
        error: 'There was an error'
      })
    ).subscribe(r => console.log(r))
  }

  async deleteTask(id: string) {
    this.http.delete(this.baseURL+"/task/" + id, {responseType: 'text'}).pipe(
      this.toast.observe({
        success: "Delete Task Successfully",
        loading: 'Logging in...',
        error: 'There was an error'
      })
    ).subscribe(r =>{console.log(r)})
  }

  // static servicces methods:

  getScheduledTasks(id:string){
    return this.http.get<Task[]>(this.baseURL+"/task/scheduled/week/"+id)
  }

  getPrivateTasks(id:string){
    return this.http.get<Task[]>(this.baseURL+"/task/private/"+id)
  }

  getHighPrioTasks(id : string){
    return this.http.get<Task[]>(this.baseURL+"/task/priority/"+id)
  }
}
