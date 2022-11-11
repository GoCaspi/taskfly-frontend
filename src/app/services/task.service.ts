import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http:HttpClient) { }
  getTaskById(id : string|null){
    if(id == null){return this.http.get("http://localhost:8080/task/taskId/")}
    return this.http.get("http://localhost:8080/task/taskId/"+id)
  }
}
