import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private cookies: CookieService) {}

  getToken() {
    return this.cookies.get('token');
  }

  setToken(token: string) {
    this.cookies.set('token', token);
  }
}
