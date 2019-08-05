import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ContactsComponent } from './contacts/contacts.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { FrontpageComponent } from './frontpage/frontpage.component';
import { RegisterComponent } from './register/register.component';

import { UpdateComponent } from './update/update.component';
import { AddcontactComponent } from './addcontact/addcontact.component';
import { UploadimgComponent } from './uploadimg/uploadimg.component';
import { UploadComponent } from './upload/upload.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'addcontact', component: AddcontactComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'header', component: HeaderComponent },
  { path: 'footer', component: FooterComponent },
  { path: '', component: FrontpageComponent },
  { path: 'update', component: UpdateComponent },
  { path: 'uploadimg', component: UploadimgComponent },
   { path: 'upload', component: UploadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
