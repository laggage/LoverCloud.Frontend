import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { User } from 'projects/lover-cloud/src/shared/models/user';

@Injectable({
  providedIn: 'root'
})
export class NoLoverGuard implements CanActivate {
  

  constructor(
    private userServ: UserService,
    private router: Router
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return this.checkLover();
  }

  private async checkLover() {
    const user = await this.userServ.getUser().toPromise() as User;
    const result = (user && !user.spouse);
    if(!result) this.router.navigateByUrl('/lover');
    return result;
  }
}
