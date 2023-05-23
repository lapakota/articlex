import { Controller, Delete, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorators/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { JwtAuthenticationGuard } from 'src/auth/guards/jwt-authentication.guard';
import { SubscriptionService } from './service/subscription.service';

@ApiTags('Subscription')
@ApiBearerAuth()
@Controller('subscription')
@UseGuards(JwtAuthenticationGuard)
export class SubscriptionController {
  constructor(private readonly subscriptionService: SubscriptionService) {}

  @Post('/:username')
  async subscribe(@GetUser() user: User, @Param('username') username: string) {
    return this.subscriptionService.subscribe(user, username);
  }

  @Delete('/:username')
  async unsubscribe(
    @GetUser() user: User,
    @Param('username') username: string,
  ) {
    return this.subscriptionService.unsubscribe(user, username);
  }
}
