import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './users-list-view.component.html'
})
export class FetchDataComponent {
  public users: User[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<User[]>(baseUrl + 'api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }
}

interface User {
  Id: number;
  Firstname: string;
  lastName: string;
  mobilePhone: string;
  role: number;
}
