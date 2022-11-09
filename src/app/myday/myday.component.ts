import {Component, OnInit} from '@angular/core';
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
  listId : string;
}

@Component({
  selector: 'app-myday',
  templateUrl: './myday.component.html',
  styleUrls: ['./myday.component.css']
})
export class MydayComponent implements OnInit {
user : User;
actualUser : User = {userId:"1"};
taskData : Task[]=[];


 constructor() {
  this.user = this.actualUser
}
  async ngOnInit(){
    let mDT = await this.MyDayTasks()
    console.log("User is :", this.user, " and response from mock is :", mDT)
  }

 async MyDayTasks() : Promise<Task[]>{
   let tData : Task[] = [];
   let myDayTasks : Task[] = [];
try {
    await axios.get("http://localhost:8080/task/userId/1").then(response =>{tData = <Task[]>response.data;});
}
catch (err){ console.log(err) }

   tData.forEach(t =>{
     if (t.listId == "MyDay"){myDayTasks.push(t);}
   })

this.taskData = myDayTasks
 console.log("tData on Object is :",this.taskData);
   return myDayTasks
}



}
