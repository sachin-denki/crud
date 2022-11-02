import { Component, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.css'],
})
export class MainHomeComponent implements OnInit {
  public file: any | File;
  @Output() qrt: any = [];
  tvitmes = false;
  allitems = true;
  mobileitems = false;
  getData: any;
  isLoging = false;
  onGetItem = false;
  isSignup = false;
  onList = false;
  mobileStock: any;
  buttons: any = [];
  buttonsNumber!: number;
  limit = 10;
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
  showDrop!: boolean;
  constructor(private service: ServiceService, public router: Router) {}

  ngOnInit(): void {
    this.autheticated = this.service.auth;
    console.log(this.autheticated);
  }

  onFileChanged(event: any) {
    this.file = event.target.files[0];
  }

  onSignup(form: NgForm) {
    const data = new FormData();
    data.append('image', this.file)
    const authData = {
      name: form.value.name,
      email: form.value.email,
      mobile: form.value.mobile,
      password: form.value.password,
    };
     data.append("body", JSON.stringify(authData));
    this.service.signUp(data).subscribe(
      (response) => {
        form.reset({});
        let token = response.token;
        this.service.saveAuthManager(token);
        this.isSignup = false;
        this.autheticated = true;
        this.showSearch = true;
        this.isSearching = false;
        this.isShow = false;
        this.allitems = false;
        this.getItemsList();
        this.showDrop = true
      },
      (error): void => {}
    );
  }

  onLogin(form: NgForm) {
    const loginData = {
      email: form.value.email,
      password: form.value.password,
    };
    this.service.login(loginData).subscribe((response) => {
      if(response.isAdmin){
         this.router.navigate(['admin']);
      }
      let token = response.token;
      this.service.userData = response.user
      this.isLoging = false;
      this.allitems = false;
      this.service.saveAuthManager(token);
      this.autheticated = true;
      this.showSearch = true;
      this.isSearching = false;
      this.isShow = false;
      this.showDrop = true
      this.getItemsList();
    },
    (error): void => {});
  }

  addToCart(id: any) {
    console.log(id);
    
    if (!this.autheticated) {
      this.showSearch = false;
      this.mobileitems = false;
      this.isSearching = false;
      this.allitems = false;
      this.isSignup = true;
      this.isShow = true;
    }
    if (this.autheticated) {
      let createData = {
        productName: id.name,
        productId: id.productId,
        price: id.price,
      };
      this.service.addToCart(createData).subscribe((response) => {
        console.log(response.quantity);
        this.service.headerClicked.next(response.quantity)
        this.onList = true;
      });
      
    }
  }

  buyNow() {
    this.onGetItem = true;
    this.isLoging = true;
    this.allitems = false;
    this.mobileitems = false;
  }

  goBack() {
    this.allitems = true;
    this.mobileitems = false;
    this.isSearching = false;
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

  getSearch(value: any) {
    this.searchText = value;
    this.getItemsList();
    console.log(this.searchText);
  }

  onGetButtonId(event: any) {
    this.buttons = [];
    this.currentPage = event;
    this.getItemsList();
  }

  onSelected(value: any) {
    this.limit = 3;
    this.value = value;
    this.getItemsList();
  }

  onColorSelected(color: any) {
    this.limit = 3;
    this.color = color;
    this.getItemsList();
  }

  onAmountSelected(price: any) {
    this.limit = 3;
    this.price = price;
    this.getItemsList();
  }

  getTvItems() {
    this.searchText = 'tv';
    this.getItemsList();
  }

  getMobileItems() {
    this.searchText = 'mobile';
    this.getItemsList();
  }

  getItemsList() {
    this.isSearching = true;
    let page = {
      page: this.currentPage,
      limit: this.limit,
      brand: this.value,
      color: this.color,
      price: this.price,
      search: this.searchText,
    };

    this.service.getItemsList(page).subscribe((response) => {
      this.searchText= null
      this.getData = [];
      this.buttons = [];
      this.allitems = false;
      this.mobileitems = true;
      this.getData = response.allData;
      this.buttonsNumber = Math.ceil(response.count / this.limit);
      for (let i = 1; i <= this.buttonsNumber; i++) {
        this.buttons.push({id: i})
      }
    });
  }
}
