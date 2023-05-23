import { ArticleService } from './services/article/article.service';
import { AuthService } from './services/auth/auth.service';
import { PhotosService } from './services/photos/photos.service';
import { SubscriptionService } from './services/subscription/subscription.service';
import { UserService } from './services/user/user.service';

export const api = {
    auth: AuthService,
    user: UserService,
    article: ArticleService,
    photos: PhotosService,
    subscription: SubscriptionService,
};
