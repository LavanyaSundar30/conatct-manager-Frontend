
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { RequestService } from '../request.service';
import { AuthService } from '../auth.service';
import { FileUploader } from 'ng2-file-upload';


const URL = 'http://localhost:5000/upload/upload';
@Component({
  selector: 'app-uploadimg',
  templateUrl: './uploadimg.component.html',
  styleUrls: ['./uploadimg.component.scss']
})
export class UploadimgComponent implements OnInit {
  constructor(private auth: AuthService,
              private request: RequestService,
              private router: Router) { }

    public uploader: FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});

  ngOnInit() {

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
         console.log('ImageUpload:uploaded:', item, status, response);
         alert('File uploaded successfully');
     };
  }
}
