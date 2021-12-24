import { ErrorHandler, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalErrorHandlerService implements ErrorHandler {
  constructor() {}

  handleError(error: any) {
    let message = 'error for user:\t';
    if (error.hasOwnProperty('status')) {
      if (error.status === 0) {
        // A client-side or network error occurred. Handle it accordingly.
        message += '[client-side or network error]';
      } else {
        // The backend returned an unsuccessful response code.
        message += `[http error code ${error.status}]`;
        if (error.error.message) {
          message += `[error message: ${error.error.message}]`;
        }
      }
    }
    message += error.message;
    console.log(message);

    console.log('error for debug:', error);
  }
}

export const ErrorHandlerProvide = {
  provide: ErrorHandler,
  useClass: GlobalErrorHandlerService,
};
