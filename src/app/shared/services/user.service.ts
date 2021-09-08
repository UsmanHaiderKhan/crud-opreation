import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {User} from "../model/user";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

const API_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private users: User[] = [];
  // private usersUpdated = new Subject<User[]>();
  constructor(private http: HttpClient) {

  }

  createUser(userDetails: any): Observable<any> {
    return this.http.post(`${API_URL}`, userDetails).pipe();
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${API_URL}`).pipe();
  }
getUserById(userId: any): Observable<any> {
  return this.http.get(`${API_URL}/${userId}`).pipe();
}
  deleteUserRecord(userId: any): Observable<any> {
    return this.http.delete(`${API_URL}/${userId}`).pipe();
  }
  updateUserRecord(userDetails: any, userId: any): Observable<any> {
    return this.http.put(`${API_URL}/${userId}`, userDetails).pipe();
  }


}
