import {AfterViewInit, Component, ViewChild,Input, OnChanges, SimpleChanges} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnChanges{

  @Input() tableData: any;

  isPatient:boolean = false;
  displayedHeaders: string[] = [] 
  displayedColoms: string[] = [];
  dataSource: MatTableDataSource<any>;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    this.dataSource = new MatTableDataSource();
    
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.tableData.title=='Patient'){
      this.isPatient = true;
    }else{
      this.isPatient = false;
    }
    if(changes['tableData']){
      this.dataSource = this.tableData.dataSource;
      this.displayedColoms = this.tableData.displayedColumns
      this.displayedHeaders = this.tableData.displayedHeaders
    }
  
  }


  ngAfterViewInit() {
  
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    console.log(this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  patient():void{
    console.log("patient function is called");
  }
  User():void{
    console.log("User function is called")
  }
}

