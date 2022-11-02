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
  data: any;
  orderdAt: any;
  total: any;
  single: any;
  constructor(private service: ServiceService, public router: Router) {}

  ngOnInit(): void {
    this.getData();
  }
  getData() {
    this.service.getOrders().subscribe((response) => {
      this.orderlist = response.orderData;
      console.log(this.orderlist);
    });
  }
  getDetails(id: any) {
    console.log(id);
    let data = {
      orderId: id,
    };
    this.service.getOderData(data).subscribe((response) => {
      console.log(response.singleData);
      this.single = response.singleData;
    });
  }
}
