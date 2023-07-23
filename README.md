# NestJS Authorization and Authentication

## CLI Notes

- `$ yarn start --entryFile repl`: start repl file

## REPL Notes

- `await get("UserRepository").update({ id: 1 }, { role: "regular" })`: update the user with id 1 role's to regular
- `await get("UserRepository").find()`: get list of users

## Environment Variables

- Create a `.env` file at the project's root directory and add key value pairs below:

```
DATABASE_HOST=
DATABASE_NAME=
DATABASE_PASSWORD=
DATABASE_PORT=
DATABASE_USER=

JWT_SECRET=
JWT_TOKEN_AUDIENCE=
JWT_TOKEN_ISSUER=
JWT_ACCESS_TOKEN_TTL=
JWT_REFRESH_TOKEN_TTL=

TFA_APP_NAME=

GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

SESSION_SECRET=
```
