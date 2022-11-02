import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
})
export class NavBarComponent implements OnInit {
  valid!: boolean;
  constructor(private service: ServiceService) {}

  ngOnInit(): void {
    this.valid = this.service.auth;
  }
  onLogout(){
    this.service.clearAuthData()
  }
}
