import { Module } from '@nestjs/common';
import type { MiddlewareConsumer, NestModule } from '@nestjs/common';
import { HttpLoggingMiddleware } from './common/middleware/http-logger.middleware.js';
import { MaterialsModule } from './materials/materials.module.js';
import { OrdersModule } from './orders/orders.module.js';
import { SharedModule } from './shared/shared.module.js';

@Module({
  imports: [MaterialsModule, OrdersModule, SharedModule],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(HttpLoggingMiddleware).forRoutes('*');
  }
}
