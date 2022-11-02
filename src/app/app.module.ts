import { NgModule ,NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { MainHomeComponent } from './main-home/main-home.component';
import { TvComponent } from './tv/tv.component';
import { MatIconModule } from '@angular/material/icon';
import { AddCartComponent } from './add-cart/add-cart.component';
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import { OrderConfirmComponent } from './order-confirm/order-confirm.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AdminComponent } from './admin/admin.component';
import { FooterComponent } from './footer/footer.component';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DropdownModule } from 'primeng/dropdown';

@NgModule({
   schemas: [NO_ERRORS_SCHEMA],
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    MainHomeComponent,
    TvComponent,
    AddCartComponent,
    FileUploaderComponent,
    OrderConfirmComponent,
    AboutUsComponent,
    ContactUsComponent,
    UserProfileComponent,
    AdminComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatIconModule,
    ChartjsModule,
    DropdownModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
