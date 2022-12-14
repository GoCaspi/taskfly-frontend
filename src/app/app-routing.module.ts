import {NgModule} from "@angular/core";
import {RouterModule,Routes} from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {LandingComponent} from "./landing/landing.component";
import {LoginComponent} from "./login/login.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ImportantComponent} from "./important/important.component";
import {MydayComponent} from "./myday/myday.component";
import {TasksComponent} from "./tasks/tasks.component";
import {PlannedComponent} from "./planned/planned.component";
import {AssignedComponent} from "./assigned/assigned.component";
import {ListComponent} from "./list/list.component";

const routes: Routes =[
  {
    path:"",
    pathMatch:'full',
    component:LandingComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"important",
    component:ImportantComponent
  },
  {
    path:"myday",
    component:MydayComponent
  },
  {
    path:"assigned",
    component:AssignedComponent
  },
  {
    path:"planned",
    component:PlannedComponent
  },
  {
    path:"tasks",
    component:TasksComponent
  },

  {
    path:"sign-up",
    component:SignUpComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"list",
    component:ListComponent
  },
];
@NgModule({
  imports:[
    RouterModule.forRoot(routes)
  ],
  exports:[RouterModule]
})
 export class AppRoutingModule{}
