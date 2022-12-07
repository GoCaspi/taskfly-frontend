import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.css']
})
export class UserSettingsComponent{

  Settings = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('',[Validators.email,Validators.required]),
    psw: new FormControl('',Validators.required),
    teamName: new FormControl('', Validators.required)
  })

  get name() {
    return this.Settings.get('name');
  }
  get psw() {
    return this.Settings.get('psw');
  }
  get email() {
    return this.Settings.get('email');
  }
}
