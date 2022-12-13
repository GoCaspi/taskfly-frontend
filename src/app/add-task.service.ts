import {Injectable, SkipSelf} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BrowserStorageService} from "./storage.service";
//import { FormModel } from '../model/form.model';

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
  getUserInfo(email:String){
    this.http.get("http://localhost:8080/user/userInfo?email=s.armin@gmail.com");

  }


  /*getRegistrationForm(): Promise<FormModel[]> {
    return this.http.get<FormModel[]>("http://localhost:8080/user/userInfo?email=s.armin@gmail.com").toPromise();
  }*/



  createTask(taskTopic:string, userId:string | null, deadline:string, listId:string){

    let newUserId = "123";
    let body : Task = {body:{topic:taskTopic},userId:newUserId,deadline, listId};
    if(!(userId == null)){
      body = {body:{topic:taskTopic},userId:userId,deadline, listId};
    }

    return this.http.post("http://localhost:8080/task",body);


  }



}
