import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StaticListService {

  constructor(private http: HttpClient) { }
  getMyDayTasks(userId: string){
    return this.http.get("http://localhost:8080/task/userId/"+userId);
  }
}

