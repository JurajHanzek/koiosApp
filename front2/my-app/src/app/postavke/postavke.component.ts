import { Component } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { UpisService } from '../novi-upis/upis.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Kljucevi } from './kljucevi.model';

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
  id='';

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,private router: Router,private upisService:UpisService) { }

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
    this.id=user.id
    if(this.roles[0]=="REFERADA"){
      this.isReferada= true;
    }
  }
  }

  public generiraj(): void{
      this.upisService.generirajKljuc(this.id).subscribe(
        (response: Kljucevi) =>{
          console.log(response)
          localStorage.setItem('token',response.privateKey)
          Swal.fire({
            title: 'Bravo!',
            text: 'Uspješno ste generirali ključ. Možete nastaviti s potpisivanjem.',
            icon: 'success',
            confirmButtonText: 'Ok'
          })
        }, 
        (error: HttpErrorResponse)=>{
          Swal.fire({
            title: 'Error!',
            text: 'Nešto je pošlo po zlu.',
            icon: 'error',
            confirmButtonText: 'Cool'
          })
        }
      )


  }

}
