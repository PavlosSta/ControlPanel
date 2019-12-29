import { Component, Inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../models/user';


@Component({
  selector: 'app-update',
  templateUrl: './users-list-view.component.html'
})
export class FetchDataComponent {
  public users: User[];
  users$: Observable<User[]>;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string, private userService: UserService) {
    http.get<User[]>(baseUrl + 'api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.users$ = this.userService.getUsers();
  }

  delete(Id) {
    const ans = confirm('Do you want to delete user with id: ' + Id);
    if (ans) {
      this.userService.deleteUser(Id).subscribe((data) => {
        location.reload();
      });
    }
  }
}
