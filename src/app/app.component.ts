import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";
import {ResetFormComponent} from "./reset-form/reset-form.component";
import {Overlay} from "@angular/cdk/overlay";
import {AuthenticationService} from "./serives/authentication.service";
import {BROWSER_STORAGE, BrowserStorageService} from "./storage.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ListService} from "./serives/list.service";
import {Buffer} from "buffer";
import {HomeComponent} from "./home/home.component";
import {BehaviorSubject} from "rxjs";
import {LocalService} from "./serives/local.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";


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
  providers:[MatDialog,ResetDialogComponent,ResetFormComponent,Overlay, AuthenticationService, BrowserStorageService,
    { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})
export class AppComponent implements OnInit{
  title = 'TaskFly-frontend';
  loginStatus: boolean | undefined = false;
  opened = false;
  sideList : BehaviorSubject<[]>
  email: string = ""
  private dialogRef: MatDialogRef<ResetDialogComponent> | undefined;
  private homeDialogRef: MatDialogRef<HomeComponent> | undefined;
  allLists:any=[];
  allStaticList:any =[];
  allDynamicLists:any=[];
  enabled:boolean=true;
  baseURL:string | undefined;



  constructor(public authService: AuthenticationService,
              public dialog: MatDialog,
              public rd: ResetDialogComponent,
              public router: Router,
              private http: HttpClient,
              public listService:ListService,
              public store:LocalService
              ) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
    this.sideList = new BehaviorSubject([])
  }
  Settings = new FormGroup({
    email: new FormControl(this.store.getData("email"),[Validators.email,Validators.required]),
  })
  get emaill() {
    return this.Settings.get('email');
  }

  init(): void {
    setInterval(()=>{
        if(this.store.getData("loginStatus") == "false"){
        this.loginStatus = false;
      }
        if(this.store.getData("loginStatus") == "true"){
        this.loginStatus = true;
      }
    },1000)
  }
  ngOnInit() {
    this.init()
    this.getUIdOfCurrentUser()
      if (!(this.store.getData("loggedInUserId") == undefined || this.store.getData("loggedInUserId") == "")) {
      this.fetchAllListsOfUser()
      this.listService.renderCheckList.subscribe(statement => {
        if (statement) {
          this.fetchAllListsOfUser()
        }
      });
    }
  }

openDialoge(){
  this.homeDialogRef=  this.dialog.open(HomeComponent,{
      width:'500px',
      height:"350px",
      data:"right click"
    })
  this.homeDialogRef.afterClosed().subscribe(()=>{
    this.fetchAllListsOfUser()
  })
  }
openReset(){
  this.dialogRef = this.dialog.open(ResetDialogComponent)
  this.dialogRef.afterClosed().subscribe(() =>{
    console.log("")
  })
  let status = this.store.getData("loginStatus")
  if (status == "true") {
    this.loginStatus = true;
  }
}

fetchAllListsOfUser(){
    this.listService.getAllListsByUserId(this.store.getData("loggedInUserId")).subscribe({
    next: (listData) => this.test123(listData),
    error: () => this.errorMessage()
  })
}
test123(listData: List[]){
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
}
errorMessage(){
  this.allDynamicLists = []
  this.allLists = []
}
getUIdOfCurrentUser(){

  let email= this.store.getData("email")
  if(email == undefined || email == ""){
    return
  }

  let cred =  "Basic " + Buffer.from(this.store.getData("email") + ":" + this.store.getData("password")).toString('base64')

  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': cred
    })
  };
  this.http.get<User>( this.baseURL+"/user/userInfo?email=" + email,httpOptions).subscribe(data=>{
    this.store.saveData("loggedInUserId",data.id)
  })

}

  saveCurrentListId(listId:string, listName:string,ownerId:string){
    this.store.saveData("inspectedList",listId)
    this.store.saveData("inspectedListName",listName)
    this.store.saveData("inspectedListOwnerId",ownerId)

    this.listService.toggleRender()
    this.fetchAllListsOfUser()
  }

  logout(){
    if(this.store.getData("loginStatus") == "true"){
      this.store.saveData("loginStatus", "false");
    }
    window.sessionStorage.clear()
    window.sessionStorage.setItem("loginStatus", "false")

    this.store.clearData()
    this.store.saveData("loginStatus","false")
  }

  detectStaticList(){
    let checkName = this.store.getData("inspectedListName")
    let checkId = this.store.getData("loggedInUserId")
    return (checkName == "MyDay" || checkName == "Important"  || checkName == "Geplant") && checkId == this.store.getData("inspectedListOwnerId");
  }
}
