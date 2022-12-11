import {Component, OnInit, SkipSelf} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";
import {Overlay} from "@angular/cdk/overlay";
import {AuthenticationService} from "./serives/authentication.service";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ListService} from "./serives/list.service";
import {BrowserStorageService} from "./storage.service";
import {Buffer} from "buffer";

interface User{
  id:string;
}

interface List{
  id:string;
  name:string;
  teamId:string;
  ownerID:string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[MatDialog,ResetDialogComponent,Overlay, AuthenticationService]
})
export class AppComponent implements OnInit{
  title = 'TaskFly-frontend';
  opened=false;
  private dialogRef: MatDialogRef<ResetDialogComponent> | undefined;
  allLists:any;
  allStaticList:any =[];
  allDynamicLists:any=[];


constructor( public authService: AuthenticationService,public dialog:MatDialog, public rd:ResetDialogComponent,private http: HttpClient,public listService:ListService,@SkipSelf() private localStorageService: BrowserStorageService) {
}

openReset(){
  this.dialogRef = this.dialog.open(ResetDialogComponent)
  this.dialogRef.afterClosed().subscribe(() =>{
    console.log("dialog is closed!")
  })
}

fetchAllListsOfUser(){

  this.listService.getAllListsByUserId(this.localStorageService.get("loggedInUserId")!).subscribe(listData =>{
    this.allDynamicLists = []
    this.allLists = []
    this.allLists = listData;
    this.allLists.forEach((list: List) =>{
      if((list.name == "MyDay" || list.name == "Important" || list.name == "Geplant") && this.allStaticList.length < 2){
        this.allStaticList.push(list)
      }
      else if(!(list.name == "MyDay" || list.name == "Important" || list.name == "Geplant")){
        this.allDynamicLists.push(list)
      }
    })
    console.log("ListDData from service",listData)
  })

}

getUIdOfCurrentUser(){
    let email= this.localStorageService.get("email")
  if(email == undefined || email == ""){
    console.log("No email identified")
    return
  }

  let cred =  "Basic " + Buffer.from(this.localStorageService.get("email") + ":" + this.localStorageService.get("password")).toString('base64')
  console.log("Identified email is :",email)
  console.log("Identified pwd is :",this.localStorageService.get("password"))


  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': cred
    })
  };
  this.http.get<User>("http://localhost:8080/user/userInfo?email=" + email,httpOptions).subscribe(data=>{
    console.log(data.id);
    this.localStorageService.set("loggedInUserId",data.id);
    console.log(this.localStorageService.get("loggedInUserId"))
  })
//  this.listServicce.getAllListsByUserId(this.localStorageService.get("loggedInUserId")!).subscribe(listData =>{
//    console.log("ListDData from service",listData)
//  })
}

  async ngOnInit(){
    this.getUIdOfCurrentUser()
    if(!(this.localStorageService.get("loggedInUserId") == undefined || this.localStorageService.get("loggedInUserId") == "")){
    this.fetchAllListsOfUser()
    }


    this.listService.renderCheckList.subscribe(statement =>{
      console.log("RenderCheck from Service is ", statement)
      if(statement){
        this.fetchAllListsOfUser()
      }
    })
  }

  saveCurrentListId(listId:string, listName:string,ownerId:string){
  this.localStorageService.set("inspectedList",listId)
    this.localStorageService.set("inspectedListName",listName)
    this.localStorageService.set("inspectedListOwnerId",ownerId)

    this.listService.toggleRender()
  }

  test(){
this.localStorageService.clear()
  }



}
