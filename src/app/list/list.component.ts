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
  highPriority: string;
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
  actualUser : User = {userId:"1"};
  taskData : Task[]=[];
  listTasks: Task[]=[];
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
        }else {this.staticList=false;}
      }
    })

  }

  renderList1(){
    this.enabled = true;
 //   let checkId = this.sessionStorageService.get("inspectedList")!
    let checkId = this.localService.getData("inspectedList")
    this.listService.getListById(checkId).subscribe(list =>{
      this.taskData = list.tasks
      this.renderListName = list.name;
    })
  }

  openListDialog(){
   // let listId = this.sessionStorageService.get("inspectedList")!
    let listId = this.localService.getData("inspectedList")
    this.listService.getListById(listId).subscribe(list =>{
      if(list.members == null){
  //      this.sessionStorageService.set("inspectedListMembers", "")
        this.localService.saveData("inspectedListMembers","")
        this.listDialogRef = this.dialog.open(UpdateListDialogComponent)
        this.listDialogRef.afterClosed().subscribe(_r =>{
          this.renderList1()
        })
      } else  {
    //    this.sessionStorageService.set("inspectedListMembers", list.members.join())
        this.localService.saveData("inspectedListMembers",list.members.join())
        this.listDialogRef = this.dialog.open(UpdateListDialogComponent)
        this.listDialogRef.afterClosed().subscribe(_r =>{
          this.renderList1()
        })
      }
    })
  }

  deleteList(){
  //  let listId = this.sessionStorageService.get("inspectedList")!
    let listId = this.localService.getData("inspectedList")
    this.listService.deleteList(listId).subscribe(_response =>{
      this.listService.toggleRenderList();
     this.listService.toggleRender();
    this.taskData =[]
     this.enabled = false;
    })
  }


  openTaskDialog(taskId : string){
  //  this.setSession("currentTask",taskId)
  //  this.setLocal("currentTask",taskId)
    this.localService.saveData("currentTask",taskId)
    this.taskService.getTaskById(taskId).subscribe(data =>{
      let myData = <Task>data
      /*
      this.sessionStorageService.set("currentListId",myData.listId)
      this.sessionStorageService.set("currentDeadline",myData.deadline)
      this.sessionStorageService.setBody("currentBody",myData.body)
      this.sessionStorageService.set("currentTopic",myData.body.topic)
      this.sessionStorageService.set("currentDescription",myData.body.description)
      this.sessionStorageService.set("currentPriority",myData.body.highPriority)
      this.sessionStorageService.set("currentTeam",myData.team)
       */
      let taskDTO : TaskData = {currentListId:myData.listId, currentDeadline: myData.deadline, currentTopic:myData.body.topic,
      currentDescription:myData.body.description,currentPriority:myData.body.highPriority.toString(), currentTeam:myData.team}
      this.localService.setTaskDTOToStore(taskDTO)

      this.dialogRef = this.dialog.open(TaskDialogComponent)
      this.dialogRef.afterClosed().subscribe(_r =>{
        this.renderList1()
      })

    })
  }
  setSession(key : string, value : string) {
    this.sessionStorageService.set(key, value);
  }

  setLocal(key : string, value : string) {
    this.sessionStorageService.set(key, value);
  }


  IAmStatic1() : boolean{
  //  let checkName = this.sessionStorageService.get("inspectedListName")
  //  let checkId = this.sessionStorageService.get("loggedInUserId")
    let checkName = this.localService.getData("inspectedListName")
    let checkId = this.localService.getData("loggedInUserId")
    if((checkName == "MyDay" || checkName == "Important" || checkName == "" || checkName == "Geplant") && checkId == this.sessionStorageService.get("inspectedListOwnerId")){
      return true
    }
    return false
  }

  isOwner() : boolean{
 //   let checkId = this.sessionStorageService.get("loggedInUserId")
    let checkId = this.localService.getData("loggedInUserId")
  //  if( checkId == this.sessionStorageService.get("inspectedListOwnerId")){
      if( checkId == this.localService.getData("inspectedListOwnerId")){
      return true
    }
    return false
  }

}
