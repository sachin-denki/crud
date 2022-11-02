import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  url = 'http://localhost:3000';
  public cartData: any = [];
  public auth = false;
  constructor(private http: HttpClient, private router: Router) {}

  getHeader(): HttpHeaders {
    let headers = new HttpHeaders({
      token: localStorage.getItem('token') || '',
    });
    return headers;
  }

  signUp(data: any) {
    return this.http.post<{ token: any }>(`${this.url}/signup`, data);
  }

  login(data: any) {
    return this.http.post<{ token: any }>(`${this.url}/login`, data);
  }

  addToCart(data: any) {
    return this.http.post<{ createdData: any }>(
      `${this.url}/add-to-cart`,
      data,
      { headers: this.getHeader() }
    );
  }

  removeCartItem(data: any) {
    return this.http.post<{ createdData: any }>(
      `${this.url}/remove-cart-item`,
      data,
      { headers: this.getHeader() }
    );
  }

  getCartItems() {
    return this.http.get<{ cartData: any; count: number; seerchData: any }>(
      `${this.url}/get-cart-items`,
      { headers: this.getHeader() }
    );
  }
  getAll() {
    return this.http.get<{ allData: any; count: number; seerchData: any }>(
      `${this.url}/get-cart-items`,
      { headers: this.getHeader() }
    );
  }
  getSock() {
    return this.http.get<{ stock: any }>(`${this.url}/get-stock-data`);
  }

  getMobileList(data: any) {
    console.log(data);
    return this.http.post<{
      allData: any;
      count: number;
    }>(`${this.url}/get-list-data`, data);
  }

  getOderData(data: any) {
    console.log(data);
    return this.http.post<{
      singleData: any;
    }>(`${this.url}/get-order-data`, data, {
      headers: this.getHeader(),
    });
  }

  updateData(id: any, data: any) {
    console.log('UPDATAED', data);
    return this.http.post(`${this.url}/update-single-data/${id}`, data);
  }

  deleteData(id: any) {
    return this.http.delete(`${this.url}/delete-data/${id}`);
  }

  getMainProducts() {
    return this.http.get<{ allProducts: any }>(`${this.url}/get-main-products`);
  }

  createProductList(data: any) {
    return this.http.post(`${this.url}/porduct-list`, data);
  }
  orderConfirm() {
    return this.http.get(`${this.url}/order-confirm`, {
      headers: this.getHeader(),
    });
  }
  getOrders() {
    return this.http.get<{ orderData: any }>(`${this.url}/get-orders`, {
      headers: this.getHeader(),
    });
  }
  saveAuthManager(token: string) {
    this.auth = true;
    localStorage.setItem('token', token);
  }
  clearAuthData() {
    this.auth = false;
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
