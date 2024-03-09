import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { UserInfoService } from 'src/app/services/user-info.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  // menuItems: any[] = [
  //   { label: 'dashboard', icon: 'dashboard', route: '/home/dashboard' },
  //   { label: 'users', icon: 'group', route: '/home/users' },
  //   { label: 'profile', icon: 'person', route: '/home/profile' },
  //   { label: 'availability', icon: 'event_busy', route: '/home/availability' },

  // ]

  user: any;
  menuItemss: any[] = [];


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private userInfo: UserInfoService) {
    this.user = this.userInfo.get('currentUser', 'session');

    // this.menuItemss = [
    //   { label: 'dashboard', icon: 'dashboard', route: 'home/dashboard' },
    //   { label: 'users', icon: 'group', route: '/home/users' },
    //   { label: 'profile', icon: 'person', route: '/home/profile' },
    //   { label: 'availability', icon: 'event_busy', route: '/home/availability' },

    // ]

    
    if (this.user.role === 'admin') {
      // Admin
      this.menuItemss = [
        { label: 'dashboard', icon: 'dashboard', route: '/home/dashboard' },
        { label: 'users', icon: 'group', route: '/home/users' },
        { label: 'profile', icon: 'person', route: '/home/profile' },
      ]
    } else if (this.user.role === 'receptionist') {
      // Reception
      this.menuItemss = [
        { label: 'dashboard', icon: 'dashboard', route: '/home/dashboard' },
        { label: 'schedules', icon: 'schedule', route: '/home/schedule' },
        { label: 'patient', icon: 'personal_injury', route: '/home/patient'},
      ]
    } else {
      // Doctor
      this.menuItemss = [
        { label: 'dashboard', icon: 'dashboard', route: '/home/dashboard' },
        { label: 'schedules', icon: 'event_available', route: '/home/schedule' },
        { label: 'patient', icon: 'personal_injury', route: '/home/patient'},
        { label: 'availability', icon: 'personal_injury', route: '/home/availability'}
      ]
    }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
