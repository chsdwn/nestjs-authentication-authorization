import { PassportSerializer } from '@nestjs/passport';
import { ActiveUserData } from 'src/iam/interfaces';

import { User } from 'src/users/entities';

export class UserSerializer extends PassportSerializer {
  serializeUser(user: User, done: (err: Error, user: ActiveUserData) => void) {
    done(null, {
      sub: user.id,
      email: user.email,
      role: user.role,
      permissions: user.permissions,
    });
  }

  async deserializeUser(
    payload: ActiveUserData,
    done: (err: Error, user: ActiveUserData) => void,
  ) {
    done(null, payload);
  }
}
