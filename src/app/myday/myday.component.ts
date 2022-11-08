import { Component } from '@angular/core';
import axios from "axios";

class TaskCollection {
  members : string[] = ["1"];
  collectionId : string = "1";
  userId : string ="1";

}
interface User{
  userId : string;

}
interface Task{
  description : string;
  userId : string;
}

@Component({
  selector: 'app-myday',
  templateUrl: './myday.component.html',
  styleUrls: ['./myday.component.css']
})
export class MydayComponent   {
user : User;
actualUser : User = {userId:"1"}
constructor() {
  this.user = this.actualUser
  let mDT = this.MyDayTasks()
  console.log("User is :",this.user," and response from mock is :",mDT)

}

 MyDayTasks() : Task[]{
let t :  Task[] = [{description:"",userId:""}]
 let allTasks =   axios.get("http://localhost:8080/task/userId/1");
   console.log("response from api :",allTasks)
   return t
}
}
