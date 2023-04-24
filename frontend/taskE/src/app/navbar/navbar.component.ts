import Swal from 'sweetalert2'
import { TokenStorageService } from '../_services/token-storage.service';
import { Component, EventEmitter, Input, Output, OnInit } from "@angular/core";
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  isExpanded = false;

  constructor(private tokenStorageService: TokenStorageService,private elementRef: ElementRef) { }

  toggleSidebar() {
    console.log("asd")
    document.body.classList.toggle('sb-sidenav-toggled');
    localStorage.setItem('sb-sidenav-toggled',"true");
  }
  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }
  }
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  handleSidebarToggle(): void {
    this.isExpanded = !this.isExpanded
  }

  pleaseLogin(): void {
    Swal.fire('Molim prijavite se kako bi mogli koristit ovu opciju.')
  }
}
