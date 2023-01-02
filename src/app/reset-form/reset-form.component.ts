import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-reset-form',
  templateUrl: './reset-form.component.html',
  styleUrls: ['./reset-form.component.css']
})
export class ResetFormComponent implements OnInit {

  public resetToken: string | null;
  constructor(private route: ActivatedRoute) {
    this.resetToken = null
  }

  ngOnInit(): void {
    this.resetToken = this.route.snapshot.paramMap.get('token');
  }



}
