import {Component, Injectable, Self, EventEmitter, Output, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef,} from "@angular/material/dialog";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {TaskDialogPayload, TaskService} from "../serives/task.service";
import {ListService} from "../serives/list.service";
import {LocalService} from "../serives/local.service";


interface List {
  id: string;
  name: string;
  teamId: string;
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
  deadlineInput : Date = new Date();
  bTopicInput : string = "";
  nameIdMap:Map<string, string>= new Map<string, string>();
  startDate = new Date(2022, 0, 1);
  allLists:any;
  selectedPriority: string = ""
  selectedDate: Date | null = new Date()

  constructor(public dialog: MatDialog, private sls: TaskService,@Self() private sessionStorageService: BrowserStorageService,
 private listService:ListService,  public dialogRef: MatDialogRef<TaskDialogComponent>, @Inject(MAT_DIALOG_DATA) public taskDialogPayload: TaskDialogPayload,
              public localService:LocalService) {}
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>()
  formatDate(date:string) : string {
    let stringArray = date.split("");
    stringArray = stringArray.slice(0, stringArray.length-5);
    stringArray.forEach((letter,index) =>  {if (letter == "T"){stringArray[index]=" "}});
    return stringArray.join("");
  }
  ngOnInit(){
    if (this.taskDialogPayload.task.deadline != (null || undefined)){
      this.selectedDate = new Date(this.taskDialogPayload.task.deadline)
    }
    if (this.taskDialogPayload.task.body.highPriority != null || undefined){
      if(this.taskDialogPayload.task.body.highPriority){
        this.selectedPriority = 'true'
      } else {
        this.selectedPriority = 'false'
      }
    }
    this.listService.getAllListsByUserId(this.localService.getData("loggedInUserId")!).subscribe((data) =>{
      this.allLists=data
      this.nameIdMap=this.nameListIdMap(this.allLists)
      console.log("NAMEIDMAP key: listname val:listId : ",this.nameIdMap)
    })
  }

  sendUpdate(){
    this.taskDialogPayload.action = "update"
    this.taskDialogPayload.task.deadline = this.formatDate(this.selectedDate?.toISOString()!)
//    this.task.body.highPriority = (this.selectedPriority === 'true')
    this.taskDialogPayload.task.listId = this.formatListNameToId(this.taskDialogPayload.task.listId)
    this.sls.updateTask(this.taskDialogPayload.task, this.taskDialogPayload.task.id).then(() => this.dialogRef.close(this.taskDialogPayload))
  }

  deleteTask(){
    this.taskDialogPayload.action = "delete"
    this.sls.deleteTask(this.taskDialogPayload.task.id).then(_r => {
      this.dialogRef.close(this.taskDialogPayload)
    })
  //  this.sessionStorageService.setBody("updated",true)
  }
  nameListIdMap(allLists:List[]){
    let nameIdMap = new Map();
    allLists.forEach(list =>{
      if(nameIdMap.get(list.name) == undefined || nameIdMap.get(list.name) == ""){
        nameIdMap.set(list.name,list.id)
      }
    })
    return nameIdMap
  }

  formatListNameToId(name:string):string{
    let value = this.nameIdMap.get(name)
    if(value == undefined || value == "" ){
      return ""
    }
    return this.nameIdMap.get(name)!
  }

}
