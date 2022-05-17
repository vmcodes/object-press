import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NotificationService } from './notify.service';
import { NotificationInput, NotificationDelete } from './dto';
import { Notification } from './model';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards';
import { CurrentUser, JwtPayload } from 'src/auth/dto';

@UseGuards(JwtAuthGuard)
@Resolver((of) => Notification)
export class NotificationResolver {
  constructor(private readonly notificationService: NotificationService) {}

  @Mutation((returns) => Boolean)
  async removeNotification(
    @CurrentUser() user: JwtPayload,
    @Args('deleteNotificationData') notificaitionDelete: NotificationDelete
  ) {
    return this.notificationService.remove(user, notificaitionDelete);
  }

  @Query((returns) => [Notification])
  async getNotifications(
    @CurrentUser() user: JwtPayload
  ): Promise<Notification[]> {
    return this.notificationService.findAll(user);
  }
}
