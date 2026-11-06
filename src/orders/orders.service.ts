import { Inject, Injectable, Logger } from '@nestjs/common';
import type { OnModuleInit } from '@nestjs/common';
import { MaterialsService } from '../materials/materials.service.js';
import { STORE_CONFIG } from '../shared/config/app-config.provider.js';
import type { StoreConfig } from '../shared/config/app-config.provider.js';
import { FEE_CALCULATOR } from '../shared/config/fee-calculator.provider.js';
import type { FeeCalculator } from '../shared/config/fee-calculator.provider.js';
import type { CreateOrderDto } from './dto/create-order.dto.js';
import { OrderEntity } from './entities/order.entity.js';

const round2 = (value: number): number => Math.round(value * 100) / 100;

@Injectable()
export class OrdersService implements OnModuleInit {
  private readonly logger = new Logger(OrdersService.name);
  private readonly orders: OrderEntity[] = [];

  constructor(
    private readonly materialsService: MaterialsService,
    @Inject(STORE_CONFIG) private readonly config: StoreConfig,
    @Inject(FEE_CALCULATOR) private readonly feeCalculator: FeeCalculator,
  ) {}

  onModuleInit(): void {
    this.logger.log('Сервіс замовлень успішно підключено до білінгу та каталогу.');
  }

  createOrder(dto: CreateOrderDto, requestId?: string): OrderEntity {
    // findOne кидає NotFoundException, якщо товару немає в каталозі
    const product = this.materialsService.findOne(dto.productId);

    const subtotal = round2(product.price * dto.quantity);
    const taxAmount = this.feeCalculator.calculateTax(subtotal);

    const order: OrderEntity = {
      orderId: `ord-${Date.now()}-${this.orders.length + 1}`,
      customerEmail: dto.customerEmail,
      productId: product.id,
      productTitle: product.title,
      productSlug: product.slug,
      unitPrice: product.price,
      quantity: dto.quantity,
      subtotal,
      taxAmount,
      total: round2(subtotal + taxAmount),
      currency: this.config.defaultCurrency,
      status: 'confirmed',
      createdAt: new Date(),
    };
    this.orders.push(order);

    const prefix = requestId ? `[req ${requestId}] ` : '';
    this.logger.log(`${prefix}Замовлення ${order.orderId} оформлено: ${order.total} ${order.currency}`);
    return order;
  }

  findAll(): OrderEntity[] {
    return this.orders;
  }
}
