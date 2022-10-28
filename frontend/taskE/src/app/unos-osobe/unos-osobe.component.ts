import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Osoba } from '../osobe/osoba.model';
import { UnosOsobeService } from './unos-osobe.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-unos-osobe',
  templateUrl: './unos-osobe.component.html',
  styleUrls: ['./unos-osobe.component.css']
})
export class UnosOsobeComponent implements OnInit {
  osoba: Osoba = {} as Osoba;
  constructor(private unosOsobeService: UnosOsobeService,   private _router: Router,) {
    // this.osoba.datumRodenja=new Date (22/09/2021);
  }

  ngOnInit(): void {
  }

  submit() {
    this.unosOsobeService.spremiOsoba(this.osoba).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Želite li nastaviti s unosom osoba?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: 'No',
          customClass: {
            actions: 'my-actions',
            cancelButton: 'order-1 right-gap',
            confirmButton: 'order-2',
            denyButton: 'order-3',
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this._router.navigate(['/unos-osoba']);
          } else if (result.isDenied) {
            this._router.navigate(['/osobe']);
          }
        })
      },
      (error: HttpErrorResponse) => {
        console.log("err get un2")
      }
    )
  }



}



// Swal.fire({
//   title: 'Are you sure?',
//   text: "You won't be able to revert this!",
//   icon: 'warning',
//   showCancelButton: true,
//   confirmButtonColor: '#3085d6',
//   cancelButtonColor: '#d33',
//   confirmButtonText: 'Yes, delete it!'
// }).then((result) => {
//   if (result.isConfirmed) {
//     Swal.fire(
//       'Deleted!',
//       'Your file has been deleted.',
//       'success'
//     )
//   }
// })