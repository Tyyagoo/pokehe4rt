import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserRegisterPayload } from 'src/app/core/models/interfaces';
import { UserService } from 'src/app/core/services/user/user.service';

const strongPassword = (): ValidatorFn => {
  return (control: AbstractControl) => {
    const regex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{12,30}$/;
    return regex.test(control.value) ? null : { strong: true };
  };
};

const equalPasswords = (password: AbstractControl): ValidatorFn => {
  return (rePassword: AbstractControl) => {
    return password.value === rePassword.value ? null : { equal: true };
  };
};

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
})
export class RegisterFormComponent implements OnInit {
  hidePassword = true;
  hideRePassword = true;
  errorMessage?: string;
  successMessage?: string;

  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
  ]);

  passwordFormControl = new FormControl('', [
    Validators.required,
    strongPassword(),
  ]);

  rePasswordFormControl = new FormControl('', [
    Validators.required,
    equalPasswords(this.passwordFormControl),
  ]);

  registerForm = new FormGroup({
    username: this.usernameFormControl,
    password: this.passwordFormControl,
    rePassword: this.rePasswordFormControl,
  });

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  reset() {
    this.registerForm.reset();
  }

  onSubmit() {
    this.successMessage = undefined;
    this.errorMessage = undefined;
    let payload: UserRegisterPayload = {
      username: this.usernameFormControl.value,
      password: this.passwordFormControl.value,
    };
    console.log(payload);
    this.userService.register(
      payload,
      (message) => {
        this.successMessage = message;
      },
      (message) => {
        console.log('ERROR');
        this.errorMessage = message;
      }
    );
  }
}
