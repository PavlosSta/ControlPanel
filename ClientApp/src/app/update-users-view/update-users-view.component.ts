import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-update',
  templateUrl: './update-users-view.component.html'
})
export class UpdateComponent {
  public users: User[];

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<User[]>(baseUrl + 'api/users').subscribe(result => {
      this.users = result;
    }, error => console.error(error));
  }

  delete(http: HttpClient, @Inject('BASE_URL') baseUrl: string, Id: number) {
    const ans = confirm('Do you want to delete blog post with id: ' + 4);
    if (ans) {
      http.delete<User>(baseUrl + 'api/users/' + 4).subscribe((data) => {
        this.getEmployees();
      }, error => console.error(error))
    }  ;
    }
  }
}

interface User {
  Id: number;
  Firstname: string;
  lastName: string;
  mobilePhone: string;
  role: number;
}
