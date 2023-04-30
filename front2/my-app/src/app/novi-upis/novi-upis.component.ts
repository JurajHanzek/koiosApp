import { Component, Renderer2 } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Predmet } from './predmet.model';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UpisService } from './upis.service';
import { Upis } from './upis.model';

@Component({
  selector: 'app-novi-upis',
  templateUrl: './novi-upis.component.html',
  styleUrls: ['./novi-upis.component.css']
})
export class NoviUpisComponent {
  
[x: string]: any;
roles: string[] = [];
isLoggedIn = false;
public predmeti: Predmet[];
public upisPredmet: Predmet[];
showAdminBoard = false;
showModeratorBoard = false;
username?: string;
name?: string;
isCollapsed = false;
isRedovan = true;
smjer = '';
id :number;
semestar :number;
info: Predmet = {} as Predmet;
upis: Upis = {} as Upis;
ifExists= false;

constructor(private tokenStorageService: TokenStorageService,private renderer: Renderer2, private upisService : UpisService) { 
  this.semestar=0;
  this.id=0;
  this.predmeti = [];
  this.upisPredmet = [];
}

ngOnInit(): void {
  this.dohvatiPredmete();
 // document.body.classList.toggle('sb-sidenav-toggle');
 
 this.isLoggedIn = !!this.tokenStorageService.getToken();

 if (this.isLoggedIn) {
   const user = this.tokenStorageService.getUser();
   this.roles = user.roles;
   this.username = user.username;
   this.name = user.name;
   this.smjer = user.smjer;
   this.semestar = user.semestar;
   this.isRedovan = user.redovan;
   this.id=user.id;
 }

 this.dohvatiUpis(this.id)
}

public dohvatiPredmete(): void{
  this.upisService.dohvatiPredmete().subscribe(
    (response: Predmet[]) =>{
      this.predmeti=response;
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
public dohvatiUpis(id:number): void{
  this.upisService.dohvatiUpis(this.id).subscribe(
    (response: Upis) =>{
      this.upis=response;
      if(response != null){
        this.ifExists = true;
      }
    }, 
    (error: HttpErrorResponse)=>{
      // Swal.fire({
      //   title: 'Error!',
      //   text: 'Nešto je pošlo po zlu.',
      //   icon: 'error',
      //   confirmButtonText: 'Cool'
      // })
    }
  )
}

public upisi(): void{
  this.upisService.spremiUpis(this.upisPredmet).subscribe(
    (response: Predmet[]) =>{
      this.predmeti=response;
      location.reload();
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

public add(id:number){

  this.predmeti.forEach((obj, index) => {
    if (obj.id === id) {
      this.upisPredmet.push(obj);
    }
  });
 console.log(this.upisPredmet)
}

public inf(id:number){
  this.predmeti.forEach((obj) => {
    if (obj.id === id) {
      this.info = obj;
    }
  });
}
}
