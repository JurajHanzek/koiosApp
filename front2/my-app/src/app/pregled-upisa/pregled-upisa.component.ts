import { HttpErrorResponse } from '@angular/common/http';
import { Component,ElementRef , ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from '../_services/token-storage.service';
import { Upis } from '../novi-upis/upis.model';
import { UpisService } from '../novi-upis/upis.service';
import Swal from 'sweetalert2';
import { Komentar } from '../nova-molba/komentar.model';
import { MolbaService } from '../nova-molba/molba.service';
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
import { Predmet } from '../novi-upis/predmet.model';
pdfMake.vfs = pdfFonts.pdfMake.vfs;   
@Component({
  selector: 'app-pregled-upisa',
  templateUrl: './pregled-upisa.component.html',
  styleUrls: ['./pregled-upisa.component.css']
})
export class PregledUpisaComponent {
  @ViewChild('iframe') iframe: ElementRef | undefined;
  id;
  sub;
  upis: Upis = {} as Upis;
  us;
  url=''
  public komentar: Komentar[];
  public predmeti: Predmet[];
  kom: Komentar = {} as Komentar;

  ngOnInit(): void {
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
       this.id = params.get('id'); 
       console.log("ovo je ",this.id)
       this.upisService.dohvatiUpis(this.id).subscribe(
        (response: Upis) =>{
          this.upis=response;
          this.dohvatiKomentare(this.upis.id);
          this.dohvatiPredmete(this.upis.userId);
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
  });
  const user = this.tokenStorageService.getUser();
  this.us = user.id;
}
constructor(
  private molbaService:MolbaService,
  private upisService:UpisService,
  private _Activatedroute:ActivatedRoute,
  private sanitizer: DomSanitizer,
  private tokenStorageService: TokenStorageService,
  private router: Router,
) { 
  this.komentar = [];
  this.predmeti = [];
 } 

 public dohvatiKomentare(id:number): void{
  this.molbaService.dohvatiKomentare(id).subscribe(
    (response: Komentar[]) =>{
      console.log(response)
      response.forEach((obj)=>{
        if(!obj.isMolba){
          this.komentar.push(obj);
        }
      })
      this.generatePDF();
      // this.komentar=response;
      // this.generatePDF();
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


public dohvatiPredmete(id:number): void{
  this.molbaService.dohvatiPredmeteUsera(id).subscribe(
    (response: Predmet[]) =>{
      console.log(response)
      this.predmeti = response;
      this.generatePDF();
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


submit(){
  this.kom.userId=this.us;
  this.kom.sourceId=this.upis.id;
  this.kom.isMolba=false;

  this.molbaService.spremiKomentar(this.kom).subscribe(
    () => {
      Swal.fire({
        icon: 'success',
        title: 'Uspješno spremljeno!',
        showDenyButton: false,
        showCancelButton: false,
        confirmButtonText: 'Ok',
      }).then(() =>{
        location.reload();
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
generatePDF(): void {
  console.log(this.komentar)
  // Register fonts with pdfMake
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // Define document definition
  const docDefinition = {
    content: [
      {
        text: 'Tehinčko Veleučilište u Zagrebu',
        fontSize: 16,
        alignment: 'center',
        color: '#047886'
      },
      {
        text: 'UPIS STUDENTA',
        fontSize: 20,
        bold: true,
        alignment: 'center',
        decoration: 'underline',
        color: 'skyblue'
      },
      {
        text: "Upis u "+this.upis.semestar+". semestar",
        style: 'sectionHeader'
      },
      {
        columns: [
          [
            {
              text: this.upis.user,
              bold:true
            },
            { text: this.upis.datum },
            { text: this.upis.status }
          ],
          [
            {
              text: `Na datum: ${new Date().toLocaleString()}`,
              alignment: 'right'
            },
            { 
              text: `Broj upisa : `+ this.upis.id,
              alignment: 'right'
            }
          ]
        ]
      },
      {
        text: 'Predmeti',
        style: 'sectionHeader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto', 'auto', 'auto'],
          body: [
            ['Predmet', 'Nositelj','ECTS', 'Semestar'],
            ...this.predmeti.map(p => ([p.naziv, p.nositelj,p.ects,p.semestar])),
          ]
        }
      },
      {
        text: 'Komentari',
        style: 'sectionHeader'
      },
      {
        table: {
          headerRows: 1,
          widths: ['*', 'auto'],
          body: [
            ['Komentar', 'Korisnik'],
            ...this.komentar.map(p => ([p.komentar, p.user])),
          ]
        }
      },
      {
        text: 'Dodatni detalji',
        style: 'sectionHeader'
      },
      {
          text: "Upis je u statusu: "+this.upis.status,
          margin: [0, 0 ,0, 15]          
      },
      {
        columns: [
          [{ qr: this.upis.user, fit: '50' }],
          [{ text: 'Potpis studenta', alignment: 'right', italics: true}],
        ]
      },
      {
        text: 'Uvjeti i odredbe:',
        style: 'sectionHeader'
      },
      {
          ul: [
            'Ovaj dokument, koji se sastoji od uvjeta i odredbi, primjenjuje se na svakog korisnika koji pristupa ovom web mjestu.',
            'Korištenjem ovog web mjesta, korisnik prihvaća ove uvjete i odredbe u cijelosti.',
            'Korisnik se slaže da će koristiti ovo web mjesto samo u svrhe koje su zakonite i na način koji ne krši prava drugih.',
          ],
      }
    ],
    styles: {
      sectionHeader: {
        bold: true,
        decoration: 'underline',
        fontSize: 14,
        margin: [0, 15,0, 15]          
      }
    }
  };




  // Create PDF and set iframe source
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.getDataUrl((dataUrl) => {
    this.url=dataUrl;
    this.iframe!.nativeElement.src = dataUrl;
  });
}


}
