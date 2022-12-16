import {Component, OnInit, Self} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ResetDialogComponent} from "./reset-dialog/reset-dialog.component";
import {Overlay} from "@angular/cdk/overlay";
import {AuthenticationService} from "./serives/authentication.service";
import {BROWSER_STORAGE, BrowserStorageService} from "./storage.service";
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {ListService} from "./serives/list.service";
import {Buffer} from "buffer";
import {HomeComponent} from "./home/home.component";
import {BehaviorSubject} from "rxjs";


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
  providers:[MatDialog,ResetDialogComponent,Overlay, AuthenticationService, BrowserStorageService,
    { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})
export class AppComponent implements OnInit{
  title = 'TaskFly-frontend';
  loginStatus: boolean | undefined = false;
  opened = false;
  sideList : BehaviorSubject<[]>
  private dialogRef: MatDialogRef<ResetDialogComponent> | undefined;
  allLists:any=[];
  allStaticList:any =[];
  allDynamicLists:any=[];
  enabled:boolean=true;
  baseURL:string | undefined;


  constructor(public authService: AuthenticationService,
              public dialog: MatDialog,
              public rd: ResetDialogComponent,
              @Self() private sessionStorageService: BrowserStorageService,
              public router: Router,
              private http: HttpClient,
              public listService:ListService,
              ) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
    this.sideList = new BehaviorSubject([])
  }

  /**
   * here it is checked if the login status is true or false and sets the login status to the correct value accordingly
   */
  init(): void {
    setInterval(()=>{
      if(this.sessionStorageService.get("loginStatus") == "false"){
        this.loginStatus = false;
      }
      if(this.sessionStorageService.get("loginStatus") == "true"){
        this.loginStatus = true;
      }
    },1000)
  }
  ngOnInit() {
    this.init()
    this.getUIdOfCurrentUser()
    if (!(this.sessionStorageService.get("loggedInUserId") == undefined || this.sessionStorageService.get("loggedInUserId") == "")) {
      this.fetchAllListsOfUser()
      this.listService.renderCheckList.subscribe(statement => {
        console.log("RenderCheck from Service is ", statement)
        if (statement) {
          this.fetchAllListsOfUser()
        }
      })
    }
  }

openDialoge(){
    this.dialog.open(HomeComponent,{
      width:'500px',
      height:"350px",
      data:"right click"
    })
  }

  /**
   * the reset password dialog should only be displayed if the login status is true
   */
  openReset(){
  this.dialogRef = this.dialog.open(ResetDialogComponent)
  this.dialogRef.afterClosed().subscribe(() =>{
    console.log("dialog is closed!")
  })
  let status = this.sessionStorageService.get("loginStatus")
  if (status == "true") {
    this.loginStatus = true;
    console.log(this.loginStatus)
  }
}

  /**
   * throws an error if the user has no lists otherwise the lists for the user are displayed
   */
  fetchAllListsOfUser(){
  this.listService.getAllListsByUserId(this.sessionStorageService.get("loggedInUserId")!).subscribe({
    next: (listData) => this.test123(listData),
    error: () => this.errorMessage()
  })
}

  /**
   * here the lists are pushed to either the dynamic or static lists
   * @param listData
   */
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
  console.log("ListDData from service",listData)
}

  /**
   * This method calls only empty lists
   */
  errorMessage(){
  this.allDynamicLists = []
  this.allLists = []
}

  /**
   * here is first checked if a user is logged in or not if the user is logged in the method gets the logged in userid
   */
  getUIdOfCurrentUser(){
    let email= this.sessionStorageService.get("email")
  if(email == undefined || email == ""){
    console.log("No email identified")
    return
  }

  let cred =  "Basic " + Buffer.from(this.sessionStorageService.get("email") + ":" + this.sessionStorageService.get("password")).toString('base64')
  console.log("Identified email is :",email)
  console.log("Identified pwd is :",this.sessionStorageService.get("password"))


  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': cred
    })
  };
  this.http.get<User>( this.baseURL+"user/userInfo?email=" + email,httpOptions).subscribe(data=>{
    console.log(data.id);
    this.sessionStorageService.set("loggedInUserId",data.id);
    console.log(this.sessionStorageService.get("loggedInUserId"))
  })
//  this.listServicce.getAllListsByUserId(this.localStorageService.get("loggedInUserId")!).subscribe(listData =>{
//    console.log("ListDData from service",listData)
//  })
}

  /**
   * here the current list id listname and owner is stored and updated in the sessionstorage
   * @param listId
   * @param listName
   * @param ownerId
   */
  saveCurrentListId(listId:string, listName:string,ownerId:string){
  this.sessionStorageService.set("inspectedList",listId)
    this.sessionStorageService.set("inspectedListName",listName)
    this.sessionStorageService.set("inspectedListOwnerId",ownerId)

    this.listService.toggleRender()
    this.fetchAllListsOfUser()
  }

  /**
   * test method to fetch all list of user
   */
  test(){
    this.fetchAllListsOfUser()
  }

  /**
   * When the user logs out the status is set back to false and everything in sessionstorage is cleared
   */
  logout(){
    if(this.sessionStorageService.get("loginStatus") == "true"){
      this.sessionStorageService.set("loginStatus", "false");
    }
    window.sessionStorage.clear()
    window.sessionStorage.setItem("loginStatus", "false")
  }
}
