import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivateChild, Router, CanLoad } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';
import { User } from 'projects/lover-cloud/src/shared/models/user';

@Injectable()
export class AuthGuard implements CanActivate,CanActivateChild, CanLoad {
  
  constructor(
    private authServ: AuthService,
    private router: Router,
    private userServ: UserService
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log('auth guard');
      const result = this.checkLogin();
    if(!result) this.router.navigate(['/auth']);
    return result
    // this.checkLover().then(x => x && result);
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.canActivate(childRoute, state);
  }

  canLoad(route: import("@angular/router").Route, segments: import("@angular/router").UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    // console.log('auth guard can load');
    return this.canActivate(null, null) as boolean;
  }

  private checkLogin(): boolean {
    return this.authServ.isAuthenticate();
  }

  public async checkLover() {
    const user: User = await this.userServ.getUser().toPromise() as User;
    const result = !!(user && user.lover && user.spouse);
    if(!result) this.router.navigate(['lover/loverRequest']);
    console.log('checkLover: '+ result)
    return result
  }
}
