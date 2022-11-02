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
  allUserDetails: any;
  isAdmin: ((admin: any) => unknown) | undefined;
  orderlist: any;
  cartData: any;
  users: any;
  totalOrders: any;
  data:any
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.data =   {
    labels: ['VueJs', 'EmberJs', 'ReactJs', 'Angular'],
    datasets: [{
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10]
    }]
    
  }
this.getData()
}

  getData() {
    this.service.getOrders().subscribe((response) => {
      console.log(response.allData);
      this.allUserDetails = response.allData
      this.isAdmin = response.admin
      this.users = response.usersList
      console.log(this.users);
      
      this.totalOrders = response.totalOrders
    });
  }



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
