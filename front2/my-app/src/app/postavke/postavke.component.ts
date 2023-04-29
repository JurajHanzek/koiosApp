import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-postavke',
  templateUrl: './postavke.component.html',
  styleUrls: ['./postavke.component.css']
})
export class PostavkeComponent {
  form: any = {
    password: null
  };
  name = '';
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  isRedovan = true;
  smjer = '';
  semestar = '';
  email = '';
  username='';
  isReferada = false;

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router,) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorage.getToken();

  if (this.isLoggedIn) {
    const user = this.tokenStorage.getUser();
    this.roles = user.roles;
    this.name = user.name;
    this.smjer = user.smjer;
    this.semestar = user.semestar;
    this.email = user.email;
    this.isRedovan = user.redovan;
    this.username = user.username;
    if(this.roles[0]=="REFERADA"){
      this.isReferada= true;
    }
  }
  }

}
