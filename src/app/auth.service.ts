import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storage: StorageService,
    private router: Router,
  ) { }

  isValidUser(redirectToHome = false) {
    if (!this.storage.get('token')) {
      this.router.navigate(['login']);
      return false;
    }

    return redirectToHome ? this.router.navigate(['login']) : true;
  }

  public logout() {
    this.storage.clear();
    this.router.navigate(['login']);
  }
}
