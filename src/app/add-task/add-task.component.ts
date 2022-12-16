import {Component, OnInit, Self} from '@angular/core';
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {AddTaskService} from "../add-task.service";

@Component({

  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})
/**
 * class of AddTaskComponent that implements OnInit
 */
export class AddTaskComponent implements OnInit{
  tasks : string ="" ;
  date : Date =new Date();
  event: string ="";
  message : string="";
  value: string =" ";
  hidden: boolean = false;


  /**
   *
   * @param sessionStorageService
   * @param Service
   */
  constructor(@Self() private sessionStorageService: BrowserStorageService,
            private Service:AddTaskService){
}

  /**
   * an if query is performed here if there are no tasks available it should be displayed and not otherwise
   */
  ngOnInit(): void {
    setInterval(( )=>{
      if(this.tasks == ""){
        this.hidden=false;
      }
      else {
        this.hidden = true;
      }
    },100)


  }

  /**
   * In the method the ID of the loggedin user is stored in a variable just like the list iD
   * Then the service is passed the id, the darum and the listid to create a task. if not the textfield for task is filled an error is thrown
   *
   * @param _$event
   */
  task(_$event: any){
    let id = this.sessionStorageService.get("loggedInUserId");
    console.log("von der test methode",this.tasks);
    console.log("Date von dateinput", this.date);
    let formatDate = this.formatDate(this.date.toISOString());
    let listId= this.sessionStorageService.get("inspectedList")!;

    if(this.tasks == '')
    {
      this.message="Das Textfeld ist Leer!";
    }
    else {
    this.Service.createTask(this.tasks,id,formatDate, listId).subscribe(data => {console.log(data)});
    this.tasks = this.value;

    }

  }

  /**
   * Here the format of the date is adapted as it is stored in MongoDB
   * @param date
   */
  formatDate(date:string) : string {
    let stringArray = date.split("");
    stringArray = stringArray.slice(0, stringArray.length-5);
    stringArray.forEach((letter,index) =>  {if (letter == "T"){stringArray[index]=" "}});

    return stringArray.join("");
  }


}

