import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface TaskBody{
  topic: string;
}
interface Task{
  body : TaskBody;
  userId : string;
  deadline: string;
  listId : string;
}

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
  constructor(private http:HttpClient) { }

  createTask(taskTopic:string, userId:string | null, deadline:string, listId:string){

    let newUserId = "123";
    let body : Task = {body:{topic:taskTopic},userId:newUserId,deadline, listId};
    if(userId != null){
      body = {body:{topic:taskTopic},userId:userId,deadline, listId};
    }

    return this.http.post("http://localhost:8080/task",body);
  }

}
