import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { RequestService } from '../request.service';
import { AuthService } from '../auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ContactsComponent } from '../contacts/contacts.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploader } from 'ng2-file-upload';
import { MAT_DIALOG_DATA } from '@angular/material';
import { StorageService } from '../storage.service';

const URL = 'http://localhost:5000/upload/upload';
@Component({
  selector: 'app-addcontact',
  templateUrl: './addcontact.component.html',
  styleUrls: ['./addcontact.component.scss']
})
export class AddcontactComponent implements OnInit {
  isFileSelected;
  message: any;
  constructor(
    private request: RequestService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<ContactsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private storage: StorageService,
    private router: Router) {
    this.createFormController();

  }

  public name: any;
  public email: any;
  public city: any;
  public phone: any;
  public getfileLoc: any;
  public response: any;
  private users: any;
  public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  createFormController() {
    this.name = new FormControl('', Validators.required);
    this.email = new FormControl('', Validators.email);
    this.phone = new FormControl('', Validators.maxLength(10));
    this.city = new FormControl('', [Validators.minLength(4), Validators.maxLength(6)]);

  }

  public setMessage(message) {
    return this.message = message;
  }

  submit() {
this.uploader.uploadAll();
  }
  addcontact() {

    const newUserInfo = {
      name: this.name.value,
      email: this.email.value,
      phone: this.phone.value,
      city: this.city.value,
      fileLocation: this.getfileLoc,
    };


    this.request.addNewUser(newUserInfo).subscribe(res => {
  console.log(res);
  this.dialogRef.close();

  }, (err) => {
    console.log(err);
  });

    console.log(newUserInfo);
}

ngOnInit() {
this.auth.isValidUser();

this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         const resPath = JSON.parse(response);
         this.getfileLoc = resPath.result;
         alert('File uploaded successfully');
     };
  }

getErrorMessage(input: string) {
  switch (input) {
    case 'name':
      return this.name.hasError('required') ? 'You must enter a value' : '';
    case 'email':
      return this.email.hasError('required') ? 'You must enter a email' : this.email.hasError('email') ? 'Not a valid email' : '';
    case 'phone':
      return this.phone.hasError('required') ? 'You must enter a value' : '';
    case 'city':
      return this.city.hasError('required') ? 'You must enter a value' : '';

  }
}
}




