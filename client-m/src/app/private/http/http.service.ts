import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { API_METHOD } from '../models/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  request<T>(url: string, method: API_METHOD, data?: any) {
    let fullUrl = `${environment.API_URL}/${url}`;
    let response;
    switch (method) {
      case 'GET':
        response = this.http
          .get<T>(fullUrl)
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case 'POST':
        response = this.http
          .post<T>(fullUrl, data)
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case 'PUT':
        response = this.http
          .put<T>(fullUrl, data)
          .pipe(catchError((err) => this.handleError(err)));
        break;
      case 'DELETE':
        response = this.http
          .get(fullUrl)
          .pipe(catchError((err) => this.handleError(err)));
        break;
    }
    return response;
  }

  handleError(error: HttpErrorResponse) {
    console.error(error);
    return throwError({ error: error.message, status: error.status });
  }
}
