import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


const baseUrl = 'http://localhost:9001/login/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '**' })
};


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  login(user): Observable<any> {
    // console.log("before" + this.isUserLoggedIn())
    return this.httpClient.post(baseUrl, user, httpOptions);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("authenticatedUser")
    return !(user === null)
  }

  // signup(user) {
  //   return this.httpClient.post(`${baseUrl}signup`, user,httpOptions);
  // }

}
