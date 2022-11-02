import { AbsoluteSourceSpan } from '@angular/compiler';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { AdminComponent } from './admin/admin.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { TvComponent } from './tv/tv.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

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
  {
    path:'about',
    component:AboutUsComponent
  }, {
    path:'contact',
    component:ContactUsComponent
  },
  {
    path:'user-profile',
    component:UserProfileComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
