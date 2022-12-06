import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListService} from "../serives/list.service";


interface User{
  userId : string;

}
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

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  actualUser : User = {userId:"1"};
  taskData : Task[]=[];

  constructor(private http: HttpClient, private listService:ListService) { }

  ngOnInit(): void {
    this.renderMyDayTasks()
  }
  renderMyDayTasks(){
    let tData : Task[] = [];
    let myDayTasks : Task[] = [];
    this.listService.getTasksOfList(this.actualUser.userId).subscribe(response =>{
      tData = <Task[]>response;
      tData.forEach(t =>{
        if (t.listId == "MyDay"){myDayTasks.push(t);}
      })

      this.taskData = myDayTasks
      console.log("tData on Object is :",this.taskData);
    })
  }
}
