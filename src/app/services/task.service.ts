import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";


interface TaskBody{
  topic : string;
  priority: string;
  description: string;
}

interface Task{
  body: TaskBody;
  userId : string;
  listId : string;
  taskIdString : string;
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

  constructor(private http:HttpClient) { }
  getTaskById(id : string|null){
    if(id == null){return this.http.get("http://localhost:8080/task/taskId/")}
    return this.http.get("http://localhost:8080/task/taskId/"+id)
  }

  async updateTask(task: TaskUpdate, id: string) {
   let taskString = JSON.stringify(task)
    await this.http.post("localhost:8080/task/" + id, taskString).subscribe(response => console.log(response))
  }
}
