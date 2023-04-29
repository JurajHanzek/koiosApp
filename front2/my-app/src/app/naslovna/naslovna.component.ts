import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Naslovna } from './naslovna.model';
import { NaslovnaService } from './naslovna.service';

@Component({
  selector: 'app-naslovna',
  templateUrl: './naslovna.component.html',
  styleUrls: ['./naslovna.component.css']
})
export class NaslovnaComponent {
  public naslovna: Naslovna[];

  constructor(
    private naslovnaService : NaslovnaService,
  ) { 
    this.naslovna = [];
   }
   ngOnInit(): void {
    this.dohvatiNaslovnu();
    
  }

  public dohvatiNaslovnu(): void{
    this.naslovnaService.dohvatiNaslovnu().subscribe(
      (response: Naslovna[]) =>{
        this.naslovna=response;
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
