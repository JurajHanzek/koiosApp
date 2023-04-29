import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { OsobeService } from '../osobe/osobe.service';
import { MolbaService } from '../nova-molba/molba.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Molba } from '../nova-molba/molba.model';
import { Komentar } from '../nova-molba/komentar.model';
import Swal from 'sweetalert2';
import { User } from '../user.model';

@Component({
  selector: 'app-detalji-molbe',
  templateUrl: './detalji-molbe.component.html',
  styleUrls: ['./detalji-molbe.component.css']
})
export class DetaljiMolbeComponent implements OnInit{
  id;
  sub;
  molba: Molba = {} as Molba;
  uss: User = {} as User;
  public komentar: Komentar[];
  kom: Komentar = {} as Komentar;
  us;
  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
       this.id = params.get('id'); 
       console.log("ovo je ",this.id)
       this.molbaService.dohvatiMolbaId(this.id).subscribe(
        (response: Molba) =>{
          this.molba = response;
          this.dohvatiKomentare(this.molba.id);

        },
        (error: HttpErrorResponse)=>{
          console.log(error.message);
        }
      )
  });
  const user = this.tokenStorageService.getUser();
  this.us = user.id;
}
   constructor(
    private molbaService:MolbaService,
    private _Activatedroute:ActivatedRoute,
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService,
    private router: Router,
  ) { 
    this.komentar = [];
   } 

   submit(){
    this.kom.userId=this.us;
    this.kom.sourceId=this.molba.id;
    this.kom.isMolba=true;

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

  public dohvatiKomentare(id:number): void{
    this.molbaService.dohvatiKomentare(id).subscribe(
      (response: Komentar[]) =>{
        this.komentar=response;
      }, 
      (error: HttpErrorResponse)=>{
        Swal.fire({
          title: 'Error!',
          text: 'Nešto je pošlo po zlu.',
          icon: 'error',
          confirmButtonText: 'Cool'
        }).then(()=>{
        
      })
      }
    )
  }

  
  public dohvatiUsera(id:number): void{
    this.molbaService.dohvatiUsera(id).subscribe(
      (response: User) =>{
        this.uss=response;
        console.log(response)
        // return this.uss.first_last_name;
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
