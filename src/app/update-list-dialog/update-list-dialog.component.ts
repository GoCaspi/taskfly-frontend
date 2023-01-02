import {Component, OnInit, Self} from '@angular/core';
import {ListService} from "../serives/list.service";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {MatDialog} from "@angular/material/dialog";
import {LocalService} from "../serives/local.service";
interface List{
  id:string;
  name:string;
  teamId:string;
  tasks:Task[]
  members:string[];
  ownerID:string;
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
  taskIdString:string;
}
@Component({
  selector: 'app-update-list-dialog',
  templateUrl: './update-list-dialog.component.html',
  styleUrls: ['./update-list-dialog.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]
})
export class UpdateListDialogComponent implements OnInit {
  listName : string =""
  listMembersString:string =""
  constructor(private listService:ListService ,private dialog:MatDialog,
              @Self() private sessisonStorageService: BrowserStorageService, public localService:LocalService) { }

  ngOnInit(): void {
    this.setInputFields()
  }

  setInputFields(){
  //  this.listName = this.sessisonStorageService.get("inspectedListName")!
  //  this.listMembersString = this.sessisonStorageService.get("inspectedListMembers")!
    this.listName = this.localService.getData("inspectedListName")
    this.listMembersString = this.localService.getData("inspectedListMembers")
  }
  sendUpdate(){
    let membersArr = this.listMembersString.split(",")
    console.log("LISTMEMBERSIDSTRING : " ,membersArr)
  //  let update:List = {id:"",name:this.listName,members:membersArr,teamId:"",tasks:[],ownerID:this.sessisonStorageService.get("inspectedListOwnerId")!}
  //  this.listService.updateListe(this.sessisonStorageService.get("inspectedList")!,update).subscribe(response=>{

      let update:List = {id:"",name:this.listName,members:membersArr,teamId:"",tasks:[],ownerID:this.localService.getData("inspectedListOwnerId")}
      this.listService.updateListe(this.localService.getData("inspectedList"),update).subscribe(response=>{
      console.log("RESPONSE FROM UPDATE LIST ", response)
      this.listService.toggleRender()
      this.listService.toggleRenderList()
      this.dialog.closeAll()
    })
  }

}
