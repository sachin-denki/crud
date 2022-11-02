import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css'],
})
export class AddCartComponent implements OnInit {
  cartData: any = [];
  price!: number;
  total = 0;
  isShow = true;
  order = false;
  isOrder = false;
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.getAllCartItems();
  }

  getAllCartItems() {
    this.service.getCartItems().subscribe((response) => {
      this.cartData = response.cartData;
      this.cartData.forEach(
        (el: { price: any }) => (this.total = el.price + this.total)
      );
    });
  }

  deleteFromCrat(value: any) {
    let deleteData = {
      productId: value,
    };
    console.log(value);
    
    this.service.removeCartItem(deleteData).subscribe(() => {
      this.total = 0;
      this.getAllCartItems();
    });
  }

  plusItem(id: any) {
    let createData = {
      productId: id,
    };
    this.service.addToCart(createData).subscribe((response) => {
      this.total = 0;
      console.log(response.quantity);
      this.service.headerClicked.next(response.quantity)
      this.getAllCartItems();
    });
  }

  placeOrder() {
    this.isShow = false;
    this.isOrder = true;
    this.cartData = '';
    this.total = 0;
    this.getAllCartItems();
  }

  confirmOrder() {
    this.service.orderConfirm().subscribe(() => {
      this.order = true;
      this.isShow = false;
      this.isOrder = false;
    });
  }
}
