import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css'],
})
export class FileUploaderComponent implements OnInit {
  public file: any | File;
  constructor(private service: ServiceService) {}

  ngOnInit(): void {}
  onFileChanged(event: any) {
    this.file = event.target.files[0];
    console.log(this.file);
  }
  onSignup(form: NgForm) {
    if (form.invalid) {
      return;
    }
    const data = new FormData();
    data.append('producatList', this.file);

    const playerData = {
      name: form.value.name,
    };
    data.append('body', JSON.stringify(playerData));
    console.log(data);

    this.service.createProductList(data).subscribe(
      (response) => {
        // alert('Singup Successfull!');
      },
      (error): void => {}
    );
    form.reset({});
  }
}
