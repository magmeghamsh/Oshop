import { Component } from '@angular/core';
import { AuthService } from '../../services/guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private authService: AuthService) {
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle();
  }

  loginFb() {
    this.authService.loginWithFb();
  }
}
