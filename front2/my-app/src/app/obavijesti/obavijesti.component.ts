import { HttpErrorResponse } from '@angular/common/http';
import { Component, Renderer2 } from '@angular/core';
import Swal from 'sweetalert2';
import { Obavijesti } from './obavijesti.model';
import { ObavijestiService } from './obavijesti.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-obavijesti',
  templateUrl: './obavijesti.component.html',
  styleUrls: ['./obavijesti.component.css']
})
export class ObavijestiComponent {
  oba: Obavijesti = {} as Obavijesti;
  public obavijesti: Obavijesti[];
  color = true
  roles: string[] = [];
  isLoggedIn = false;
  constructor(
    private tokenStorageService: TokenStorageService,private renderer: Renderer2,
    private obavijestiService : ObavijestiService,
  ) { 
    this.obavijesti = [];
    
   }
   ngOnInit(): void {
    this.dohvatiObavijesti();
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
    }
  }

  public dohvatiObavijesti(): void{
    this.obavijestiService.dohvatiObavijesti().subscribe(
      (response: Obavijesti[]) =>{
        this.obavijesti=response;
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
  submit(){
    this.obavijestiService.spremiObavijest(this.oba).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Uspješno spremljeno!',
          showDenyButton: false,
          showCancelButton: false,
          confirmButtonText: 'Ok',
        }).then(() =>{
          this.dohvatiObavijesti();
        })
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Neuspješno spremanje',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    )
  }

  public colors(x:number, y:number): Boolean{
    
  if(x===y){
    console.log(x,y)
    return true
  }
    return false;
  }
}
