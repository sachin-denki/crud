import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { MainHomeComponent } from './main-home/main-home.component'; 
import { AddCartComponent } from './add-cart/add-cart.component'; 
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  url = 'http://localhost:3000';
  public cartData: any = [];
  public auth = false;
  public userData: any;
  headerClicked = new Subject<MainHomeComponent>();
  plusClicked = new Subject<AddCartComponent>();
  constructor(private http: HttpClient, private router: Router) {}

  getHeader(): HttpHeaders { let headers = new HttpHeaders({ token: localStorage.getItem('token') || '',}); return headers;}

  createProductList(data: any){ return this.http.post(`${this.url}/porduct-list`, data) }

  signUp(data: any){ return this.http.post<{ token: any }>(`${this.url}/signup`, data) }

  login(data: any) { return this.http.post<{ token: any; user:any;isAdmin:any }>(`${this.url}/login`, data) }

  getUserDetails(){ return this.http.get<{ userData: any; }>(`${this.url}/user-details`,{ headers: this.getHeader() }) }

  getItemsList(data: any) { return this.http.post<{allData: any;count: number;}>(`${this.url}/get-list-data`, data);}
  
  addToCart(data: any) {return this.http.post<{ quantity: any }>( `${this.url}/add-to-cart`,data,{ headers: this.getHeader() }) }

  getCartItems() { return this.http.get<{ cartData: any; count: number; seerchData: any }>(`${this.url}/get-cart-items`,{ headers: this.getHeader() });}
  
  removeCartItem(data: any) { return this.http.post<{ createdData: any }>(`${this.url}/remove-cart-item`,data,{ headers: this.getHeader() }) }

  orderConfirm() { return this.http.get(`${this.url}/order-confirm`, { headers: this.getHeader(), });}
 
  getOrders() { return this.http.get<{ admin(admin: any): unknown; orderData: any; cartData:any ;users:any;allData:any;usersList:any;totalOrders:any}>(`${this.url}/get-orders`,{ headers: this.getHeader(), }); }

  adminApi(data:any) { return this.http.post<{responseData:any;alldata:any}>(`${this.url}/admin-dashboard`,data , { headers: this.getHeader() }); }
  
  saveAuthManager(token: string) {
    this.auth = true; 
    localStorage.setItem('token', token)
  }
  
  clearAuthData() {
    this.auth = false;localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}
