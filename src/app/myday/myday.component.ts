import {Component, OnInit} from '@angular/core';
import axios from "axios";
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
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


 constructor(private http: HttpClient, private sls: StaticListService) {
  this.user = this.actualUser
}
  async ngOnInit(){
 //   let mDT = await this.MyDayTasks()
 //   console.log("User is :", this.user, " and response from mock is :", mDT)
   await this.renderMyDayTasks()
  }
/*
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

 */

getMyDayTasks(){
   return this.http.get("http://localhost:8080/task/userId/1");
}
renderMyDayTasks(){
  let tData : Task[] = [];
  let myDayTasks : Task[] = [];
   this.sls.getMyDayTasks().subscribe(response =>{
     tData = <Task[]>response;
     tData.forEach(t =>{
       if (t.listId == "MyDay"){myDayTasks.push(t);}
     })

     this.taskData = myDayTasks
     console.log("tData on Object is :",this.taskData);
   })
}



}
