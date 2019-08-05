import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  public username: any;
  public password: any;

  constructor(private request: RequestService,  private router: Router) {
    this.createUserController();
  }

  createUserController() {
    this.username = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
  }

  register() {

    const newUser = {
      username: this.username.value,
      password: this.password.value,

    };

    this.request.addUser(newUser).subscribe(res => {
    console.log(res);
    }, (err) => {
      console.log(err);
    });

    console.log(newUser);
    this.router.navigate(['login']);
  }
  ngOnInit() {
  }

}
