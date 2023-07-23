import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as session from 'express-session';
import * as passport from 'passport';
import * as createRedisStore from 'connect-redis';

import { ApiKey } from 'src/users/api-keys/entities';
import { User } from 'src/users/entities';
import { AuthenticationController } from './authentication/authentication.controller';
import {
  AccessTokenGuard,
  ApiKeyGuard,
  AuthenticationGuard,
} from './authentication/guards';
import { AuthenticationService } from './authentication/authentication.service';
import { PoliciesGuard } from './authorization/guards';
import { FrameworkContributorPolicyHandler } from './authorization/policies/framework-contributor.policy';
import { PolicyHandlerStorage } from './authorization/policies/policy-handlers.storage';
import { RefreshTokenIdsStorage } from './authentication/refresh-token-ids.storage';
import jwtConfig from './config/jwt.config';
import BcryptService from './hashing/bcrypt.service';
import { HashingService } from './hashing/hashing.service';
import { ApiKeysService } from './authentication/api-keys.service';
import { OtpAuthenticationService } from './authentication/otp-authentication.service';
import { UserSerializer } from './authentication/serializers/user-serializer';
import { GoogleAuthenticationService } from './authentication/social/google-authentication.service';
import { GoogleAuthenticationController } from './authentication/social/google-authentication.controller';
import { SessionAuthenticationService } from './authentication/session-authencation.service';
import { SessionAuthenticationController } from './authentication/session-authentication.controller';
import Redis from 'ioredis';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, ApiKey]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
  ],
  providers: [
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_GUARD,
      // useClass: RolesGuard,
      // useClass: PermissionsGuard,
      useClass: PoliciesGuard,
    },
    AccessTokenGuard,
    ApiKeyGuard,
    AuthenticationService,
    RefreshTokenIdsStorage,
    PolicyHandlerStorage,
    FrameworkContributorPolicyHandler,
    ApiKeysService,
    OtpAuthenticationService,
    GoogleAuthenticationService,
    SessionAuthenticationService,
    UserSerializer,
  ],
  controllers: [
    AuthenticationController,
    GoogleAuthenticationController,
    SessionAuthenticationController,
  ],
})
export class IamModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    const RedisStore = createRedisStore(session);
    consumer
      .apply(
        session({
          store: new RedisStore({ client: new Redis(6379, 'localhost') }),
          secret: process.env.SESSION_SECRET,
          resave: false,
          saveUninitialized: false,
          cookie: {
            sameSite: true,
            httpOnly: true,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('*');
  }
}
