import { AfterViewInit, Component } from '@angular/core';
import Chart from 'chart.js/auto';
import { ChartType } from 'chart.js';
import Config from 'chart.js/dist/core/core.config';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements AfterViewInit {

  availDays: any;
  user: any;
  adminCount : number = 0;
  doctorCount  : number = 0;
  ReceptionistCount  : number = 0;



  constructor(private userService: UserInfoService) {
    this.availDays = this.userService.get('availDays', 'local')
    console.log(this.availDays)
    this.user = this.userService.get('currentUser', 'session')

    const usersString = localStorage.getItem('users');
   


    if (usersString) {
      const users = JSON.parse(usersString);

      // Check each user's role
      users.forEach((user: any) => {
        if (user.role === 'admin') {
          this.adminCount++;
        }
        else if(user.role === 'doctor')
        {
          this.doctorCount++;
        }
        else{
          this.ReceptionistCount++;
        }
      });
    }
  }


  ngAfterViewInit(): void {
    this.createPieChart();
  }
// chart
  createPieChart(): void {
    const data = {
      labels: ['Doctors', 'Receptionist', 'Admin'],
      datasets: [{
        label: 'Number of Users',
        data:[this.adminCount,this.ReceptionistCount,this.doctorCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.7)',
          'rgba(54, 162, 235, 0.7)',
          'rgba(255, 206, 86, 0.7)',
          'rgba(75, 192, 192, 0.7)'
        ],
        borderWidth: 1
      }]
    };

    const config = {
      type: 'pie',
      data: data,
      options: {
        plugins: {
          title: {
            display: true,
            text: 'Number of Users'
          }
        }
      }
    } as const;

    new Chart('pieChart', config);
  }

}
