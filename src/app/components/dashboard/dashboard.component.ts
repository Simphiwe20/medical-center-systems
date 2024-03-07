import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  menuItems: any[] = [
    { label: 'dashboard', icon: 'dashboard', route: '/dashboard/?' },
    { label: 'users', icon: 'group', route: '/dashboard/users' },
    { label: 'profile', icon: 'person', route: '/dashboard/profile' },
  ]

  user: any;
  menuItemss: any[] = [];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router) {
    
    // if (this.user.role === 'admin') {
    //   // Admin
    //   this.menuItemss = [
    //     { label: 'dashboard', icon: 'dashboard', route: 'dashboard/dashboard?' },
    //     { label: 'users', icon: 'group', route: '/dashboard/users' },
    //     { label: 'profile', icon: 'person', route: '/dashboard/profile' },
    //   ]
    // } else if (this.user.role === 'receptionist') {
    //   // Reception
    //   this.menuItemss = [
    //     { label: 'dashboard', icon: 'dashboard', route: 'dashboard/dashboard?' },
    //     { label: 'schedules', icon: 'schedule', route: '/dashboard/schedules' },
    //     { label: 'patient', icon: 'personal_injury', route: '/dashboard/patient'},
    //     // Patients?
    //   ]
    // } else {
    //   // Doctor
    //   this.menuItemss = [
    //     { label: 'dashboard', icon: 'dashboard', route: 'dashboard/dashboard?' },
    //     { label: 'schedules', icon: 'event_available', route: '/dashboard/schedules' },
    //     { label: 'patient', icon: 'personal_injury', route: '/dashboard/patient'},
    //   ]
    // }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
