import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UserService } from '../../authentication/services/user.service';
import { User } from 'projects/lover-cloud/src/shared/models/user';
import { share, shareReplay } from 'rxjs/operators';
import { stat } from 'fs';

@Injectable()
export class LoverRequestGuard implements CanActivate {

  constructor(
    private userServ: UserService,
    private router: Router
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return new Observable<boolean>(sub => {
      //     let s = this.userServ.getUser().subscribe(res => {
      //       let user: User ;
      //       if(res instanceof User) {
      //         user = res;
      //         s.unsubscribe();
      //       }
      //       const result = user && !user.spouse && !user.lover;
      //       if(!result) this.router.navigate('');
      //       sub.next(result);
      //       sub.complete();
            
      //     });
      // });
    return this.userServ.getUser().toPromise().then(
      res => {
        let user: User = res as User;
        const result = user && !user.spouse && !user.lover;
        if(!result) {
          this.router.navigate(['lover']);
        }
        return result;
      }
    );
  }
  
}
