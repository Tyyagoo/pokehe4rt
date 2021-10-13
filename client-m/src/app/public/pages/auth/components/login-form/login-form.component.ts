import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginPayload } from 'src/app/core/models/interfaces';
import { UserService } from 'src/app/core/services/user/user.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  hidePassword = true;
  errorMessage?: string;
  isAuthenticated = false;

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(12),
  ]);

  loginForm = new FormGroup({
    username: this.usernameFormControl,
    password: this.passwordFormControl,
  });

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {}

  reset() {
    this.loginForm.reset();
  }

  onSubmit() {
    this.errorMessage = undefined;
    let payload: UserLoginPayload = {
      username: this.usernameFormControl.value,
      password: this.passwordFormControl.value,
    };

    this.userService.login(
      payload,
      () => {
        this.isAuthenticated = true;
        let timeout = setTimeout(() => {
          this.router.navigateByUrl('/');
          clearTimeout(timeout);
        }, 1500);
      },
      (message) => {
        this.errorMessage = message;
      }
    );
  }
}
