import { AfterViewInit, Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddPatientComponent } from '../Popups/add-patient/add-patient.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DetailsComponent } from '../Popups/details/details.component';
import *as XLSX from 'xlsx';
import { SharedServiceService } from 'src/app/services/shared-service.service';
import { UserInfoService } from 'src/app/services/user-info.service';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})

export class TableComponent implements OnChanges {

  @Input() tableData: any;
  spreadsheetData: any;
  isDoctor: boolean = false;
  isPatient: boolean = false;
  displayedHeaders: string[] = []
  displayedColoms: string[] = [];
  dataSource!: MatTableDataSource<any>;
  existing: any = [];
  new: any = [];
  mynew: any = [];
  currentUser!: any;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private snackbar: MatSnackBar, private userInfor: UserInfoService,
    private api: ApiServiceService) {
    // this.new = localStorage.getItem('users')
    // this.new = JSON.parse(this.new)

    // let _users = localStorage.getItem('users');
    // const users = _users ? JSON.parse(_users) : [];

    // sessionStorage.setItem('currentUser',users[2])
    let _usersD = sessionStorage.getItem('currentUser');
    const currentUser = _usersD ? JSON.parse(_usersD) : [];

    console.log(currentUser.role)
  
    if(currentUser.role === 'doctor'){
      this.isDoctor = true;
    }

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tableData.title == 'Patient') {
      this.isPatient = true;
    } else {
      this.isPatient = false;
    }
    if (changes['tableData']) {
      this.dataSource = new MatTableDataSource(this.tableData.dataSource);
      this.displayedColoms = this.tableData.displayedColumns
      this.displayedHeaders = this.tableData.displayedHeaders
    }

  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    // console.log(this.dataSource)
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  patient(): void {
    console.log("patient function is called");
    this.matDialog.open(AddPatientComponent)
  }
  User(event: any): void {

    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let convertedData = XLSX.read(binaryData, { type: 'binary' });
      convertedData.SheetNames.forEach(user => {
        const excelData = XLSX.utils.sheet_to_json(convertedData.Sheets[user])
        this.spreadsheetData = excelData;
        // console.log(this.spreadsheetData)

        let _users = localStorage.getItem('users');
        const users = _users ? JSON.parse(_users) : [];
        let doesUserExist: boolean;


        this.currentUser = users[3]
        console.log("this is a current User",this.currentUser)
        sessionStorage.setItem('currentUser',JSON.stringify(this.currentUser))

        console.log(users)
        if (users.length > 0) {
          // console.log("if working")
          this.spreadsheetData.forEach((item: any) => {
            doesUserExist = false;
            users.forEach((user: { email: any; }) => {

              if (item.email === user.email) {
                // console.log("found user", user.email)
                doesUserExist = true;
              }
            });
            if (!doesUserExist) {
              this.mynew.push({
                fullName: item.fullName,
                email: item.email,
                role: item.occupation === 'receptionist' ? 'receptionist' : 'doctor',
                phoneNumber: item.cellNumber,
                address: item.address,
                password: this.userInfor.generatePwd()
              })      
            }
          });

          this.mynew.forEach(((newUser: any) => {
            users.push(newUser)
          }))
          localStorage.setItem('users', JSON.stringify(users))
          this.api.genericPost('/sendPassword', users[users.length - 1])
            .subscribe({
              next: (res) => {console.log(res)},
              error: (err) => {console.log(err)},
              complete: () => {}
            })
          // console.log(users)
        } else {
          console.log("else working")
          localStorage.setItem('users', JSON.stringify(this.spreadsheetData))
        }


      })

    }
  }
  details(receivedData: any): void {
    console.log("recived data", receivedData)
    this.matDialog.open(DetailsComponent, { data: receivedData })
  }
}

