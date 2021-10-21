import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppUser } from '../_models/appUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.baseUrl;
  private userId;

  set userToSet(userId) {
    this.userId = userId;
  }

  get userToGet() {
    return this.userId;
  }

  constructor(private http: HttpClient) { }

  getUserList() {
    return this.http.get<AppUser[]>(this.baseUrl + 'api/users');
  }

  updateLoggedUser(user: AppUser) {
    return this.http.put(this.baseUrl + 'api/users', user);
  }

  getUserByUsername(username: string) {
    return this.http.get<AppUser>(this.baseUrl + 'api/users/name/' + username);
  }

  getUserById(userId) {
    return this.http.get<any>(this.baseUrl + 'api/users/' + userId);
  }

}