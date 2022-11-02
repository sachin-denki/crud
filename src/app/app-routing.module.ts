import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCartComponent } from './add-cart/add-cart.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { TvComponent } from './tv/tv.component';

const routes: Routes = [
  {
    path: '',
    component: MainHomeComponent,
  },
  {
    path: 'add-cart',
    component: AddCartComponent,
  },
  {
    path: 'confirm-order',
    component: OrderConfirmComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
