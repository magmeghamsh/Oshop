import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { UserService } from '../app-firebase/user/user.service';
import { switchMap, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { AppUser } from 'src/app/shared/models/app-user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;
  returnUrl;

  constructor(private afAuth: AngularFireAuth,
              private activeRoute: ActivatedRoute,
              private userService: UserService) {
    this.user$ = afAuth.authState;
   }

  loginWithGoogle() {
    let returnUrl = this.activeRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }

  loginWithFb() {
    let returnUrl = this.activeRoute.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap(user => {
        if (user) {
          return this.userService.get(user.uid);
        } else {
          return of(null);
        }
      }),
      map((appUser: AppUser) => appUser)
    );
  }

}
