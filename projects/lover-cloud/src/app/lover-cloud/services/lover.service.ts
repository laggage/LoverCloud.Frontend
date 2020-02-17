import { Injectable } from '@angular/core';
import { UserService } from '../../authentication/services/user.service';

@Injectable()
export class LoverService {

  constructor(
    private userServ: UserService
  ) { }

  
}
