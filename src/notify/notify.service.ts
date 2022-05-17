import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtPayload } from 'src/auth/dto';
import { sortDescending } from 'src/utils/sorts';
import { NotificationDelete, NotificationInput } from './dto';
import { Notification } from './model';

@Injectable()
export class NotificationService {
  constructor(
    @InjectModel(Notification.name)
    private notificationModel: Model<Notification>
  ) {}

  async create(user: JwtPayload, data: NotificationInput) {
    let message = Object.assign(data, {
      userId: user.sub,
      createDate: new Date().toISOString(),
    });

    try {
      const notification = new this.notificationModel(message);
      await notification.save();

      return true;
    } catch {
      return false;
    }
  }

  async findAll(user: JwtPayload): Promise<Notification[]> {
    const results = await this.notificationModel.find({
      userId: user.sub,
    });

    return sortDescending(results, 'createDate');
  }

  async remove(user: JwtPayload, data: NotificationDelete): Promise<boolean> {
    try {
      await this.notificationModel.deleteOne({
        _id: data.id,
        userId: user.sub,
      });

      return true;
    } catch {
      return false;
    }
  }
}
