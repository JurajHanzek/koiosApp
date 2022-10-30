import { formatDate } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TokenStorageService } from '../_services/token-storage.service';
import { Osoba } from './osoba.model';
import { OsobeService } from './osobe.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';
import * as JsonToXML from "js2xmlparser";
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-osobe',
  templateUrl: './osobe.component.html',
  styleUrls: ['./osobe.component.css']
})
export class OsobeComponent implements OnInit {
  @ViewChild('TABLE') table: ElementRef = {} as ElementRef;;
  displayedColumns = ['ime', 'prezime', 'adresa', 'grad', 'datumRodenja','email'];
  
  mymodelIme = '';
  mymodelPrezime = '';
  mymodelDatum = '';
  isLoggedIn = false;
  public osobe: Osoba[];
  public osobeTemp: Osoba[];
  constructor(
    private sanitizer: DomSanitizer,
    private tokenStorageService: TokenStorageService,
    private router: Router,
    private osobeService : OsobeService,
  ) { 
    this.osobe = [];
    this.osobeTemp = [];
   }

  ngOnInit(): void {
    this.dohvatiOsobe();
    
    this.isLoggedIn = !!this.tokenStorageService.getToken();
  }
  
  ExportTOWord(): void {
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml+document?.getElementById('htmlData')?.innerHTML+postHtml;
    var blob = new Blob(['\ufeff', html], {
        type: 'text/msword'
    });
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);
        downloadLink.href = url;
        downloadLink.download = 'osoba.doc';
        downloadLink.click();
  }

  ExportTOExcel()
{
  const ws: XLSX.WorkSheet=XLSX.utils.table_to_sheet(this.table.nativeElement);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  
  /* save to file */
  XLSX.writeFile(wb, 'Osobe.xlsx');
  
}
ExportTOXml()
{
  const wb = JsonToXML.parse('osoba',JSON.stringify(this.osobe))
    var element = document.createElement('a');
     var blob = new Blob([wb], {
       type: 'text/xml'
     });
     var url = URL.createObjectURL(blob);
     element.href = url;
     element.setAttribute('download', 'osobe.xml');
     document.body.appendChild(element); 
     element.click();
  
}

  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('Osobe.pdf');
    });
  }

  valuechangeIme(searchValue: any): void {  
    this.mymodelIme = this.mymodelIme.toLowerCase();
    this.osobe = this.osobeTemp.filter(s => s.ime.toLowerCase().includes(this.mymodelIme));
  }
  valuechangePrezime(searchValue: any): void {  
    this.mymodelPrezime = this.mymodelPrezime.toLowerCase();
    this.osobe = this.osobeTemp.filter(s => s.prezime.toLowerCase().includes(this.mymodelPrezime));
  }
  valuechangeDatum(searchValue: any): void {  
    console.log(this.mymodelDatum)
    this.mymodelDatum = this.mymodelDatum.toLowerCase();
    this.osobe = this.osobeTemp.filter(s => this.datum(s.datumRodenja).includes(this.mymodelDatum));
  }


  public dohvatiOsobe(): void{
    this.osobeService.dohvatiSveOsobe().subscribe(
      (response: Osoba[]) =>{
        this.osobe=response;
        this.osobeTemp = response;
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

  public datum(date: Date): string{
    return formatDate(date, 'dd/MM/yyyy', 'en-US');
  }
  public datumFix(date: String): string{
    const [year, month, day] = date.split('-');
    const result = [day, month, year].join('/');
    console.log(result)
    return result;
  }


  public izbrisi(id: number){
    if(!this.isLoggedIn){
      Swal.fire('Molim prijavite se kako bi mogli koristit ovu opciju.')
    }else{
      Swal.fire({
        title: 'Jeste li sigurni?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        cancelButtonText: 'Ne',
        confirmButtonText: 'Da, izbriši!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.delete(id)
          Swal.fire(
            'Izbrisano!',
            'Osoba je izbrisana.',
            'success'
          ).then(()=>{
            window.location.reload();
          })
        }
      })
    }
 

  }

  public azuriraj(id: number){
    if(!this.isLoggedIn){
      Swal.fire('Molim prijavite se kako bi mogli koristit ovu opciju.')
    }else{
    this.router.navigate(['/unos-osobe', id]);
    }
  }

  public delete(id: number): void{
    this.osobeService.delete(id).subscribe(
      () =>{
        
      }, 
      (error: HttpErrorResponse)=>{
      }
    )
  }

}

