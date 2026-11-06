import { Injectable, Logger } from '@nestjs/common';
import type { NestMiddleware } from '@nestjs/common';
import type { NextFunction, Request, Response } from 'express';

@Injectable()
export class HttpLoggingMiddleware implements NestMiddleware {
  private readonly logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction): void {
    const { method, originalUrl, ip } = req;
    const startTime = Date.now();

    // тривалість рахуємо, коли відповідь повністю сформована
    res.on('finish', () => {
      const duration = Date.now() - startTime;
      this.logger.log(`${method} ${originalUrl} ${res.statusCode} +${duration}ms [${ip}]`);
    });

    next();
  }
}
