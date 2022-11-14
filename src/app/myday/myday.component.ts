import {Component, OnInit, Renderer2, Self, SkipSelf} from '@angular/core';

import {StaticListService} from "../services/static-list.service";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {BROWSER_STORAGE, BrowserStorageService} from "../services/storage.service";
import {TaskService} from "../services/task.service";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

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
render: boolean = false;
private dialogRef: MatDialogRef<TaskDialogComponent> | undefined

 constructor( public dialog:MatDialog, renderer: Renderer2,private sls: StaticListService, public td:TaskDialogComponent, @Self() private sessionStorageService: BrowserStorageService,
  @SkipSelf() private localStorageService: BrowserStorageService,private taskService: TaskService) {
  this.user = this.actualUser
}
  async ngOnInit(){
    this.renderMyDayTasks()
  }

  reRender(event: boolean){
   console.log("EVENT CALL ",event)
   this.render = event
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
  this.setSession("currentTask",taskId)
  this.setLocal("currentTask",taskId)
  this.taskService.getTaskById(taskId).subscribe(data =>{
    let myData = <Task>data
    this.localStorageService.set("currentListId",myData.listId)
    this.localStorageService.set("currentDeadline",myData.deadline)
    this.localStorageService.setBody("currentBody",myData.body)
    this.localStorageService.set("currentTopic",myData.body.topic)
    this.localStorageService.set("currentDescription",myData.body.description)
    this.localStorageService.set("currentPriority",myData.body.priority)
    this.localStorageService.set("currentTeam",myData.team)

    this.dialogRef = this.dialog.open(TaskDialogComponent)
    this.dialogRef.afterClosed().subscribe(r =>{
      this.renderMyDayTasks()
  })

  })
}


  setSession(key : string, value : string) {
    this.sessionStorageService.set(key, value);
  }

  setLocal(key : string, value : string) {
    this.localStorageService.set(key, value);
  }

}
