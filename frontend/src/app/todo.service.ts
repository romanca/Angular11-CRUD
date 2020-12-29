import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Todo } from './Todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  REST_API: string = 'http://localhost:8000/api';

  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  constructor(private httpClient: HttpClient) { }

  addTodo({title, description}: Todo): Observable<any> {
    const data ={
      title: title,
      description: description 
    }
    const API_URL = `${this.REST_API}/add-todo`;
    return this.httpClient.post(API_URL, data)
      .pipe(
        catchError(this.handleError)
      )
  }

  getTodos() {
    return this.httpClient.get(`${this.REST_API}`);
  }

  getTodo(id:any): Observable<any> {
    const API_URL = `${this.REST_API}/read-todo/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  updateTodo(id:any, data:any): Observable<any> {
    const API_URL = `${this.REST_API}/update-todo/${id}`;
    return this.httpClient.put(API_URL, data, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteTodo(_id:any): Observable<any> {
    const API_URL = `${this.REST_API}/delete-todo/${_id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
