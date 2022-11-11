import {Component, ElementRef, Inject, Injectable, OnInit, Self, SkipSelf, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StaticListService} from "../services/static-list.service";
import {TaskService} from "../services/task.service";
import {BROWSER_STORAGE, BrowserStorageService} from "../services/storage.service";



interface TaskBody{
  topic : string;
  priority: string;
  description: string;
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
  taskId : string | undefined;
  data: Task | undefined
  idFromStorage: string|null = ""



  constructor(public dialog: MatDialog, private sls: TaskService,@Self() private sessionStorageService: BrowserStorageService,
              @SkipSelf() private localStorageService: BrowserStorageService,) {}

  async openDialog(taskId: string) {
    this.taskId = taskId
    let fml;
     this.sls.getTaskById(taskId).subscribe(data => {
      this.data = <Task>data
       fml = <Task>data
      console.log("data out of dialog", this.data)


       const dialogRef = this.dialog.open(TaskDialogComponent);
       console.log("openDialog calles with id :", taskId)

       // @ts-ignore
       document.getElementById("taskContent").innerHTML = "Liste: "+data.listId.toString() + " mit id : "+ data.taskId.toString() + data.body.description.toString()
       this.buildInputs(this.data)

       dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
       });
     })
console.log("this fml is :",fml)
  }

  @ViewChild('taskContent') myDiv: ElementRef | undefined;

  ngAfterViewInit() {
    console.log("after view init ", this.data)
    console.log(this.myDiv?.nativeElement.innerHTML);
    this.myDiv?.nativeElement.insertAdjacentHTML('beforeend', '<div class="two">two</div>');
  }

  buildInputs(data : Task){
    let listIdTxt = data.listId.toString()

    // @ts-ignore
    document.getElementById("listIdInput").innerHTML = listIdTxt
  }

  getInputValues(){
    let listIdVal = document.querySelector('#listIdInput')?.ariaValueNow
    console.log("GETINPUTVALS RETURN",listIdVal)
  }

  ngOnInit(){
    console.log("Local CURRENT task")
    console.log("Data call from TaskDialog OnInit" , this.localStorageService.get("currentListId"),this.localStorageService.get("currentDeadline")," with id : ",this.localStorageService.get("currentTask"))
  }

}
