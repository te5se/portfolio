import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(private messageService: MessageService) { }
  errorHandlerEmptyObject = (error: HttpErrorResponse)=> {
    this.handleError(error);
    return of({});
  }
  errorHandlerBoolean = (error: HttpErrorResponse)=> {
    this.handleError(error);
    return of(false);
  }
  errorHandlerString = (error: HttpErrorResponse)=> {
    this.handleError(error);
    return of('');
  }
  errorHandlerEmptyList = (error: HttpErrorResponse)=> {
    this.handleError(error);
    return of([]);
  }
  handleError(error: HttpErrorResponse){
    this.messageService.add({key: 'globalToast', severity:'error', summary: `Error ${error.status}` , detail: error.message});
  }
}
