import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AddPatientComponent } from '../add-patient/add-patient.component';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
 
})
export class DetailsComponent {
  doctorName!:string ;
  doctorEmail!:string ;
  isDoctor:boolean = false;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private matDialog:MatDialog){
    let _usersD = sessionStorage.getItem('currentUser');
    const currentUser = _usersD ? JSON.parse(_usersD) : [];

    this.doctorName = currentUser.firstName +' '+ currentUser.lastName;
    this.doctorEmail = currentUser.email
    console.log(currentUser.role)
  
    if(currentUser.role === 'doctor'){
      this.isDoctor = true;
      
    }
  }
  PrescriptionFormdata:any={
    
  }
  details:any = this.data

    saveDocument(received:any) {

    console.log(this.PrescriptionFormdata.prescription)
    // Assuming documentContent is the content of your document
    const documentContent = `
    Doctor name : ${this.doctorName}

    Doctor email : ${this.doctorEmail}

    Date : ${new Date().toString().slice(4,15)}

    time : ${new Date().toString().slice(16,21)}

    Patient name : ${this.details.name} 

    Petient Id : ${this.details.id}

    patient IDENTITY NUMBER : ${this.details.idNumber}
    
    Doctor's prescription : ${this.PrescriptionFormdata.prescription}
    
    `;
   
  
    // Convert the document content to a Blob
    const blob = new Blob([documentContent], { type: 'file' });
  
    // Save the Blob using FileSaver.js
    saveAs(blob, 'document.txt');
  }
  
  // downloadAsWord() {
  //   const htmlContent = "<h1>Hello World</h1><p>This is a sample HTML content.</p>";

  //   const converted = htmlDocx.asBlob(htmlContent);

  //   FileSaver.saveAs(converted, 'document.docx');
  // }
 

  delete():void{

  }
  edit(received:any){
    this.matDialog.open(AddPatientComponent,{data:received})
  }
  back():void{
    this.matDialog.closeAll()
  }


}
