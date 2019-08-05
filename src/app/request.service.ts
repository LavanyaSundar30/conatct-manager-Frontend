import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})

export class RequestService {


  constructor(private http: HttpClient,
              private storage: StorageService) { }

// List Contacts
  public getUser() {
    return this.http.get('http://localhost:5000/contact');

  }
  // Add new Contact
  public addNewUser(newUser: { name; email; phone; city; }) {
    return this.http.post('http://localhost:5000/contact/add', newUser);
  }
//  Delete Contact
 public deleteContact(id) {
    return this.http.delete(`http://localhost:5000/contact/delete?id=` + id);
  }

//  Login
login(body) {
  return this.http.post('http://localhost:5000/admin/login', body);
}
// Registre
register(body) {
  return this.http.post('http://localhost:5000/admin/register', body);
}

// Add new User
public addUser(newUser: { username; password; }) {
  return this.http.post('http://localhost:5000/admin/register', newUser);
}

fetchContacts() {
  const headers = new HttpHeaders({
    Authorization: this.storage.get('token')
  });

  return this.http.get('http://localhost:5000/contact', {headers});
}

createContact(body) {
  const headers = new HttpHeaders({
    Authorization: this.storage.get('token')
  });

  return this.http.post('http://localhost:5000/contact/add', body, {headers});
}

updateContact(id, body) {
  const headers = new HttpHeaders({
    Authorization: this.storage.get('token')
  });

  return this.http.put('http://localhost:5000/contact/update?id=' + id, body, {headers});
}
}

