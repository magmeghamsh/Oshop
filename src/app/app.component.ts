import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from './core/services/app-firebase/user/user.service';
import { AuthService } from './core/services/guard/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private userService: UserService, public authService: AuthService, router: Router) {
    authService.user$.subscribe(user => {
      if (user) {
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        if (returnUrl) {
          router.navigateByUrl(returnUrl);
          localStorage.removeItem('returnUrl');
        }
      }
    });
  }
}
