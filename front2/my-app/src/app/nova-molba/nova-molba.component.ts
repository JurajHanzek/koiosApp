import { Component, Renderer2 } from '@angular/core';
import { Molba } from './molba.model';
import { TokenStorageService } from '../_services/token-storage.service';
import { ObavijestiService } from '../obavijesti/obavijesti.service';
import { MolbaService } from './molba.service';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
import { Komentar } from './komentar.model';

@Component({
  selector: 'app-nova-molba',
  templateUrl: './nova-molba.component.html',
  styleUrls: ['./nova-molba.component.css']
})
export class NovaMolbaComponent {
  molba: Molba= {} as Molba;
  kom: Komentar= {} as Komentar;
  isLoggedIn = false;
  roles: string[] = [];

  constructor(
    private tokenStorageService: TokenStorageService,private renderer: Renderer2,
    private molbaService : MolbaService,
  ) { 
    
   }

   ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
    }
  }

  submit(){ 
    this.molbaService.spremiMolbu(this.molba).subscribe(
    () => {
      Swal.fire({
        icon: 'success',
        title: 'Uspješno spremljeno!',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then(() =>{
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
  this.molbaService.spremiKomentar(this.kom).subscribe(
    () => {
      Swal.fire({
        icon: 'success',
        title: 'Uspješno spremljeno!',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then(() =>{
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

}
