import {Component, OnInit, Self, SkipSelf} from '@angular/core';
import {BROWSER_STORAGE, BrowserStorageService} from "../storage.service";
import {AddTaskService} from "../add-task.service";

@Component({

  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.css'],
  providers:[BrowserStorageService, { provide: BROWSER_STORAGE, useFactory: () => sessionStorage }]

})

export class AddTaskComponent implements OnInit{
  tasks : string ="" ;
  date : Date =new Date();
  event: string ="";
  message : string="";
  value: string =" ";
  hidden: boolean = false;


  onSubmit(): void{

  }

constructor(@Self() private sessionStorageService: BrowserStorageService,
            private Service:AddTaskService){
}

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

  task($event: any){
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

  formatDate(date:string) : string {
    let stringArray = date.split("");
    stringArray = stringArray.slice(0, stringArray.length-5);
    stringArray.forEach((letter,index) =>  {if (letter == "T"){stringArray[index]=" "}});
    let formatedDate = stringArray.join("");
    return formatedDate;
  }


}

