import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_METHOD, ServerSuccessResponse } from '../models/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  get<T>(url: string) {
    let fullUrl = `${environment.API_URL}/${url}`;
    return this.http
      .get<ServerSuccessResponse<T>>(fullUrl)
      .pipe(catchError((err) => this.handleError(err)));
  }

  post<T>(url: string, data?: any) {
    let fullUrl = `${environment.API_URL}/${url}`;
    return this.http
      .post<ServerSuccessResponse<T>>(fullUrl, data)
      .pipe(catchError((err) => this.handleError(err)));
  }

  put<T>(url: string, data?: any) {
    let fullUrl = `${environment.API_URL}/${url}`;
    return this.http
      .put<ServerSuccessResponse<T>>(fullUrl, data)
      .pipe(catchError((err) => this.handleError(err)));
  }

  delete(url: string) {
    let fullUrl = `${environment.API_URL}/${url}`;
    return this.http
      .delete<never>(fullUrl)
      .pipe(catchError((err) => this.handleError(err)));
  }

  handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError({ error: error.message, status: error.status });
  }
}
