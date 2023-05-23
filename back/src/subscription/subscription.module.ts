import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/repository/user.repository';
import { Subscription } from './entity/subscription.entity';
import { SubscriptionRepository } from './repository/subscription.repository';
import { SubscriptionService } from './service/subscription.service';
import { SubscriptionController } from './subscription.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription])],
  controllers: [SubscriptionController],
  providers: [SubscriptionService, SubscriptionRepository, UserRepository],
})
export class SubscriptionModule {}
