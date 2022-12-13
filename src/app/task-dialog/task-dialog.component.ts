import {Component,  Injectable,  Self, SkipSelf, EventEmitter, Output} from '@angular/core';
import { MatDialog,} from "@angular/material/dialog";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {TaskService} from "../serives/task.service";
import {ListService} from "../serives/list.service";


interface List{
  id:string;
  name:string;
  teamId:string;
}

interface TaskBody{
  topic : string;
  highPriority: string;
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
  nameIdMap:Map<string, string>= new Map<string, string>();
  bodyInput : TaskBody = {topic : "", description : "", highPriority : ""}
  startDate = new Date(2022, 0, 1);
  allLists:any;

  constructor(public dialog: MatDialog, private sls: TaskService,@Self() private sessionStorageService: BrowserStorageService,
              @SkipSelf() private localStorageService: BrowserStorageService, private listService:ListService) {}
  @Output() change: EventEmitter<boolean> = new EventEmitter<boolean>()


  ngOnInit(){
    this.taskId = this.localStorageService.get("currentTask")!
    this.setInputFields();
    this.listService.getAllListsByUserId(this.localStorageService.get("loggedInUserId")!).subscribe((data) =>{
      this.allLists=data
      this.nameIdMap=this.nameListIdMap(this.allLists)
      console.log("NAMEIDMAP key: listname val:listId : ",this.nameIdMap)
    })
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
    console.log("PRIO INPUT VAL: ", this.bPriorityInput)
    let updateBody : TaskBody = {description:this.bDescriptionInput,topic:this.bTopicInput,highPriority:this.bPriorityInput}
    console.log("FORMATATION", this.formatListNameToId(this.listIdInput1))
    let update :  TaskUpdate = {body:updateBody,listId:this.formatListNameToId(this.listIdInput1),deadline:this.deadlineInput,team:this.teamInput}
    console.log("update is",update)

    this.sls.updateTask(update, this.taskId).then(_r => this.dialog.closeAll())
    this.change.emit(true)
  }

  deleteTask(){
    this.sls.deleteTask(this.taskId).then(_r => this.dialog.closeAll())
    this.localStorageService.setBody("updated",true)
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
