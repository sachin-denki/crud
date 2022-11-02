import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css'],
})
export class AddCartComponent implements OnInit {
  mobile: any = [];
  price!: number;
  total = 0;
  grandTotal: any;
  qty = 1;
  sum: any = [];
  isShow = true;
  gst!: number;
  order = false;
  isOrder = false;
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.mobile = this.service.cartData;
    this.finTotal();
  }

  finTotal() {
    // this.total = this.mobile?.map((el: { price: any }) => el.price);
    this.service.getCartItems().subscribe((response) => {
      this.mobile = response.cartData;
      // console.log(this.mobile[0].price);
      this.mobile.forEach(
        (el: { price: any }) => (this.total = el.price + this.total)
      );
      // this.total = this.sum.reduce(
      //   (partialSum: any, a: any) => partialSum + a,
      //   0
      // );
    });
    // this.grandTotal =
    //   this.mobile.length <= 0
    //     ? 0
    //     : this.total?.reduce(
    //         (accumulator: any, currentValue: any) => accumulator + currentValue
    //       );
    // console.log(this.mobile);
  }

  deleteFromCrat(value: any) {
    console.log(value.productId);
    // this.mobile = this.mobile.filter((item: any) => item.id !== value.id);
    // this.finTotal();
    let createData = {
      productId: value.productId,
    };
    this.service.removeCartItem(createData).subscribe(() => {
      this.total = 0;
      this.finTotal();
    });
  }

  plusItem(value: any) {
    console.log(value.productId);

    let createData = {
      productId: value.productId,
    };
    this.service.addToCart(createData).subscribe(() => {
      this.total = 0;
      this.finTotal();
    });
  }

  placeOrder() {
    this.gst = 500;
    this.isShow = false;
    this.isOrder = true;
    this.mobile = '';
    this.total = 0;
    this.finTotal();
  }

  confirmOrder() {
    this.service.orderConfirm().subscribe(() => {
      this.order = true;
      this.isShow = false;
      this.isOrder = false;
      
    });
  }
}
