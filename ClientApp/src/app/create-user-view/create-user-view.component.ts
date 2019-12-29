import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../models/user';


@Component({
  selector: 'app-create',
  templateUrl: './create-user-view.component.html'
})
export class CreateComponent {
  public users: User[];

  firstName;
  lastName;
  mobilePhone;
  role;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<User[]>(baseUrl + 'api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }
}
