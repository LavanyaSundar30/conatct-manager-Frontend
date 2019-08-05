import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { StorageService } from '../storage.service';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public username = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);
  hide = true;
  constructor(
    private request: RequestService,
    private storage: StorageService,
    private router: Router,
    private auth: AuthService
    ) {}

    ngOnInit() {
      if (!this.auth.isValidUser(true)) {
        return;
      }
    }

  login() {
    const body = {
      username: this.username.value,
      password: this.password.value
    };

    this.request.login(body).subscribe((response: any) => {
      if (!response) {
        console.log('something went wrong');
        return ;
      }

      if (response.status === 'error') {
        console.log('error', response.msg);
        this.storage.clear();
        return;
      }

      this.storage.set(response.data);
      this.router.navigate(['home']);
    });

  }

}
