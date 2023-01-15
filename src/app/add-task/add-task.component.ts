import {Component, EventEmitter, OnInit, Output, Self} from '@angular/core';
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {ListService} from "../serives/list.service";
import {LocalService} from "../serives/local.service";
import {TaskDialogPayload, TaskService, Task, TaskBody} from "../serives/task.service";

@Component({

  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})

export class AddTaskComponent{
  @Output() taskEvent = new EventEmitter<TaskDialogPayload>()

  tasks : string ="" ;
  date : Date =new Date();
  event: string ="";
  message : string="";
  value: string =" ";
  hidden: boolean = false;
  taskObj: Task = new Task()





  constructor(@Self() private sessionStorageService: BrowserStorageService,
            private taskService: TaskService,public listService:ListService, public localService:LocalService){
}

  task(_$event: any){
    this.taskObj.deadline = this.formatDate(this.date.toISOString());
    this.taskObj.userId = this.localService.getData("loggedInUserId")
    this.taskObj.listId = this.localService.getData("inspectedList")
    if(this.taskObj.body.topic == '')
    {
      this.message="Das Textfeld ist Leer!";
    }
    else {
      this.taskService.createTask(this.taskObj).subscribe(taskData => {
        let taskDialogPayload: TaskDialogPayload = new TaskDialogPayload(taskData, "new")
        this.taskEvent.emit(taskDialogPayload)
        this.listService.toggleRender()
        this.listService.toggleRenderList()
      });
    this.tasks = this.value;

    }

  }

  formatDate(date:string) : string {
    let stringArray = date.split("");
    stringArray = stringArray.slice(0, stringArray.length-5);
    stringArray.forEach((letter,index) =>  {if (letter == "T"){stringArray[index]=" "}});

    return stringArray.join("");
  }


}

