import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Osoba } from '../osobe/osoba.model';
import { UnosOsobeService } from './unos-osobe.service';
import Swal from 'sweetalert2'
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { OsobeService } from '../osobe/osobe.service';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-unos-osobe',
  templateUrl: './unos-osobe.component.html',
  styleUrls: ['./unos-osobe.component.css']
})
export class UnosOsobeComponent implements OnInit {
  osoba: Osoba = {} as Osoba;
  osobaZaAzuriranje: Osoba = {} as Osoba;
  idOsobaZaAzuriranje: number;
  constructor(
      private unosOsobeService: UnosOsobeService,
      private osobeService: OsobeService,
       private router: Router,
       private _Activatedroute: ActivatedRoute,) {
  this.idOsobaZaAzuriranje = 0;
  }

  ngOnInit(): void {
    this._Activatedroute.paramMap.subscribe(params => { 
      this.idOsobaZaAzuriranje = Number(params.get('id')!); 
      if(this.idOsobaZaAzuriranje != 0)
         this.dohvatiOsobuID(this.idOsobaZaAzuriranje);
 });

  }
  dohvatiOsobuID(id: number){
    this.osobeService.dohvatiPoId(id).subscribe(
      (response: Osoba) =>{
        this.osoba=response;
        var datePipe = new DatePipe("en-US");
        this.osoba.datumRodenja= datePipe.transform(this.osoba.datumRodenja, 'yyyy-MM-dd') as any;
      }, 
      (error: HttpErrorResponse)=>{
        Swal.fire({
          title: 'Error!',
          text: 'Nešto je pošlo po zlu.',
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      }
    )

  }

  public datum(date: Date): string{
    return formatDate(date, 'yyyy-MM-dd', 'en-US');
  }


  submit() {
    if(this.idOsobaZaAzuriranje == 0){
      this.unosOsobeService.spremiOsoba(this.osoba).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Uspješno spremljeno! Želite li nastaviti s unosom osoba?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Da',
            denyButtonText: 'Ne',
            customClass: {
              actions: 'my-actions',
              cancelButton: 'order-1 right-gap',
              confirmButton: 'order-2',
              denyButton: 'order-3',
            }
          }).then((result) => {
            if (result.isConfirmed) {
               window.location.reload();
            } else if (result.isDenied) {
              this.router.navigate(['/osobe']);
            }
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
    }else{
    this.unosOsobeService.azurirajOsoba(this.osoba).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Želite li nastaviti s unosom osoba?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Da',
          denyButtonText: 'Ne',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then((result) => {
          if (result.isConfirmed) {
             window.location.reload();
          } else if (result.isDenied) {
            this.router.navigate(['/osobe']);
          }
        })
      },
      (error: HttpErrorResponse) => {
        Swal.fire({
          title: 'Error!',
          text: 'Neuspješno ažuriranje',
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
    )
  }
  }


}



