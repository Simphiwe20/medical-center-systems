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
  user: any;
  menuItems: any[] = [];
  isAdmin: boolean = true;
  isReception: boolean = true;
  isDoctor: boolean = true;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private router: Router, private userInfo: UserInfoService) {
    this.user = this.userInfo.get('currentUser', 'session');

    
    if (this.user.role === 'admin') {
      this.menuItems = [
        { label: 'dashboard', icon: 'dashboard', route: '/home/dashboard' },
        { label: 'users', icon: 'group', route: '/home/users' },
        { label: 'profile', icon: 'person', route: '/home/profile' },
        { label: 'doctors', icon: 'group', route: '/home/doctors'},
      ]
      this.isAdmin = false;
      

    } else if (this.user.role === 'reception') {
      this.menuItems = [
        { label: 'dashboard', icon: 'dashboard', route: '/home/dashboard' },
        { label: 'patient', icon: 'personal_injury', route: '/home/patient'},
        { label: 'schedule', icon: 'event_available', route: '/home/schedules'},
        { label: 'profile', icon: 'person', route: '/home/profile' },
        { label: 'doctors', icon: 'group', route: '/home/doctors'},
      ]
      this.isReception = false;
    } else {
      this.menuItems = [
        { label: 'dashboard', icon: 'dashboard', route: '/home/dashboard' },
        { label: 'schedule', icon: 'event_available', route: '/home/schedules' },
        { label: 'patient', icon: 'personal_injury', route: '/home/patient'},
        { label: 'availability', icon: 'group', route: '/home/availability'},
      ]
      this.isDoctor= false;

    }
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
