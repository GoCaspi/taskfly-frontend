import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";

interface isValidResponse{
  isValid: boolean | null

}
@Injectable({
  providedIn: 'root'
})
export class ResetConfirmationService {
  baseURL:string|undefined


  constructor(private http: HttpClient) {
    this.baseURL = process.env['NG_APP_PROD_URL'];
  }

  checkTokenValidity(resetToken: string | null): Observable<any>{
    return this.http.get<isValidResponse>(this.baseURL + "/reset/valid/" + resetToken)
  }

  submitNewPassword(password: string | null | undefined, resetToken: string | null): Observable<any>{
    const body = {
      pwd: password,
      token: resetToken
    }
    console.log(body)
    return this.http.post(this.baseURL + "/reset/setNew", body)
  }
}
