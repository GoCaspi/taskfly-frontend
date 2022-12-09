import {Component, OnInit, Self, SkipSelf} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ListService} from "../serives/list.service";
import {TaskService} from "../serives/task.service";
import {TaskDialogComponent} from "../task-dialog/task-dialog.component";
import {BROWSER_STORAGE, BrowserStorageService} from '../storage.service';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UpdateListDialogComponent} from "../update-list-dialog/update-list-dialog.component";

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
  priority: string;
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
  userIsOwner:boolean=false;
  renderListName:string="";
  private dialogRef: MatDialogRef<TaskDialogComponent> | undefined
  private listDialogRef: MatDialogRef<UpdateListDialogComponent> | undefined

  constructor(private http: HttpClient, private listService:ListService, private taskService:TaskService,@Self() private sessionStorageService: BrowserStorageService,
  @SkipSelf() private localStorageService: BrowserStorageService,public dialog:MatDialog) { }

  ngOnInit(): void {
  //  this.renderMyDayTasks()
    this.renderList1()
    this.userIsOwner = this.isOwner();
    this.listService.renderCheck.subscribe(statement =>{
      console.log("RenderCheck from Service is ", statement)
      if(statement){
    //    this.renderMyDayTasks()
        this.renderList1()
        this.userIsOwner = this.isOwner();
        if(this.userIsOwner){
          console.log("I AM OWNER!!!")
        }

        if(this.IAmStatic1()){
          console.log("I AM STATIC1")
        }
      }
    })

  }
  renderMyDayTasks(){
    let checkId = this.localStorageService.get("inspectedList")

    let staticOrDynamic = this.IAmStatic()
    console.log("Clicked list check for static or dynamic is: ", staticOrDynamic)
    console.log("In ListComponent following listId is choosen: ",checkId)
    let tData : Task[] = [];
    let myDayTasks : Task[] = [];
    this.listService.getTasksOfList(this.localStorageService.get("loggedInUserId")!).subscribe(response =>{
      tData = <Task[]>response;
      if(!staticOrDynamic){
        tData.forEach(t =>{
          if (t.listId == checkId){myDayTasks.push(t);}
        })
      }
      else{
      let staticTasks = this.initStatic(tData,this.localStorageService.get("inspectedListName")!)
        myDayTasks = staticTasks;
      }


      this.taskData = myDayTasks
      console.log("tData on Object is :",this.taskData);
    })
  }

  renderList(){
    let checkId = this.localStorageService.get("inspectedList")!
    this.listService.getListById(checkId).subscribe(list =>{
      list.tasks.forEach(t =>{
       // this.listTasks.push(t)
         this.taskData.push(t)
        console.log("RENDERLIST METHOD :", this.listTasks)
      })
    })

}

  renderList1(){
    let checkId = this.localStorageService.get("inspectedList")!
    this.listService.getListById(checkId).subscribe(list =>{
      this.taskData = list.tasks
      this.renderListName = list.name;
    })
  }

  openListDialog(){
    let listId = this.localStorageService.get("inspectedList")!
    this.listService.getListById(listId).subscribe(list =>{
      this.localStorageService.set("inspectedListMembers", list.members.join())
      this.listDialogRef = this.dialog.open(UpdateListDialogComponent)
      this.listDialogRef.afterClosed().subscribe(r =>{
        //   this.renderMyDayTasks()
        this.renderList1()
      })
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
     //   this.renderMyDayTasks()
        this.renderList1()
      })

    })
  }
  setSession(key : string, value : string) {
    this.sessionStorageService.set(key, value);
  }

  setLocal(key : string, value : string) {
    this.localStorageService.set(key, value);
  }

  IAmStatic() : boolean{
    let checkId = this.localStorageService.get("inspectedListName")
    console.log("instepected list name from IAMStatic : ",checkId)
    if(checkId == "MyDay" || checkId == "Important" || checkId == "" || checkId == "Geplant"){
      return true
    }
    return false
  }

  IAmStatic1() : boolean{
    let checkName = this.localStorageService.get("inspectedListName")
    let checkId = this.localStorageService.get("loggedInUserId")
    console.log("instepected list name from IAMStatic : ",checkName)
    if((checkName == "MyDay" || checkName == "Important" || checkName == "" || checkName == "Geplant") && checkId == this.localStorageService.get("inspectedListOwnerId")){
      return true
    }
    return false
  }

  isOwner() : boolean{
    let checkId = this.localStorageService.get("loggedInUserId")
    if( checkId == this.localStorageService.get("inspectedListOwnerId")){
      return true
    }
    return false
  }

  initStatic(allTasks:Task[],staticType:string):Task[]{
    let resultArr : Task[] = []
   allTasks.forEach(t =>{
      if (t.listId == staticType){resultArr.push(t);}
    })
    return resultArr
  }

}
