import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { RequestService } from '../request.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { UpdateComponent } from '../update/update.component';
import { AddcontactComponent } from '../addcontact/addcontact.component';
import * as moment from 'moment';
import { MatSnackBar } from '@angular/material';
import { Angular5Csv } from 'angular5-csv/dist/Angular5-csv';
// declare let jsPDF;

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone: number;
  city: string;
  favorite: string;
}
@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
    private users: any;
    public showAdd = false;
    contacts: Contact[] = [];
    constructor( private auth: AuthService,
                 private request: RequestService,
                 private router: Router,
                 public dialog: MatDialog) {
                  if (!this.auth.isValidUser()) {
                    return;
                  }

                  this.fetchContacts();
                 }

    ngOnInit() {
      this.request.getUser().subscribe((response) => {
        this.users = response;
        console.log(this.users);
      }, (error) => {
        console.log(error);
      });
    }
    // Delete Button function
    deleteContact(id: any) {
      this.request.deleteContact(id).subscribe(res => {
        // console.log(id);
        console.log('Deleted');
        this.viewContact();
      });
    }
// EDit button function
    openEditDilaog(user) {
      const dialogRef  =  this.dialog.open(UpdateComponent, {
        width: '400px',
        data: user
      });
      dialogRef.afterClosed().subscribe(result => {
        this.viewContact();
        console.log('The dialog was closed');

      });
    }
    // Create button function
    onCreate() {
      const dialogRef = this.dialog.open(AddcontactComponent, {

      });
      dialogRef.afterClosed().subscribe(result => {
        this.viewContact();
        console.log('The dialog was closed');
      });
    }
    // To view contact page after update or delete or create
    viewContact() {
      this.request.getUser().subscribe((response) => {
        this.users = response;
        console.log(this.users);
    });
    }
    private fetchContacts() {
      this.request.fetchContacts().subscribe((result: any) => {
        this.contacts = result.response;
      });
    }
    exportCSV() {
      console.log(this.contacts);

      const  options = {
          fieldSeparator: ',',
          quoteStrings: '"',
          decimalseparator: '.',
          showLabels: true,
          showTitle: true,
          title: 'Contacts',
          useBom: true,
          noDownload: false,
          headers: [
            'favorite',
            'name',
            'email',
            'phone',
            'city',
            'fileLocation'
          ],
      };

      const exportData: any = this.contacts.map(a => ({...a}));

      exportData.map((value: any, key) => {
        delete exportData[key]._id;
        delete exportData[key].userId;
        delete exportData[key].__v;
      });
      console.log(this.contacts);
      const exportResult = new Angular5Csv(exportData, 'Contacts' + moment().unix() + '.xls' , options);
    }
  // exportPDF() {
  //   const columns = [
  //     {title: 'Favorite', dataKey: 'favorite'},
  //     {title: 'Name', dataKey: 'name'},
  //     {title: 'EmailID', dataKey: 'email'},
  //     {title: 'Phone.No.', dataKey: 'phone'},
  //     {title: 'City', dataKey: 'city'}
  //   ];
  //   const exportData: any = this.contacts.map(a => ({...a}));

  //   exportData.map((value: any, key) => {
  //     delete exportData[key]._id;
  //     delete exportData[key].userId;
  //     delete exportData[key].__v;
  //   });

  //   const doc = new jsPDF('p', 'pt');
  //   doc.autoTable(columns, exportData, {
  //     cellPadding: 10, // a number, array or object (see margin below)
  //       fontSize: 7,
  //       font: 'helvetica', // helvetica, times, courier
  //       lineColor: 200,
  //       lineWidth: 0,
  //       fontStyle: 'normal', // normal, bold, italic, bolditalic
  //       overflow: 'ellipsize', // visible, hidden, ellipsize or linebreak
  //       fillColor: false, // false for transparent or a color as described below
  //       textColor: 20,
  //       halign: 'left', // left, center, right
  //       valign: 'middle', // top, middle, bottom
  //       columnWidth: 0 // 'auto', 'wrap' or a number
  //   });

  //   doc.save('Contacts' + moment().unix() + '.pdf');
  // }


  }
