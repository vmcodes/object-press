import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUser, UpdateUser } from './dto';
import { BlogService } from 'src/blogs/blog.service';
import { PostService } from 'src/posts/post.service';
import postHistory from 'src/utils/postHistory';
import { Metrics, User } from './model';
import { LoginUser, JwtPayload } from 'src/auth/dto';
import { NotificationService } from 'src/notify/notify.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly blogService: BlogService,
    private readonly postService: PostService,
    private readonly notificationService: NotificationService
  ) {}

  // create account
  async create(newUsersData: LoginUser): Promise<User> {
    const newUser = {
      userId: newUsersData.userId,
      email: newUsersData.email,
      username: newUsersData.email.split('@')[0],
      firstName: '',
      lastName: '',
      company: '',
      title: '',
      country: '',
      website: '',
      notifications: true,
      createDate: new Date().toISOString(),
      modifiedDate: new Date().toISOString(),
    };

    try {
      const createdUser = new this.userModel(newUser);

      await createdUser.save();

      const user = await this.userModel.findOne({
        userId: newUsersData.userId,
      });

      let notify = {
        sub: JSON.stringify(user._id),
      };

      let data = {
        title: `Welcome!`,
        content: `Welcome to Object Press! Please reach out if you have any questions and check out the documentation to learn more!`,
        email: false,
      };

      await this.notificationService.create(notify, data);

      return user;
    } catch {
      throw new UnauthorizedException();
    }
  }

  // find user via cognito sub
  async findOne(loginUser: LoginUser): Promise<User> {
    return await this.userModel.findOne({ userId: loginUser.userId });
  }

  // token validation
  async findUser(jwtPayload: JwtPayload): Promise<User> {
    return await this.userModel.findOne({ _id: jwtPayload.sub });
  }

  // login
  async login(loginUserData: CreateUser): Promise<User> {
    let user = await this.userModel.findOne({ userId: loginUserData.userId });

    Object.assign(user, {
      modifiedDate: new Date().toISOString(),
    });

    const updateUser = new this.userModel(user);
    await updateUser.updateOne(updateUser);

    return user;
  }

  // update user profile
  async update(user: JwtPayload, updateUserData: UpdateUser) {
    let profile = {
      _id: user.sub,
      username: updateUserData.username,
      firstName: updateUserData?.firstName,
      lastName: updateUserData?.lastName,
      company: updateUserData?.company,
      title: updateUserData?.title,
      country: updateUserData?.country,
      website: updateUserData?.website,
      notifications: updateUserData.notify,
      modifiedDate: new Date().toISOString(),
    };

    try {
      const userProfile = new this.userModel(profile);
      await userProfile.updateOne(userProfile);

      return true;
    } catch {
      return false;
    }
  }

  // user metrics
  async getMetrics(user: JwtPayload): Promise<Metrics> {
    const blogs = await this.blogService.findAll(user);
    const posts = await this.postService.findAll(user);

    let pending = [];
    let active = [];

    posts.forEach((post) => {
      if (post.active) {
        active.push(post);
      } else if (!post.active) {
        pending.push(post);
      }
    });

    const content = posts?.map((post: any) => post.post.images);
    let gallery: string[] = [];

    content?.forEach((image) => {
      if (image[0]) {
        gallery.push(...image);
      }
    });

    let totals = posts.map((post) => post.createDate);
    const history = postHistory(totals);

    const metrics = {
      blogs: blogs.length,
      pendingPosts: pending.length,
      activePosts: active.length,
      images: gallery.length,
      postHistory: history,
    };

    return metrics;
  }
}
