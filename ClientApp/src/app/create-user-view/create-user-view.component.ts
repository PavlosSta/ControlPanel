import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../services/user.service';
import { UserCreate } from '../models/userCreate';

@Component({
  selector: 'app-create',
  templateUrl: './create-user-view.component.html'
})


export class CreateComponent {
  userform: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    this.userform = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      mobilePhone: [''],
      role: [''],
    })
  }

  createUser() {

    let user: UserCreate = {
      FirstName: this.userform.controls.firstName.value,
      LastName: this.userform.controls.lastName.value,
      MobilePhone: this.userform.controls.mobilePhone.value,
      Role: +this.userform.controls.role.value,
    };

    console.log(user);

    this.userService.saveUser(user)
      .subscribe((data) => {
        this.router.navigate(['/users-list-view']);
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }

}
