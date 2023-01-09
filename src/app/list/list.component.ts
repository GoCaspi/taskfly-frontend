import { Component, OnInit, Self, SkipSelf} from '@angular/core';
import {ListService} from "../serives/list.service";
import {TaskService} from "../serives/task.service";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {BROWSER_STORAGE, BrowserStorageService} from '../storage.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UpdateListDialogComponent} from "../update-list-dialog/update-list-dialog.component";
import {LocalService, TaskData} from "../serives/local.service";

interface List{
  id:string;
  name:string;
  teamId:string;
  tasks:Task[]
}
interface User{
  userId : string;

}
interface TaskBody{
  topic : string;
  highPriority: string | boolean;
  description: string;
}

interface Task  {
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
  providers: [TaskDialogComponent, BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage },UpdateListDialogComponent]
})
export class ListComponent implements OnInit {
  taskData : Task[]=[];
  enabled:boolean = true;
  userIsOwner:boolean=false;
  renderListName:string="";
  staticList:boolean = false;
  private dialogRef: MatDialogRef<TaskDialogComponent> | undefined
  private listDialogRef: MatDialogRef<UpdateListDialogComponent> | undefined

  constructor( private listService:ListService, private taskService:TaskService,@Self() private sessionStorageService: BrowserStorageService,
  @SkipSelf() private localStorageService: BrowserStorageService,public dialog:MatDialog, public localService:LocalService) { }

  ngOnInit(): void {
    this.renderList1()
    this.userIsOwner = this.isOwner();
    this.listService.renderCheck.subscribe(statement =>{
      if(statement){
        this.renderList1()
        this.userIsOwner = this.isOwner();
        if(this.userIsOwner){
          console.log("I AM OWNER!!!")
        }

        if(this.IAmStatic1()){
          this.staticList = true;
          this.initRenderImportant()
          console.log("finished ininitRenderImportant. TaskData is: ",this.taskData)
          this.initRenderScheduled()
          this.initRenderPrivate()
        }else {this.staticList=false;}
      }
    })

  }

  renderHighPrioTasks(){
    let userId = this.localService.getData("loggedInUserId")
    this.taskData = []
    this.taskService.getHighPrioTasks(userId).subscribe(tasks=>{
      this.taskData = tasks
      this.renderListName = "Wichtig"
    })
  }

  renderScheduledTasks(){
    let userId = this.localService.getData("loggedInUserId")
    this.taskData = []
    this.taskService.getScheduledTasks(userId).subscribe(tasks=>{
      this.taskData = tasks
      this.renderListName = "Planned"
    })
  }

  renderPrivateTasks(){
    let userId = this.localService.getData("loggedInUserId")
    this.taskData = []
    this.taskService.getPrivateTasks(userId).subscribe(tasks=>{
      this.taskData = tasks
      this.renderListName = "MyDay"
    })
  }

  renderList1(){
    this.enabled = true;
    let checkId = this.localService.getData("inspectedList")
    this.listService.getListById(checkId).subscribe(list =>{
      this.taskData = list.tasks
      this.renderListName = list.name;
    })
  }

  openListDialog(){
    let listId = this.localService.getData("inspectedList")
    this.listService.getListById(listId).subscribe(list =>{
      if(list.members == null){
        this.localService.saveData("inspectedListMembers","")
        this.listDialogRef = this.dialog.open(UpdateListDialogComponent)
        this.listDialogRef.afterClosed().subscribe(_r =>{
          this.renderList1()
        })
      } else  {
        this.localService.saveData("inspectedListMembers",list.members.join())
        this.listDialogRef = this.dialog.open(UpdateListDialogComponent)
        this.listDialogRef.afterClosed().subscribe(_r =>{
          this.renderList1()
        })
      }
    })
  }

  deleteList(){
    let listId = this.localService.getData("inspectedList")
    this.listService.deleteList(listId).subscribe(_response =>{
      this.listService.toggleRenderList();
     this.listService.toggleRender();
    this.taskData =[]
     this.enabled = false;
    })
  }


  openTaskDialog(taskId : string){
    this.localService.saveData("currentTask",taskId)
    this.taskService.getTaskById(taskId).subscribe(data =>{
      let myData = <Task>data

      let taskDTO : TaskData = {currentListId:myData.listId, currentDeadline: myData.deadline, currentTopic:myData.body.topic,
      currentDescription:myData.body.description,currentPriority:myData.body.highPriority.toString(), currentTeam:myData.team}
      this.localService.setTaskDTOToStore(taskDTO)

      this.dialogRef = this.dialog.open(TaskDialogComponent)
      this.dialogRef.afterClosed().subscribe(_r =>{
        this.renderList1()
      })

    })
  }


  IAmStatic1() : boolean{
    let checkName = this.localService.getData("inspectedListName")
    let checkId = this.localService.getData("loggedInUserId")
    return (checkName == "MyDay" || checkName == "Important" || checkName == "" || checkName == "Geplant") && checkId == this.localService.getData("inspectedListOwnerId");
  }

  initRenderImportant(){
    let checkName = this.localService.getData("inspectedListName")
    if(checkName === "Important"){
      this.renderHighPrioTasks()
    }
  }

  initRenderScheduled(){
    let checkName = this.localService.getData("inspectedListName")
    if(checkName === "Geplant"){
      this.renderScheduledTasks()
    }
  }

  initRenderPrivate(){
    let checkName = this.localService.getData("inspectedListName")
    if(checkName === "MyDay"){
      this.renderPrivateTasks()
    }
  }

  isOwner() : boolean{
    let checkId = this.localService.getData("loggedInUserId")
      return checkId == this.localService.getData("inspectedListOwnerId");
  }

}
