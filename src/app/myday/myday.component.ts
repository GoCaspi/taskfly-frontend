import {Component, OnInit} from '@angular/core';

import {StaticListService} from "../services/static-list.service";

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
  styleUrls: ['./myday.component.css'],
  providers: []
})
export class MydayComponent implements OnInit {
user : User;
actualUser : User = {userId:"1"};
taskData : Task[]=[];


 constructor( private sls: StaticListService) {
  this.user = this.actualUser
}
  async ngOnInit(){
    this.renderMyDayTasks()
  }


renderMyDayTasks(){
  let tData : Task[] = [];
  let myDayTasks : Task[] = [];
   this.sls.getMyDayTasks(this.actualUser.userId).subscribe(response =>{
     tData = <Task[]>response;
     tData.forEach(t =>{
       if (t.listId == "MyDay"){myDayTasks.push(t);}
     })

     this.taskData = myDayTasks
     console.log("tData on Object is :",this.taskData);
   })
}



}
