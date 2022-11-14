import {Component, ElementRef, Inject, Injectable, OnInit, Self, SkipSelf, ViewChild, EventEmitter, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StaticListService} from "../services/static-list.service";
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



  async openDialog(taskId: string) {
    this.taskId = taskId
     this.sls.getTaskById(taskId).subscribe(data => {
      this.data = <Task>data

      console.log("data out of dialog", this.data)


       const dialogRef = this.dialog.open(TaskDialogComponent);
       console.log("openDialog calles with id :", taskId)


       dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
        // window.location.reload()
          this.change.emit(true)
       });
     })
    this.change.emit(true)
  }



  ngOnInit(){
    this.taskId = this.localStorageService.get("currentTask")!
    console.log("Data call from TaskDialog OnInit" , this.localStorageService.get("currentListId"),this.localStorageService.get("currentDeadline")," with id : ",this.localStorageService.get("currentTask"))
    // @ts-ignore
    document.getElementById("taskContent").innerHTML = "Liste: "+this.localStorageService.get("currentListId") + " mit id : "
      + this.localStorageService.get("currentTask")+" description "  + this.localStorageService.get("currentDescription")
    this.listIdInput1 = this.localStorageService.get("currentListId")!
    this.setInputFields();

  }

  setInputFields(){
   this.listIdInput1  =this.localStorageService.get("currentListId")!;
    this.teamInput  = this.localStorageService.get("currentTeam")!;
    this.deadlineInput  = this.localStorageService.get("currentDeadline")!;
    this.bTopicInput  = this.localStorageService.get("currentTopic")!;
    this.bPriorityInput  = this.localStorageService.get("currentPriority")!;
    this.bDescriptionInput  = this.localStorageService.get("currentDescription")!;
  }

  @ViewChild("listIdInput") myNameElem! : ElementRef ;
  getValue() {
    let elem = document.getElementById('listIdInput');
    if(typeof elem !== null && elem !== undefined ) {
    //  document.getElementById("listIdInput")!.innerHTML = "changed";
      console.log("getVal ", document.getElementById("listIdInput")!.innerHTML)
      console.log("ngModel Input is : ",this.listIdInput1)
    }
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
  window.location.reload()
})
  }

}
