import {Component, OnInit, Self, SkipSelf} from '@angular/core';

import {StaticListService} from "../services/static-list.service";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {BROWSER_STORAGE, BrowserStorageService} from "../services/storage.service";

class TaskCollection {
  members : string[] = ["1"];
  collectionId : string = "1";
  userId : string ="1";

}
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
  selector: 'app-myday',
  templateUrl: './myday.component.html',
  styleUrls: ['./myday.component.css'],
  providers: [TaskDialogComponent, BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]
})
export class MydayComponent implements OnInit {
user : User;
actualUser : User = {userId:"1"};
taskData : Task[]=[];


 constructor( private sls: StaticListService, public td:TaskDialogComponent, @Self() private sessionStorageService: BrowserStorageService,
  @SkipSelf() private localStorageService: BrowserStorageService,) {
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

openTaskDialog(taskId : string){
   this.td.taskId =taskId
   this.td.openDialog(taskId);
   this.setSession("currentTask",taskId)
  this.setLocal("currentTask",taskId)
}



  setSession(key : string, value : string) {
    this.sessionStorageService.set(key, value);
  }

  setLocal(key : string, value : string) {
    this.localStorageService.set(key, value);
  }

}
