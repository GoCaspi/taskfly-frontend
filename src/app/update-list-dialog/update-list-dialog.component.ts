import {Component, OnInit, SkipSelf} from '@angular/core';
import {ListService} from "../serives/list.service";
import {BrowserStorageService} from "../storage.service";
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
  taskIdString:string;
}
@Component({
  selector: 'app-update-list-dialog',
  templateUrl: './update-list-dialog.component.html',
  styleUrls: ['./update-list-dialog.component.css']
})
export class UpdateListDialogComponent implements OnInit {
  listName : string =""
  listMembersString:string =""
  constructor(private listService:ListService ,@SkipSelf() private localStorageService: BrowserStorageService,) { }

  ngOnInit(): void {
    this.setInputFields()
  }

  setInputFields(){
    this.listName = this.localStorageService.get("inspectedListName")!
    this.listMembersString = this.localStorageService.get("inspectedListMembers")!
  }
  sendUpdate(){
    let membersArr = this.listMembersString.split(",")
    console.log("LISTMEMBERSIDSTRING : " ,membersArr)
    let update:List = {id:"",name:this.listName,members:membersArr,teamId:"",tasks:[],ownerID:this.localStorageService.get("inspectedListOwnerId")!}
    this.listService.updateListe(this.localStorageService.get("inspectedList")!,update).subscribe(response=>{
      console.log("RESPONSE FROM UPDATE LIST ", response)
    })
  }

}
