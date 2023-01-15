import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {HotToastService} from "@ngneat/hot-toast";
import {Observable} from "rxjs";


export class TaskBody {
  topic : string | undefined;
  highPriority: string | undefined = "false";
  description: string | undefined;

  constructor(topic: string, highPriority?: string, description?: string){
    this.topic = topic!
    this.highPriority = highPriority!
    this.description = description!
  }
}

export class Task{
  id: string;
  body: TaskBody;
  userId : string;
  listId : string;
  team : string;
  deadline : string;

  constructor(taskObj?: Partial<Task>){
    this.body = new TaskBody(taskObj?.body?.topic!, taskObj?.body?.highPriority, taskObj?.body?.description)
    this.id = taskObj?.id!
    this.userId = taskObj?.userId!
    this.listId = taskObj?.listId!
    this.team = taskObj?.team!
    this.deadline = taskObj?.deadline!
  }
}

export class TaskDialogPayload{
  constructor(task: Task, action: string) {
    this.task = task
    this.action = action
  }
  task: Task
  action: string
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

  createTask(task: Task): Observable<Task>{
    return this.http.post<Task>(this.baseURL+"/task", task);
  }
}
