import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular/standalone';
import { HttpErrorResponse } from '@angular/common/http';

export interface ErrorOptions {
  duration?: number;
  position?: 'top' | 'bottom' | 'middle';
  showRetry?: boolean;
  retryCallback?: () => void;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private toastController: ToastController) {}

  /**
   * Handle HTTP errors and display user-friendly messages
   */
  async handleError(error: any, customMessage?: string, options?: ErrorOptions): Promise<void> {
    console.error('Error occurred:', error);

    let message: string;

    if (error instanceof HttpErrorResponse) {
      // HTTP error
      message = this.getHttpErrorMessage(error, customMessage);
    } else if (error?.error?.message) {
      // Custom error with message property
      message = error.error.message;
    } else if (typeof error === 'string') {
      // String error
      message = error;
    } else {
      // Generic error
      message = customMessage || 'An unexpected error occurred. Please try again.';
    }

    await this.showErrorToast(message, options);
  }

  /**
   * Handle success messages
   */
  async handleSuccess(message: string, options?: ErrorOptions): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: options?.duration || 3000,
      position: options?.position || 'top',
      color: 'success',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  /**
   * Handle warning messages
   */
  async handleWarning(message: string, options?: ErrorOptions): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: options?.duration || 4000,
      position: options?.position || 'top',
      color: 'warning',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  /**
   * Handle info messages
   */
  async handleInfo(message: string, options?: ErrorOptions): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: options?.duration || 3000,
      position: options?.position || 'top',
      color: 'primary',
      cssClass: 'custom-toast'
    });
    await toast.present();
  }

  /**
   * Extract meaningful error message from HTTP error
   */
  private getHttpErrorMessage(error: HttpErrorResponse, customMessage?: string): string {
    if (customMessage) {
      return customMessage;
    }

    // Check for specific error messages in response
    if (error.error?.message) {
      return error.error.message;
    }

    if (error.error?.error) {
      return error.error.error;
    }

    // Default messages based on status code
    switch (error.status) {
      case 0:
        return 'Unable to connect to server. Please check your internet connection.';
      case 400:
        return 'Invalid request. Please check your input and try again.';
      case 401:
        return 'Your session has expired. Please login again.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'This operation conflicts with existing data.';
      case 422:
        return 'Invalid data provided. Please check your input.';
      case 500:
        return 'Server error occurred. Please try again later.';
      case 503:
        return 'Service temporarily unavailable. Please try again later.';
      default:
        return `An error occurred (${error.status}). Please try again.`;
    }
  }

  /**
   * Show error toast with optional retry button
   */
  private async showErrorToast(message: string, options?: ErrorOptions): Promise<void> {
    const toast = await this.toastController.create({
      message,
      duration: options?.duration || 4000,
      position: options?.position || 'top',
      color: 'danger',
      cssClass: 'custom-toast',
      buttons: options?.showRetry ? [
        {
          text: 'Retry',
          role: 'cancel',
          handler: () => {
            if (options?.retryCallback) {
              options.retryCallback();
            }
          }
        }
      ] : undefined
    });
    await toast.present();
  }

  /**
   * Handle network errors specifically
   */
  async handleNetworkError(): Promise<void> {
    await this.handleError(
      new HttpErrorResponse({ status: 0, statusText: 'Network Error' }),
      'No internet connection. Please check your network.'
    );
  }

  /**
   * Handle authentication errors
   */
  async handleAuthError(): Promise<void> {
    await this.handleError(
      new HttpErrorResponse({ status: 401, statusText: 'Unauthorized' }),
      'Session expired. Please login again.'
    );
  }

  /**
   * Handle validation errors with field-specific messages
   */
  async handleValidationError(errors: { [field: string]: string }): Promise<void> {
    const errorMessages = Object.entries(errors)
      .map(([field, message]) => `${field}: ${message}`)
      .join('\n');
    
    await this.showErrorToast(errorMessages, { duration: 5000 });
  }
}
