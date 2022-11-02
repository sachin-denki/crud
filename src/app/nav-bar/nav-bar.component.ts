import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, HostBinding, Input, OnInit } from '@angular/core';
import { MainHomeComponent } from '../main-home/main-home.component';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  @Input() @HostBinding()qrt:any
  
  valid!: boolean;
  changeText!: boolean;
  data:any;
  totalitems: any;
  constructor(private service: ServiceService) {
    
  }
  
  ngOnInit(): void {
    this.service.headerClicked.subscribe((count: MainHomeComponent) => {
    this.totalitems = count;
  });
   this.totalitems
  let storecartcount =localStorage.getItem('count') 
  this.totalitems=storecartcount
    
  }
  onLogout() {
    this.service.clearAuthData();
  }
}
