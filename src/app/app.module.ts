import { BrowserModule, ɵBROWSER_SANITIZATION_PROVIDERS } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { RequestService } from './request.service';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule, MatIconModule} from '@angular/material';
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { UpdateComponent } from './update/update.component';
import { ContactsComponent } from './contacts/contacts.component';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import { RegisterComponent } from './register/register.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import {MatTableModule} from '@angular/material/table';
import {MatDividerModule} from '@angular/material/divider';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import { FileSelectDirective } from 'ng2-file-upload';
import { UploadimgComponent } from './uploadimg/uploadimg.component';
import { UploadComponent } from './upload/upload.component';
import * as moment from 'moment';
import 'hammerjs';
import { PrintComponent } from './print/print.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    FooterComponent,
    AddcontactComponent,
    UpdateComponent,
    ContactsComponent,
    RegisterComponent,
    FrontpageComponent,
    FileSelectDirective,
    UploadimgComponent,
    UploadComponent,
    PrintComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
     MatFormFieldModule,
     MatSelectModule,
     MatCheckboxModule,
     MatCardModule,
     MatInputModule,
     MatTableModule,
     MatDividerModule,
     MatDialogModule,
     MatIconModule,
     MatProgressBarModule,
     MatListModule

  ],
  entryComponents: [
UpdateComponent,
AddcontactComponent,

  ],
  providers: [
    RequestService,
    { provide: 'moment', useValue: moment }],
  bootstrap: [AppComponent]
})
export class AppModule { }
