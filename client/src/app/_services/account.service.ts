import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User } from '../_models/user';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.baseUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router, private toastr: ToastrService) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'api/account/login', model).pipe(
      map((response: User) => {
        const user = response;
        if (user) {
          this.setCurrentUser(user);
          this.router.navigate(['/home']);
          this.toastr.success('logged in');
        }
      })
    )
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'api/account/register', model);
  }

  setCurrentUser(user: User) {
    user.roles = [];
    const roles = this.getDecodedToken(user.token).role;
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);

    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    sessionStorage.removeItem('temp_user_id');
    sessionStorage.removeItem('temp_timesheetCard_id');
    sessionStorage.removeItem('temp_timesheetWeek_id');
    this.currentUserSource.next(null);
    this.router.navigate(['/']);
    this.toastr.info('logged out');
  }

  getDecodedToken(token) {
    return JSON.parse(atob(token.split('.')[1]));
  }

}
