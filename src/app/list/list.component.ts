import {Component, OnInit, Self, SkipSelf} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListService} from "../serives/list.service";
import {TaskService} from "../serives/task.service";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {BROWSER_STORAGE, BrowserStorageService} from '../storage.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";


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
  id : string;
  team : string;
  deadline : string;
}

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  providers: [TaskDialogComponent, BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]
})
export class ListComponent implements OnInit {
  actualUser : User = {userId:"1"};
  taskData : Task[]=[];
  private dialogRef: MatDialogRef<TaskDialogComponent> | undefined
  constructor(private http: HttpClient, private listService:ListService, private taskService:TaskService,@Self() private sessionStorageService: BrowserStorageService,
  @SkipSelf() private localStorageService: BrowserStorageService,public dialog:MatDialog) { }

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


  openTaskDialog(taskId : string){
  //  this.setSession("currentTask",taskId)
   // this.setLocal("currentTask",taskId)
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

}
