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
  userId :number;
  constructor(
    private tokenStorageService: TokenStorageService,private renderer: Renderer2,
    private molbaService : MolbaService,
  ) { 
    this.userId=0;
   }

   ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.userId= user.id;
      this.molba.userId = this.userId;
    }
  }

  submit(){ 
    console.log("ased")
    this.molbaService.spremiMolbu(this.molba).subscribe(
      (response: Komentar)  => {
      Swal.fire({
        icon: 'success',
        title: 'Uspješno spremljeno!',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then(() =>{ 
        this.kom.isMolba=true;
        this.kom.userId=this.userId;
        this.kom.sourceId=response.id;
        this.molbaService.spremiKomentar(this.kom).subscribe()
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
