import { AfterViewInit, Component, ViewChild, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
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

export class TableComponent implements OnChanges, OnInit {

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
  isToday: boolean = false;
  users: any



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private matDialog: MatDialog, private snackbar: MatSnackBar, private userInfor: UserInfoService,
    private api: ApiServiceService) {
    let _usersD = sessionStorage.getItem('currentUser');
    const currentUser = _usersD ? JSON.parse(_usersD) : [];

    if (currentUser.role === 'doctor') {
      this.isDoctor = true;
    }

  }

  ngOnInit(): void {
    this.api.genericGet("/users").subscribe({
      next: (res) => { 
        this.users = res 
        console.log("res: ", res )    
      },
      error: (err) => { console.log("ERR: ", err) },
      complete: () => {}
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.tableData.title == 'Patient') {
      this.isPatient = true;
    } else if (this.tableData.title == 'today') {
      this.isPatient = false;
      this.isToday = false
    } else {
      this.isPatient = false
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
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  patient(): void {
    let dialogRef = this.matDialog.open(AddPatientComponent)
    dialogRef.afterClosed()
      .subscribe({
        next: (res) => {
          this.dataSource = this.userInfor.get('patients', 'local')
        }
      })
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

        let _users = localStorage.getItem('users');
        const users = _users ? JSON.parse(_users) : [];
        let doesUserExist: boolean;

        console.log(users)
        if (this.users.length > 0) {
          this.spreadsheetData.forEach((item: any) => {
            doesUserExist = false;
            this.users.forEach((user: { email: any; }) => {


              if (item.email === user.email) {
                doesUserExist = true;
              }
            });
            if (!doesUserExist) {
              this.mynew.push({
                ...item,
                password: this.userInfor.generatePwd(),
                id: new Date().getTime()
              })
            }
          });

          this.mynew.forEach(((newUser: any) => {
            this.users.push(newUser)
            this.api.genericPost('/sendPassword', newUser)
              .subscribe({
                next: (res) => { console.log(res) },
                error: (err) => { console.log(err) },
                complete: () => { }
              })
          }))

          localStorage.setItem('users', JSON.stringify(users))

          this.users.forEach((_user: any) => {
            this.api.genericPost('/add-user', _user)
              .subscribe({
                next: (res) => { console.log(res) },
                error: (err) => { console.log(err) },
                complete: () => { }
              })
          })

          // this.dataSource = this.userInfor.get('users', 'local')
        } else {
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

