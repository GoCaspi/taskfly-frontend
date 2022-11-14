import {Component,  Injectable,  Self, SkipSelf, EventEmitter, Output} from '@angular/core';
import { MatDialog,} from "@angular/material/dialog";
import {TaskService} from "../services/task.service";
import {BROWSER_STORAGE, BrowserStorageService} from "../services/storage.service";



interface TaskBody{
  topic : string;
  priority: string;
  description: string;
}
interface TaskUpdate{
  body: TaskBody;
  listId : string;
  team : string;
  deadline : string;
}

interface Task{
  body: TaskBody;
  userId : string;
  listId : string;
  taskIdString : string;
  team : string;
  deadline : string;
}
@Injectable()
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]
})
export class TaskDialogComponent {
  taskId : string ="";
  data: Task | undefined
  listIdInput1 : string ="";
  teamInput : string ="";
  deadlineInput : string ="";
  bTopicInput : string = "";
  bPriorityInput : string = "";
  bDescriptionInput : string = "";
  bodyInput : TaskBody = {topic : "", description : "", priority : ""}


  constructor(public dialog: MatDialog, private sls: TaskService,@Self() private sessionStorageService: BrowserStorageService,
              @SkipSelf() private localStorageService: BrowserStorageService,) {}
@Output() change: EventEmitter<boolean> = new EventEmitter<boolean>()


  ngOnInit(){
    this.taskId = this.localStorageService.get("currentTask")!
    this.setInputFields();
  }

  setInputFields(){
   this.listIdInput1  = this.localStorageService.get("currentListId")!;
    this.teamInput  = this.localStorageService.get("currentTeam")!;
    this.deadlineInput  = this.localStorageService.get("currentDeadline")!;
    this.bTopicInput  = this.localStorageService.get("currentTopic")!;
    this.bPriorityInput  = this.localStorageService.get("currentPriority")!;
    this.bDescriptionInput  = this.localStorageService.get("currentDescription")!;
  }


  sendUpdate(){
    let updateBody : TaskBody = {description:this.bDescriptionInput,topic:this.bTopicInput,priority:this.bPriorityInput}
   let update :  TaskUpdate = {body:updateBody,listId:this.listIdInput1,deadline:this.deadlineInput,team:this.teamInput}
    console.log("update is",update)
    this.sls.updateTask(update, this.taskId).then(r => this.dialog.closeAll())
    this.change.emit(true)
  }

  deleteTask(){
this.sls.deleteTask(this.taskId).then(r => {
  this.localStorageService.setBody("updated",true)
  this.dialog.closeAll()
  this.change.emit(true)
 // window.location.reload()
})
  }

}
