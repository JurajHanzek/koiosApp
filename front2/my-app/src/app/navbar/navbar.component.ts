import Swal from 'sweetalert2'
import { TokenStorageService } from '../_services/token-storage.service';
import { Component, Renderer2 , ViewChild, Output, OnInit } from "@angular/core";
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
[x: string]: any;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  isCollapsed = false;
  @ViewChild('sidebarToggle') ssd: ElementRef | undefined;

  constructor(private tokenStorageService: TokenStorageService,private renderer: Renderer2) { }

  ngOnInit(): void {
    // document.body.classList.toggle('sb-sidenav-toggle');
    
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
    }

    
    // Toggle the side navigation
    const sidebarToggle = document.body.querySelector('#sidebarToggle');
    if (sidebarToggle) {
      // Uncomment Below to persist sidebar toggle between refreshes
      // if (localStorage.getItem('sb|sidebar-toggle') === 'true') {
      //   document.body.classList.toggle('sb-sidenav-toggled');
      // }
      sidebarToggle.addEventListener('click', event => {
        event.preventDefault();
        //  document.body.classList.toggle('sb-sidenav-toggled');
        // sidebarToggle
        const toggleElement = this.ssd?.nativeElement;
        toggleElement.classList.toggle('sb-sidenav-toggled')
        localStorage.setItem('sb|sidebar-toggle', document.body.classList.contains('sb-sidenav-toggled').toString());
        
      });
    }

  }

  ngAfterViewInit() {

    // Do something with the toggleElement here
  }

  
  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
  // handleSidebarToggle(): void {
  //   this.isCollapsed = !this.isCollapsed
  // }
  toggleSidebar() {
    // const body = document.querySelector('#asd') as HTMLElement;
    // this.renderer.addClass(body, 'sb-sidenav-toggled');
    // console.log(localStorage.getItem('sb-sidenav-toggle'))

  }
  pleaseLogin(): void {
    Swal.fire('Molim prijavite se kako bi mogli koristit ovu opciju.')
  }
}
