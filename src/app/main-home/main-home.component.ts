import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css'],
})
export class MainHomeComponent implements OnInit {
  tvitmes = false;
  allitems = true;
  mobileitems = false;
  mobile: any;
  isLoging = false;
  onGetItem = false;
  isSignup = false;
  qrt: any = [];
  onList = false;
  image!: 'https://images.unsplash.com/photo-1567581935884-3349723552ca?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80';
  mobileStock: any;
  buttons: any = [];
  i: number | undefined;
  limit = 2;
  currentPage = 1;
  value: any;
  color: any;
  price: any;
  searchText: any;
  isSearching = false;
  isUserValid = false;
  showSearch = true;
  autheticated!: boolean;
  isShow = false;
  constructor(private service: ServiceService, public router: Router) {}

  ngOnInit(): void {
    this.autheticated = this.service.auth;
    console.log(this.autheticated);
  }

  onSignup(form: NgForm) {
    console.log(form.value);

    const authData = {
      name: form.value.name,
      email: form.value.email,
      mobile: form.value.mobile,
      password: form.value.password,
    };
    console.log(authData);

    this.service.signUp(authData).subscribe(
      (response) => {
        form.reset({});
        this.isSignup = false;
        this.autheticated = true;
        this.showSearch = true;
        this.isSearching = false;
        this.isShow = false;
        this.allitems = false;
        this.getMobileItems();
      },
      (error): void => {}
    );
  }

  onLogin(form: NgForm) {
    const loginData = {
      email: form.value.email,
      password: form.value.password,
    };
    console.log(loginData);
    this.service.login(loginData).subscribe((response) => {
      console.log(response.token);
      let token = response.token;
      this.isLoging = false;
      this.allitems = false;
      this.service.saveAuthManager(token);
      this.autheticated = true;
      this.showSearch = true;
      this.isSearching = false;
      this.isShow = false;
      this.getMobileItems();
    });
  }

  addToCart(id: any) {
    if (!this.autheticated) {
      this.showSearch = false;
      this.mobileitems = false;
      this.isSearching = false;
      this.allitems = false;
      this.isSignup = true;
      this.isShow = true;

      console.log('PLEASE REGISTER');
    }
    if (this.autheticated) {
      // let data = this.mobile.filter((el: any) => el.id === id);
      console.log(id);
      let createData = {
        productName: id.name,
        productId: id.productId,
        price: id.price,
      };
      this.service.addToCart(createData).subscribe(() => {});
      this.onList = true;
      this.qrt.push('');
      console.log(this.qrt);
    }
  }
  buyNow(id: any) {
    this.onGetItem = true;
    this.isLoging = true;
    this.allitems = false;
    this.mobileitems = false;
  }

  getMobileItems() {
    this.allitems = false;
    this.mobileitems = true;
    this.service.getMainProducts().subscribe((response) => {
      this.mobile = response.allProducts;
    });
  }

  goBack() {
    this.allitems = true;
    this.mobileitems = false;
    this.buttons = [];
  }
  onBuy() {
    this.showSearch = false;
    this.isSignup = true;
    this.onGetItem = false;
    this.isLoging = false;
    this.allitems = false;
    this.mobileitems = false;
  }
  onDirect() {
    this.isLoging = true;
    this.allitems = false;
    this.isSignup = false;
  }

  reDirect() {
    this.router.navigate(['add-cart']);
  }

  getMobiles() {
    this.service.getSock().subscribe((response) => {
      this.mobileStock = response.stock;
    });
  }

  getSearch(value: any) {
    console.log(value);

    this.isSearching = true;
    this.limit = 10;
    this.searchText = value;
    this.buttons = [];
    console.log(value);
    this.onGetSelected();
  }

  onGetButtonId(event: any) {
    this.buttons = [];
    this.currentPage = event;
    this.onGetSelected();
  }

  onSelected(value: any) {
    this.limit = 3;
    this.buttons = [];
    this.value = value;
    this.onGetSelected();
  }

  onColorSelected(color: any) {
    this.limit = 3;
    this.buttons = [];
    this.color = color;
    this.onGetSelected();
  }
  onamountSelected(price: any) {
    this.limit = 3;
    this.buttons = [];
    this.price = price;
    this.onGetSelected();
  }

  onGetSelected() {
    let page = {
      page: this.currentPage,
      limit: this.limit,
      brand: this.value,
      color: this.color,
      peice: this.price,
      search: this.searchText,
    };
    this.mobile = [];
    this.service.getMobileList(page).subscribe((response) => {
      this.allitems = false;
      this.mobileitems = true;
      this.mobile = response.allData;
      this.i = Math.ceil(response.count / this.limit);
      console.log(response.count);
      for (let i = 1; i <= this.i; i++) {
        this.buttons.push({
          id: i,
        });
      }
    });
  }
}
