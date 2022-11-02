import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user: any;
  orderlist: any;
  cartData: any;
  nodata=false
  constructor(public service:ServiceService) { }

  ngOnInit(): void {
    this.getUserDetails()
  }

  getUserDetails(){
    this.service.getUserDetails().subscribe((response) => {
      console.log(response.userData);
      this.user = response.userData
    })
  }
   getData() {
    this.service.getOrders().subscribe((response) => {
      this.orderlist = response.orderData;
      console.log(this.orderlist);
      this.orderlist.length <= 0 ? this.nodata = true:''
    });
  }
}
