import { Component, OnInit, Renderer2 } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';
import { Molba } from '../nova-molba/molba.model';
import { MolbaService } from '../nova-molba/molba.service';

@Component({
  selector: 'app-pregled-molbi',
  templateUrl: './pregled-molbi.component.html',
  styleUrls: ['./pregled-molbi.component.css']
})
export class PregledMolbiComponent  implements OnInit {
  [x: string]: any;
  public molba: Molba[];
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
    private molbaService : MolbaService) {
    this.userId=0;
    this.molba = [];
    this.molbaTemp = [];
   }
   ngOnInit(): void {
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
      this.userId=user.id;
    }
    if(this.roles[0]==='STUDENT'){
      this.dohvatiMolbeUsera(this.userId);

    }else{
      this.dohvatiMolbe();

    }
 
  
  }
  redirect(id:string){

  }

  valuechangeIme(searchValue: any): void {  
    this.mymodelIme = this.mymodelIme.toLowerCase();
    this.molba = this.molbaTemp.filter((s: { tip: string; }) => s.tip.toLowerCase().includes(this.mymodelIme));
  }

    public dohvatiMolbeUsera(id:number): void{
      this.molbaService.dohvatiMolbeUsera(id).subscribe(
        (response: Molba[]) =>{
          this.molba=response;
          this.molbaTemp=response;
          console.log(response)
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
    public dohvatiMolbe(): void{
      this.molbaService.dohvatiMolbe().subscribe(
        (response: Molba[]) =>{
          this.molba=response;
          this.molbaTemp=response;
          console.log(response)
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
