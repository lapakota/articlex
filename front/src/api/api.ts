import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user.service';

export const api = {
    auth: AuthService,
    user: UserService,
};
