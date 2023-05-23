import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from 'src/auth/entity/user.entity';
import { UserRepository } from 'src/auth/repository/user.repository';
import { Subscription } from '../entity/subscription.entity';
import { SubscriptionResponse } from '../interface/subscription-response.interface';
import { SubscriptionRepository } from '../repository/subscription.repository';

@Injectable()
export class SubscriptionService {
  constructor(
    private subscriptionRepository: SubscriptionRepository,
    private userRepository: UserRepository,
  ) {}

  async subscribe(
    user: User,
    subscribedUsername: string,
  ): Promise<SubscriptionResponse> {
    if (user.username === subscribedUsername) {
      throw new ConflictException('You can not subscribe on yourself');
    }

    const subscription = new Subscription();
    subscription.subscriber = user;

    const target = await this.userRepository.findOne({
      where: { username: subscribedUsername },
    });

    if (!target) {
      throw new NotFoundException('Target user does not exist');
    }

    const existingSubscription = await this.subscriptionRepository.findOne({
      where: {
        subscriber: { username: user.username },
        target: { username: target.username },
      },
    });

    if (existingSubscription) {
      throw new ConflictException('Subscription already exists');
    }

    subscription.target = target;

    subscription.subscribedUsername = target.username;
    subscription.subscribedUserAvatar = target.userInfo.avatar;

    await this.subscriptionRepository.save(subscription);

    const response: SubscriptionResponse = {
      id: subscription.id,
      subscribedUsername: subscription.subscribedUsername,
      subscribedUserAvatar: subscription.subscribedUserAvatar,
    };
    return response;
  }

  async unsubscribe(
    userSubscriber: User,
    targetUsername: string,
  ): Promise<void> {
    const subscription = await this.subscriptionRepository.findOne({
      where: {
        target: { username: targetUsername },
        subscriber: { username: userSubscriber.username },
      },
    });

    if (!subscription) throw new NotFoundException('Subscription not found');

    await this.subscriptionRepository.delete(subscription.id);
  }
}
