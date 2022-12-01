import { Component } from '@angular/core';
import {AuthenticationService} from "./serives/authentication.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AuthenticationService]
})
export class AppComponent {
  opened=false;
constructor(public authService: AuthenticationService,private router:Router) {
}

}
