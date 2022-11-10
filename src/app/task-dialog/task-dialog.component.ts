import {Component, Inject, Injectable, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {StaticListService} from "../services/static-list.service";
import {TaskService} from "../services/task.service";
@Injectable()
@Component({
  selector: 'app-task-dialog',
  templateUrl: './task-dialog.component.html',
  styleUrls: ['./task-dialog.component.css']
})
export class TaskDialogComponent  {
  taskId : string | undefined;
  data:any
  constructor(public dialog: MatDialog, private sls: TaskService,) {}

  async openDialog(taskId: string) {
    this.taskId = taskId
     this.sls.getTaskById(taskId).subscribe(data => {
      this.data = data
      console.log("data out of dialog", this.data)

       const dialogRef = this.dialog.open(TaskDialogComponent);
       console.log("openDialog calles with id :", taskId)

       // @ts-ignore
       document.getElementById("taskContent").innerHTML = "Liste: "+data.listId.toString() + " mit id : "+ data.taskId.toString()
       dialogRef.afterClosed().subscribe(result => {
         console.log(`Dialog result: ${result}`);
       });
     })

  }

}
