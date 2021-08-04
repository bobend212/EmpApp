import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppUser } from '../_models/appUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getUserList() {
    return this.http.get<AppUser[]>(this.baseUrl + 'api/users');
  }

  getUserByUsername(username: string) {
    return this.http.get<AppUser>(this.baseUrl + 'api/users/name/' + username);
  }

  updateLoggedUser(user: AppUser) {
    return this.http.put(this.baseUrl + 'api/users', user);
  }
}