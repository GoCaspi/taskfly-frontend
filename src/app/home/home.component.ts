import {Component, OnInit} from '@angular/core';
import {HomeserviceService} from "../homeservice.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private home: HomeserviceService) {
  }

  revenue =0;
  profit = 0;
  ngOnInit(): void {
    this.home.getHomeData().subscribe((data) =>{
      console.log(data);
      this.revenue = data.revenue;
      this.profit = data.profit;
    });
  }

}
