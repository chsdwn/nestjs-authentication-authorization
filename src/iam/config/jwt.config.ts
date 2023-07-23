import { registerAs } from '@nestjs/config';

export default registerAs('jwt', () => ({
  secret: process.env.JWT_SECRET,
  audience: process.env.JWT_TOKEN_AUDIENCE,
  issuer: process.env.JWT_TOKEN_ISSUER,
  accessTokenTtl: parseInt(process.env.JWT_ACCESS_TOKEN_TTL, 10),
  refreshTokenTtl: parseInt(process.env.JWT_REFRESH_TOKEN_TTL, 10),
}));
