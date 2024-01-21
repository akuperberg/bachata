import { ErrorHandler, Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  handleError(error: any): void {
    if (error instanceof HttpErrorResponse && error.message.includes("Failed to execute 'postMessage'")) {
      // Suppress the specific error from being displayed
      console.log('djdjdj')
      return;
    }

    // Handle other errors as needed
    console.error('An error occurred:', error);

    // You can also log or send the error to a logging service
  }
}
