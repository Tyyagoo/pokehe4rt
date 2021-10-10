import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../core/services/user/user.service';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.scss'],
})
export class PublicComponent implements OnInit {
  registerMessage?: string;
  loginMessage?: string;
  isAuth: boolean = false;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.isAuth = this.userService.isAuthenticated();
    if (this.isAuth) {
      this.router.navigateByUrl('/game');
    }
  }

  register() {
    let setRegisterMessage = (message?: string) =>
      (this.registerMessage = message);
    this.userService.register(
      {
        email: 'cjscnka@gmail.com',
        username: 'ITSME',
        password: 'helloworldworld',
      },
      setRegisterMessage,
      setRegisterMessage
    );
  }

  login() {
    let setLoginMessage = (message?: string) => (this.loginMessage = message);

    this.userService.login(
      { username: 'ITSME', password: 'helloworldworld' },
      () => (this.isAuth = true),
      setLoginMessage
    );
  }
}
