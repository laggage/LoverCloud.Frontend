import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router, CanLoad, CanActivateChild } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class LoverGuard implements CanActivate, CanActivateChild, CanLoad {

  

  
  constructor(
    private userServ: UserService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.checkLover();
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state)
  }

  canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    return this.checkLover();
  }
  
  public async checkLover() {
    const user: User = await this.userServ.getUser().toPromise() as User;
    const result = !!(user && user.lover && user.spouse);
    if(!result) this.router.navigate(['loverRequest']);
    return result
  }
}
