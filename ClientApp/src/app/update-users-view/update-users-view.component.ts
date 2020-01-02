import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { User } from '../models/user';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-update',
  templateUrl: './update-users-view.component.html'
})
export class UpdateComponent {
  userform: FormGroup;
  user: User;
  userId: number;
  firstName: string;
  lastName: string;
  mobilePhone: string;
  role: number;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    if (this.avRoute.snapshot.params[idParam]) {
      this.userId = this.avRoute.snapshot.params[idParam];
    }

    this.userform = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      mobilePhone: [''],
      role: [''],
    })
  }

  ngOnInit() {

    this.userService.getUser(this.userId).subscribe(result => {
      this.firstName = Object.values(result)[1],
        this.lastName = Object.values(result)[2],
        this.mobilePhone = Object.values(result)[3],
        this.role = Object.values(result)[4]
    })
  }


  updateUser() {

    let user: User = {
      Id: +this.userId,
      FirstName: this.userform.controls.firstName.value,
      LastName: this.userform.controls.lastName.value,
      MobilePhone: this.userform.controls.mobilePhone.value,
      Role: +this.userform.controls.role.value,
    };

    if (user.FirstName == "") { user.FirstName = this.firstName }
    if (user.LastName == "") { user.LastName = this.lastName }
    if (user.MobilePhone == "") { user.MobilePhone = this.mobilePhone }
    if (user.Role == NaN) { user.Role = +this.role }
    
    this.userService.updateUser(this.userId, user)
      .subscribe((data) => {
        this.router.navigate(['/users-list-view']);
      });
  }
 
  cancel() {
    this.router.navigate(['/users-list-view/']);
  }

}
