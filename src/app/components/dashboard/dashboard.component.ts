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
    { label: 'dashboard', icon: 'dashboard', route: 'dashboard/dashboard?' },
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

  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }

}
