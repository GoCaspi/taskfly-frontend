import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-reset-dialog',
  templateUrl: './reset-dialog.component.html',
  styleUrls: ['./reset-dialog.component.css']
})
export class ResetDialogComponent implements OnInit {
  lastNameInput : string = "";
  emailInput : string = "";
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  resetPwd(){
   // let resetBody = {lastName:"2",email:"abc"}
    let resetBody = {lastName:this.lastNameInput,email:this.emailInput}
    let resetBodyString = JSON.stringify(resetBody)
    this.http.post("http://localhost:8080/reset/", resetBodyString, {responseType: 'text'}).subscribe(r => console.log(r))
  }

  // TESTING PURPOSE, REMOVE THIS
  async TestMETHOD() {
    let taskString = JSON.stringify({
      "userId":"1",
      "listId":"MyDay",
      "team":"blue",
      "deadline":"11-11-2022",
      "body":{
        "topic":"new topic",
        "priority":"new priority",
        "description":"new description text"
      }

    })
    this.http.post("http://localhost:8080/task/", taskString,{responseType: 'text'}).subscribe(r => console.log(r))
  }

}
