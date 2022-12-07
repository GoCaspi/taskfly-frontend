import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  getTasksOfList(userId: string){
    return this.http.get("http://localhost:8080/task/userId/"+userId);
  }
  getAllListsByUserId(userId:string){
    return this.http.get("http://localhost:8080/tc/user/" + userId);
  }
}
