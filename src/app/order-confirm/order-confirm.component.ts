import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-order-confirm',
  templateUrl: './order-confirm.component.html',
  styleUrls: ['./order-confirm.component.css'],
})
export class OrderConfirmComponent implements OnInit {
  orderlist: any;
  cartItems: any;
  cartData: any;
  isAdmin:any=false
  allUserDetails: any;
  constructor(private service: ServiceService, public router: Router) {}

  ngOnInit(): void {
    this.getData();
  }

  getData() {
    this.service.getOrders().subscribe((response) => {
      console.log(response.allData);
      this.allUserDetails = response.allData
      this.orderlist = response.orderData;
      this.cartData = response.cartData
    });
  }

  getDetails(id:any) {
    this.getData();
    this.cartItems = this.cartData.filter((el: any) => el.orderId === id)
  }
}
