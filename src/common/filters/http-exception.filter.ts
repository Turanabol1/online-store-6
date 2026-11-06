import { Catch, HttpException, HttpStatus } from '@nestjs/common';
import type { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import type { Request, Response } from 'express';

// BAD_REQUEST -> Bad Request
function statusName(status: number): string {
  const name = HttpStatus[status];
  if (typeof name !== 'string') {
    return 'Error';
  }
  return name
    .split('_')
    .map((word) => word.charAt(0) + word.slice(1).toLowerCase())
    .join(' ');
}

@Catch(HttpException)
export class GlobalExceptionFilter implements ExceptionFilter<HttpException> {
  catch(exception: HttpException, host: ArgumentsHost): void {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const body = exception.getResponse();

    let error = statusName(status);
    let message: unknown = exception.message;
    if (typeof body === 'string') {
      message = body;
    } else if (typeof body === 'object' && body !== null) {
      const details = body as { error?: unknown; message?: unknown };
      if (typeof details.error === 'string') {
        error = details.error;
      }
      if (details.message !== undefined) {
        message = details.message;
      }
    }

    response.status(status).json({
      success: false,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.originalUrl,
      method: request.method,
      error,
      message,
    });
  }
}
