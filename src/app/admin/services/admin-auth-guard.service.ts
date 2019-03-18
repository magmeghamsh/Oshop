import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/core/services/guard/auth.service';
import { UserService } from 'src/app/core/services/app-firebase/user/user.service';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(private authService: AuthService,
              private userService: UserService) { }

  canActivate(): Observable<boolean> {
    return this.authService.appUser$
    .pipe(
      map(appUser => appUser.isAdmin)
      );
  }
}
