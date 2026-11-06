import { Injectable, Logger } from '@nestjs/common';
import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import type { Request, Response } from 'express';
import type { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('TIMING');

  intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const http = context.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();
    const start = performance.now();

    const report = (): void => {
      const elapsed = (performance.now() - start).toFixed(2);
      if (!response.headersSent) {
        response.setHeader('X-Response-Time', `${elapsed}ms`);
      }
      this.logger.log(`Маршрут ${request.method} ${request.originalUrl} виконано за ${elapsed}ms`);
    };

    // tap лише спостерігає за потоком і не чіпає тіло відповіді;
    // error-гілка потрібна, щоб заголовок був і у відповідях з помилкою
    return next.handle().pipe(tap({ next: report, error: report }));
  }
}
