import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/private/models/entity';
import { ServerSuccessResponse } from 'src/app/private/models/http';
import { environment } from 'src/environments/environment';
import {
  UserLoginPayload,
  UserLoginResponse,
  UserRegisterPayload,
  UserRegisterResponse,
} from '../../models/interfaces';
import { UserActionCallback } from '../../models/types';
import { StorageService } from '../storage/storage.service';
import { TokenService } from '../token/token.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(
    private httpClient: HttpClient,
    private tokenService: TokenService,
    private storageService: StorageService
  ) {}

  getUserData(
    username: string,
    onSuccess: (user: User) => void,
    onFailed: (error: HttpErrorResponse) => void
  ) {
    let url = `${environment.API_URL}/user/${username}`;
    let subscription = this.httpClient
      .get<ServerSuccessResponse<User>>(url)
      .subscribe(
        (user) => {
          subscription.unsubscribe();
          onSuccess(user.data);
        },
        (err) => {
          subscription.unsubscribe();
          onFailed(err);
        }
      );
  }

  login(
    payload: UserLoginPayload,
    onSuccess: UserActionCallback,
    onFailed: UserActionCallback
  ) {
    let url = `${environment.API_URL}/user/login`;
    this.httpClient.post<UserLoginResponse>(url, payload).subscribe(
      (res) => {
        if (res.data.token) {
          this.tokenService.setToken(res.data.token);
          this.storageService.set('username', payload.username);
          onSuccess(res.data.token);
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
    this.httpClient.post<UserRegisterResponse>(url, payload).subscribe(
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

  getTokenData() {
    if (this.isAuthenticated()) {
      let token = this.tokenService.getToken();
      return JSON.parse(atob(token.split('.')[1]));
    }
    return null;
  }
}
