import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  get(key: string) {
    const rawUserData = localStorage.getItem('userData');
    try {
      const userData = JSON.parse(rawUserData);
      return userData[key] ? userData[key] : null;
    } catch (error) {
      return 'home';
    }
  }

  set(userData) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  clear() {
    localStorage.removeItem('userData');
  }
}
