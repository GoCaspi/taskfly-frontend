import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

interface TaskBody{
  topic: string;
}
interface Task{
  body : TaskBody;
  userId : string | null;
  deadline: string;
  listId : string;
}

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {
  baseURL:string|undefined;
  constructor(private http:HttpClient) {
    this.baseURL=process.env['NG_APP_PROD_URL']
  }

  createTask(taskTopic:string, userId:string | null, deadline:string, listId:string){

    let body : Task = {body:{topic:taskTopic},userId:userId,deadline, listId};
    if(userId != null){
      body = {body:{topic:taskTopic},userId:userId,deadline, listId};
    }

    return this.http.post(this.baseURL+"/task",body);
  }

}
