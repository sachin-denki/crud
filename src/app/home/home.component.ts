import { formatCurrency } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  p: any;
  items: any;
  currentPage = 1;
  selectedTeam = '';
  buttons: any = [];
  i!: number;
  limit=3
  searchText!: string;
  presentPage: any;
  data: any;
  editMode = false;
  formdata: any;
  id: any;
  searchMode = false;
  sort: any;

  constructor(private service: ServiceService) {}

  ngOnInit(): void {
  }
// APIs
  // getProducatList() { return this.http.get<{ allProducts: any }>(`${this.url}/get-main-products`); }
  // getOderData(data: any) { return this.http.post<{singleData: any;}>(`${this.url}/get-single-order-data`, data, {headers: this.getHeader(),});}
  // getSock() {return this.http.get<{ stock: any }>(`${this.url}/get-stock-data`);}
  // deleteData(id: any) { return this.http.delete(`${this.url}/delete-data/${id}`) }
  // getAll() { return this.http.get<{ allData: any; count: number; seerchData: any }>(`${this.url}/get-cart-items`,{ headers: this.getHeader() });}
  // updateData(id: any, data: any) { return this.http.post(`${this.url}/update-single-data/${id}`, data);}
  // getSearch(value: any) {
  //   this.searchText = value;
  //   this.getAllData();
  //   this.searchMode = true;
  // }

  // onGetButtonId(event: any) {
  //   this.currentPage = event;
  //   this.searchMode = false;
  //   this.getAllData();
  // }

  // onSelected(value: any) {
  //   this.limit = value;
  //   this.searchMode = false;
  //   this.getAllData();
  // }

  // sortName(event: any) {
  //   this.sort = event;
  //   this.getAllData();
  // }

  // getAllData() {
  //   let page = {
  //     page: this.currentPage,
  //     limit: this.limit,
  //     searchText: this.searchText,
  //     sort: this.sort,
  //   };
  //   this.service.getAll().subscribe((response) => {
  //     this.items = [];
  //     this.buttons = [];
  //     this.items = this.searchMode ? response.seerchData : response.allData;
  //     this.i = Math.ceil(response.count / this.limit);
  //     console.log(response.count);
  //     for (let i = 1; i <= this.i; i++) {
  //       this.buttons.push({
  //         id: i,
  //       });
  //     }
  //   });
  // }

  // onEditData(id: any) {
  //   this.service.getItemsList(id).subscribe((response) => {
  //     this.editMode = true;
  //     // this.data = response.singleData;
  //   });
  // }

  // onAddData(form: NgForm) {
  //   this.formdata = {
  //     name: form.value.name,
  //     email: form.value.email,
  //   };
  //   if (this.editMode) {
  //     this.service.updateData(this.id, this.formdata).subscribe((response) => {
  //       form.reset({});
  //       this.editMode = false;
  //       alert('UPDATED');
  //       this.getAllData();
  //     });
  //   } else {
  //     // this.service.postdata(this.formdata).subscribe((response) => {
  //     //   form.reset({});
  //     //   alert('ADDED');
  //     //   this.getAllData();
  //     // });
  //   }
  // }

  // onDeleteData(id: any) {
  //   this.service.deleteData(id).subscribe(() => {
  //     alert('DELETED');
  //     this.getAllData();
  //   });
  // }
}
