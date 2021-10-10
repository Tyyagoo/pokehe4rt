import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {
  UserActionResponse,
  UserLoginPayload,
  UserRegisterPayload,
} from '../../models/interfaces';
import { UserActionCallback } from '../../models/types';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService
  ) {}

  login(
    payload: UserLoginPayload,
    onSuccess: UserActionCallback,
    onFailed: UserActionCallback
  ) {
    let url = `${environment.API_URL}/user/login`;
    this.httpClient.post<UserActionResponse>(url, payload).subscribe(
      (res) => {
        if (res.token) {
          this.tokenService.setToken(res.token);
          onSuccess(res.token);
        }
      },
      (err) => {
        onFailed(err.error.message);
      }
    );
  }

  register(
    payload: UserRegisterPayload,
    onSuccess: UserActionCallback,
    onFailed: UserActionCallback
  ) {
    let url = `${environment.API_URL}/user/register`;
    this.httpClient.post<UserActionResponse>(url, payload).subscribe(
      (res) => {
        onSuccess(res.message);
      },
      (err) => {
        onFailed(err.error.message);
      }
    );
  }

  isAuthenticated() {
    return !!this.tokenService.getToken();
  }
}
