import { Component, OnInit, Self, SkipSelf} from '@angular/core';
import {ListService} from "../serives/list.service";
import {TaskService} from "../serives/task.service";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {BROWSER_STORAGE, BrowserStorageService} from '../storage.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UpdateListDialogComponent} from "../update-list-dialog/update-list-dialog.component";

/**
 * Interface of List
 */
interface List{
  id:string;
  name:string;
  teamId:string;
  tasks:Task[]
}

/**
 * Interface of User
 */
interface User{
  userId : string;

}

/**
 * Interface of TaskBody
 */
interface TaskBody{
  topic : string;
  highPriority: string;
  description: string;
}

/**
 * Interface of Task
 */
interface Task  {
  body: TaskBody;
  userId : string;
  listId : string;
  id : string;
  team : string;
  deadline : string;
}

/**
 * class of ListComponent that implements OnInit
 */
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
  @SkipSelf() private localStorageService: BrowserStorageService,public dialog:MatDialog) { }

  ngOnInit(): void {
    this.renderList1()
    this.userIsOwner = this.isOwner();
    this.listService.renderCheck.subscribe(statement =>{
      console.log("RenderCheck from Service is ", statement)
      if(statement){
        this.renderList1()
        this.userIsOwner = this.isOwner();
        if(this.userIsOwner){
          console.log("I AM OWNER!!!")
        }

        if(this.IAmStatic1()){
          this.staticList = true;
          console.log("I AM STATIC1")
        }else {this.staticList=false;}
      }
    })

  }

  /**
   * In this method the inspectedList id from sessionStorage is stored in a variable and sent to the service to get a list for the given id
   */
  renderList1(){
    this.enabled = true;
    let checkId = this.sessionStorageService.get("inspectedList")!
    this.listService.getListById(checkId).subscribe(list =>{
      this.taskData = list.tasks
      this.renderListName = list.name;
    })
  }

  /**
   * In this method the inspectedList id from sessionStorage is stored in a variable and sent to the service to get a list for the given id
   */
  openListDialog(){
    let listId = this.sessionStorageService.get("inspectedList")!
    this.listService.getListById(listId).subscribe(list =>{
      if(list.members == null){
        this.sessionStorageService.set("inspectedListMembers", "")
        this.listDialogRef = this.dialog.open(UpdateListDialogComponent)
        this.listDialogRef.afterClosed().subscribe(_r =>{
          this.renderList1()
        })
      } else  {
        this.sessionStorageService.set("inspectedListMembers", list.members.join())
        this.listDialogRef = this.dialog.open(UpdateListDialogComponent)
        this.listDialogRef.afterClosed().subscribe(_r =>{
          this.renderList1()
        })
      }
    })
  }

  /**
   * In this method the inspectedList id from sessionStorage is stored in a variable and sent to the service to delete a list for the given id
   */
  deleteList(){
    let listId = this.sessionStorageService.get("inspectedList")!
    this.listService.deleteList(listId).subscribe(_response =>{
      this.listService.toggleRenderList();
     this.listService.toggleRender();
     this.enabled = false;
    })
  }

  /**
   * In this method, either the tasks are called for the specified task id or, if there is no task id, all tasks are called and displayed.
   * @param taskId
   */
  openTaskDialog(taskId : string){
    this.setSession("currentTask",taskId)
    this.setLocal("currentTask",taskId)
    this.taskService.getTaskById(taskId).subscribe(data =>{
      let myData = <Task>data
      this.sessionStorageService.set("currentListId",myData.listId)
      this.sessionStorageService.set("currentDeadline",myData.deadline)
      this.sessionStorageService.setBody("currentBody",myData.body)
      this.sessionStorageService.set("currentTopic",myData.body.topic)
      this.sessionStorageService.set("currentDescription",myData.body.description)
      this.sessionStorageService.set("currentPriority",myData.body.highPriority)
      this.sessionStorageService.set("currentTeam",myData.team)

      this.dialogRef = this.dialog.open(TaskDialogComponent)
      this.dialogRef.afterClosed().subscribe(_r =>{
        this.renderList1()
      })

    })
  }

  /**
   *
   * @param key
   * @param value
   */
  setSession(key : string, value : string) {
    this.sessionStorageService.set(key, value);
  }

  /**
   *
   * @param key
   * @param value
   */
  setLocal(key : string, value : string) {
    this.sessionStorageService.set(key, value);
  }

  /**
   * returns all static lists if the checkname = "MyDay", "Important", "", or "Scheduled".
   * @constructor
   */
  IAmStatic1() : boolean{
    let checkName = this.sessionStorageService.get("inspectedListName")
    let checkId = this.sessionStorageService.get("loggedInUserId")
    if((checkName == "MyDay" || checkName == "Important" || checkName == "" || checkName == "Geplant") && checkId == this.sessionStorageService.get("inspectedListOwnerId")){
      return true
    }
    return false
  }

  /**
   * checks if the logged in user is also the owner of the lists
   */
  isOwner() : boolean{
    let checkId = this.sessionStorageService.get("loggedInUserId")
    if( checkId == this.sessionStorageService.get("inspectedListOwnerId")){
      return true
    }
    return false
  }

}
