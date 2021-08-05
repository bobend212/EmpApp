import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AppUser } from '../_models/appUser';
import { PaginatedResult } from '../_models/pagination';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseUrl = environment.baseUrl;
  paginatedResult: PaginatedResult<AppUser[]> = new PaginatedResult<AppUser[]>();

  constructor(private http: HttpClient) { }

  getUserList(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();

    if (page !== null && itemsPerPage !== null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());
    }

    return this.http.get<AppUser[]>(this.baseUrl + 'api/users', { observe: 'response', params }).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return this.paginatedResult;
      })
    );
  }

  getUserByUsername(username: string) {
    return this.http.get<AppUser>(this.baseUrl + 'api/users/name/' + username);
  }

  updateLoggedUser(user: AppUser) {
    return this.http.put(this.baseUrl + 'api/users', user);
  }
}