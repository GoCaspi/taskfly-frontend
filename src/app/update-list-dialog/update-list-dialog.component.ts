import {Component, OnInit, Self} from '@angular/core';
import {ListService, List} from "../serives/list.service";
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {MatDialog} from "@angular/material/dialog";
import {HotToastService} from "@ngneat/hot-toast";
import {LocalService} from "../serives/local.service";

@Component({
  selector: 'app-update-list-dialog',
  templateUrl: './update-list-dialog.component.html',
  styleUrls: ['./update-list-dialog.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]
})
export class UpdateListDialogComponent implements OnInit {
  listName : string =""
  listMembersString:string =""
  constructor(private listService:ListService ,private dialog:MatDialog, private toast: HotToastService, public localService:LocalService,
              @Self() private sessisonStorageService: BrowserStorageService) { }

  ngOnInit(): void {
    this.setInputFields()
  }

  setInputFields(){
    this.listName = this.localService.getData("inspectedListName")
    this.listMembersString = this.localService.getData("inspectedListMembers")
  }
  sendUpdate(){
    let membersArr = this.listMembersString.split(",")
    let update: List = {
      id: "",
      name: this.listName,
      members: membersArr,
      teamId: "",
      tasks: [],
      ownerID: this.localService.getData("inspectedListOwnerId")!
    }
    if (this.listName == "") {
    this.toast.error("Please enter a new Topic")
    } else {
      this.listService.updateListe(this.localService.getData("inspectedList")!, update).pipe(
        this.toast.observe({
          success: "Topic has been Update",
          loading: 'Logging in...',
          error: "text field is empty"
        })
      ).subscribe(response => {
        this.listService.toggleRender()
        this.listService.toggleRenderList()
        this.dialog.closeAll()
      })
    }
  }

}
