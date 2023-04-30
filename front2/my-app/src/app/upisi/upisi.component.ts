import { Component, Renderer2 } from '@angular/core';
import { UpisService } from '../novi-upis/upis.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Upis } from '../novi-upis/upis.model';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-upisi',
  templateUrl: './upisi.component.html',
  styleUrls: ['./upisi.component.css']
})
export class UpisiComponent {
  [x: string]: any;
  public upis: Upis[];
   roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;
  name?: string;
  isCollapsed = false;
  isRedovan = true;
  smjer = '';
  semestar = '';
  userId:number;
  mymodelIme = '';

  constructor(private tokenStorageService: TokenStorageService,private renderer: Renderer2,
    private upisService : UpisService) {
    this.userId=0;
    this.upis = [];
    this.upisTemp = [];
   }
   ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.name = user.name;
      this.smjer = user.smjer;
      this.semestar = user.semestar;
      this.isRedovan = user.redovan;
      this.userId=user.id;
    }
      this.dohvatiUpise();
  }

  valuechangeIme(searchValue: any): void {  
    this.mymodelIme = this.mymodelIme.toLowerCase();
    this.molba = this.molbaTemp.filter((s: { tip: string; }) => s.tip.toLowerCase().includes(this.mymodelIme.toLowerCase()));
  }
  public dohvatiUpise(): void{
    this.upisService.dohvatiUpise().subscribe(
      (response: Upis[]) =>{
        this.upis=response;
        this.upisTemp=response;
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
