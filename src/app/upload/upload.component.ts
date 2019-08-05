
import { Component, OnInit } from '@angular/core';
import { FileUploader, FileSelectDirective } from 'ng2-file-upload/ng2-file-upload';

const URL = 'https://localhost:5000/upload/upload';
export class AppData {
  constructor(
      // tslint:disable-next-line: ban-types
      public name: String
  ) {}
}

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  public name = '';
  public uploader: FileUploader;
  title = 'ng8fileupload';
  data = new AppData('');


    constructor() {
      this.uploader =  new FileUploader({ url: URL, itemAlias: 'photo' });
    }

    ngOnInit() {

      this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
      this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
        console.log('ImageUpload:uploaded:', item, status, response);
      };
    }

    submit() {
      this.uploader.onBuildItemForm = (item, form) => {
        form.append('firstName', this.data.name);
      };
      this.uploader.uploadAll();
    }

  }
