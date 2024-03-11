import { Component, Inject, Input, OnInit, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-prescription',
  templateUrl: './prescription.component.html',
  styleUrls: ['./prescription.component.scss']
})
export class PrescriptionComponent implements OnInit {
  @Input() patientData!: any[]

  constructor(private dialogRef: MatDialog, @Inject(MAT_DIALOG_DATA) public data: any) {
  }
  ngOnInit(): void {
    
  }
}


