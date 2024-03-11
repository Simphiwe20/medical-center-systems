import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserInfoService } from '../services/user-info.service';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class DoctorsGuard implements CanActivate {
  constructor(private shared:UserInfoService,private location:Location){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let currentUser = this.shared.get('currentUser','session')
    if(currentUser.role.toLowerCase() === 'doctor'){
      return true
    }else{
      this.location.back()
      return false;
    }
    
  }
  
}
