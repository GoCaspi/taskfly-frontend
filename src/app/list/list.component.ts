import { Component, OnInit, Self, SkipSelf} from '@angular/core';
import {ListService} from "../serives/list.service";
import {TaskService} from "../serives/task.service";
import type {Task} from '../serives/task.service'
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {BROWSER_STORAGE, BrowserStorageService} from '../storage.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UpdateListDialogComponent} from "../update-list-dialog/update-list-dialog.component";
import {HotToastService} from "@ngneat/hot-toast";
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
  wsStatus: boolean = false;
  private dialogRef: MatDialogRef<TaskDialogComponent> | undefined
  private listDialogRef: MatDialogRef<UpdateListDialogComponent> | undefined

  constructor( private listService:ListService, private taskService:TaskService,@Self() private sessionStorageService: BrowserStorageService,
  @SkipSelf() private localStorageService: BrowserStorageService,public dialog:MatDialog, public localService:LocalService, private toast: HotToastService) { }

  async ngOnInit(): Promise<any> {
    this.renderList1()
    this.listService.initializeStomp(this.localService.getData("email")!, this.localService.getData("password")!)
      .subscribe(state => {
        if(state == 1){
            this.wsStatus = true
        } else if (state == 0){
            this.wsStatus = false

        }
      })
    this.userIsOwner = this.isOwner();
    console.log(this.localService.getData("inspectedList"))
    this.listService.receiveTaskCollectionUpdates(this.localService.getData("inspectedList")!)
      .subscribe((task: Task) => {
        console.log(task)
        let indexTasks = this.taskData.findIndex(item => item.id === task.id)
        this.taskData[indexTasks] = task
      })
    this.listService.renderCheck.subscribe(statement =>{
      if(statement){
        this.renderList1()
        this.userIsOwner = this.isOwner();

        if(this.IAmStatic1()){
          this.staticList = true;
          this.initRenderImportant()
          this.initRenderScheduled()
          this.initRenderPrivate()
        }else {this.staticList=false;}
      }
    })

  }

  renderHighPrioTasks(){
    let userId = this.localService.getData("loggedInUserId")
    this.taskData = []
    this.renderListName = "Important"
    this.taskService.getHighPrioTasks(userId).pipe(
      this.toast.observe({
        success: 'fetched tasks successfully',
        loading: 'fetching tasks...',
        error: 'There were no tasks found to that list'
      })
    ).subscribe(tasks=>{
      this.taskData = tasks
    })
  }

  renderScheduledTasks(){
    let userId = this.localService.getData("loggedInUserId")
    this.taskData = []
    this.renderListName = "Planned"
    this.taskService.getScheduledTasks(userId).pipe(
      this.toast.observe({
        success: 'fetched tasks successfully',
        loading: 'fetching tasks...',
        error: 'There were no tasks found to that list'
      })
    ).subscribe(tasks=>{
      this.taskData = tasks
    })
  }

  renderPrivateTasks(){
    let userId = this.localService.getData("loggedInUserId")
    this.taskData = []
    this.renderListName = "My Tasks"
    this.taskService.getPrivateTasks(userId).pipe(
      this.toast.observe({
        success: 'fetched tasks successfully',
        loading: 'fetching tasks...',
        error: 'There were no tasks found to that list'
      })
    ).subscribe(tasks=>{
      this.taskData = tasks
    })
  }

  renderList1(){
    this.enabled = true;
    let checkId = this.localService.getData("inspectedList")
    if(!this.IAmStatic1()){
      this.listService.getListById(checkId).subscribe(list =>{
        this.taskData = list.tasks
        this.renderListName = list.name;
      })
    }

  }

  openListDialog(){
    let listId = this.localService.getData("inspectedList")
    this.listService.getListById(listId).subscribe(list =>{
      if(list.members.length < 2 && list.members[0] == ""){
        this.localService.saveData("inspectedListMembers", "")
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
      let myData = <Task> data

      let taskDTO : TaskData = {currentListId:myData.listId, currentDeadline: myData.deadline, currentTopic:myData.body.topic,
      currentDescription:myData.body.description,currentPriority:myData.body.highPriority.toString(), currentTeam:myData.team}
      this.localService.setTaskDTOToStore(taskDTO)

      this.dialogRef = this.dialog.open(TaskDialogComponent, {data: myData})
      this.dialogRef.afterClosed().subscribe((task: Task) =>{
        this.listService.sendTaskCollectionUpdates(task, this.sessionStorageService.get("inspectedList")!)
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
