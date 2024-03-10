import { Component } from '@angular/core';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class DoctorsComponent {
  specialities: string[] = ['General Practitioner', 'Optometrist', 'Dentist'];
  allDoctors: any;
  data : any[] = [];

  constructor(private userInfo: UserInfoService) {
    this.allDoctors = this.userInfo.get('users', 'local');
    this.data = this.allDoctors.filter((user: any) => {
      return user.role === 'doctor';
    });
  
    console.log(this.data);
  }
  
  
  
}
