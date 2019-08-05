import { Component, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../request.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ContactsComponent } from '../contacts/contacts.component';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss']
})
export class UpdateComponent  {

  public name;
  public phone;
  public email;
  public city;
  public picture;
  public edit = false;
  public nameValue: any;
  public phoneValue: any;
  public emailValue: any;
  public cityValue: any;
  public pictureValue: any;
  public IdValue: any;


  public response: any;

  public message: string;
  public DupMessage: string;


  constructor(
    private request: RequestService,
    private route: ActivatedRoute, private auth: AuthService, private router: Router, public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<ContactsComponent>) {
      // this.edit = params.edit;
        this.nameValue = data.name;
        this.phoneValue = data.phone;
        this.emailValue = data.email;
        this.cityValue = data.city;
        this.pictureValue = data.picture;
        this.IdValue = data._id;
        this.setForm();
    //   this.route.queryParams.subscribe((params: any) => {
    //     this.edit = params.edit;
    //     this.nameValue = params.name;
    //     this.phoneValue = params.phone;
    //     this.emailValue = params.email;
    //     this.cityValue = params.city;
    //     this.IdValue = params.id;
    //     this.setForm();
    // });

  }

  setForm() {
      this.name = new FormControl(this.nameValue, Validators.required);
      this.phone = new FormControl(this.phoneValue, Validators.required);
      this.email = new FormControl(this.emailValue, Validators.email);
      this.city = new FormControl(this.cityValue, Validators.required);
      this.picture = new FormControl(this.pictureValue, Validators.required);

  }
  public setMessage() {
    return this.message = 'Updated Successfully';
    }

    public setDupMessage() {
    return this.DupMessage = 'Contacts name already exist';
    }

  public updateContact() {
    const edata = {
      name: this.name.value,
      phone: this.phone.value,
      email: this.email.value,
      city: this.city.value,
      picture: this.city.picture
    };
    this.request.updateContact(this.IdValue, edata).subscribe(response => {

      if (response) {
        this.setMessage();

      }
      console.log(response);
      this.dialogRef.close();
      this.router.navigate(['contacts']);
    }, (err) => {
      console.log(err);
    });
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
        case 'picture':
          return this.picture.hasError('required') ? 'You must enter a value' : '';
    }
  }
}
