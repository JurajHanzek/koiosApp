import { Component, ElementRef , ViewChild, Output, OnInit } from "@angular/core";
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
import pdfMake from "pdfmake/build/pdfmake";  
import pdfFonts from "pdfmake/build/vfs_fonts";  
pdfMake.vfs = pdfFonts.pdfMake.vfs;   

@Component({
  selector: 'app-detalji-molbe',
  templateUrl: './detalji-molbe.component.html',
  styleUrls: ['./detalji-molbe.component.css']
})
export class DetaljiMolbeComponent implements OnInit{
  @ViewChild('iframe') iframe: ElementRef | undefined;
  id;
  sub;
  molba: Molba = {} as Molba;
  uss: User = {} as User;
  public komentar: Komentar[];
  kom: Komentar = {} as Komentar;
  us;
  url=''
  roles: string[] = [];

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
  this.roles = this.tokenStorageService.getUser().roles;
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
          text: 'MOLBA',
          fontSize: 20,
          bold: true,
          alignment: 'center',
          decoration: 'underline',
          color: 'skyblue'
        },
        {
          text: this.molba.tip,
          style: 'sectionHeader'
        },
        {
          columns: [
            [
              {
                text: this.molba.user,
                bold:true
              },
              { text: this.molba.datum },
              { text: this.molba.objasnjenje },
              { text: this.molba.status }
            ],
            [
              {
                text: `Na datum: ${new Date().toLocaleString()}`,
                alignment: 'right'
              },
              { 
                text: `Broj molbe : `+ this.molba.id,
                alignment: 'right'
              }
            ]
          ]
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
            text: "Molba je u statusu: "+this.molba.status,
            margin: [0, 0 ,0, 15]          
        },
        {
          columns: [
            [{ qr: this.molba.tip+"-"+this.molba.datum+"-"+this.molba.userId, fit: '50' }],
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

  public dohvatiKomentare(id:number): void{
    this.molbaService.dohvatiKomentare(id).subscribe(
      (response: Komentar[]) =>{
        this.komentar=response;
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

  public status(st:string): void{
    this.kom.komentar = "Promijenjem status"+this.molba.status +"->"+st;
    this.submit();
    this.molba.status=st;
    this.molbaService.setStatus(this.molba).subscribe(
      (response: Komentar[]) =>{
        this.komentar=response;
        location.reload();

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

