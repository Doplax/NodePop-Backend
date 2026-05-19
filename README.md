# NodePop Backend

REST API for the NodePop / Wallapop clone (Express + Mongoose + TypeScript).

## Setup

```sh
npm install
cp .env.example .env
# Edit .env: DB_URI, JWT_SECRET, PUBLIC_BASE_URL, CORS_ORIGINS, PORT
```

Load demo data (drops and recreates collections):

```sh
npm run seed
```

## Run

```sh
# Production
npm start

# Development (with reload)
npm run dev
```

## Configuration

| Variable          | Required          | Default                          | Notes                                              |
| ----------------- | ----------------- | -------------------------------- | -------------------------------------------------- |
| `DB_URI`          | yes               | `mongodb://localhost:27017/...`  | Mongo connection string                            |
| `JWT_SECRET`      | yes in production | dev fallback (warning logged)    | Use a long random string                           |
| `JWT_EXPIRES_IN`  | no                | `24h`                            | e.g. `1h`, `7d`                                    |
| `PORT`            | no                | `3000`                           | HTTP port                                          |
| `PUBLIC_BASE_URL` | recommended       | `http://localhost:${PORT}`       | Used to build absolute image URLs in responses     |
| `CORS_ORIGINS`    | no                | localhost dev origins            | Comma-separated list of allowed origins            |
| `NODE_ENV`        | no                | `development`                    | `production` enables stricter checks               |

## API

Base path: `/api`

### Auth
- `POST /api/auth/register` — `{ email, password }`
- `POST /api/auth/login` — `{ email, password }` → `{ token, user }`
- `GET  /api/auth/me` — current user (requires `Authorization: Bearer <token>`)

### Products
- `GET  /api/products` — list, supports query params:
  - `search` (substring of name, case-insensitive)
  - `tag` (single or comma-separated: `lifestyle,mobile,motor,work`)
  - `minPrice`, `maxPrice`
  - `isForSale` (`true|false`)
  - `sort` (`name|price|createdAt|updatedAt`, prefix `-` for descending)
  - `page` (default `1`), `limit` (default `20`, max `100`)
- `GET    /api/products/:id` — get one
- `POST   /api/products` — create (auth, multipart with `photo`)
- `PUT    /api/products/:id` — update (auth)
- `DELETE /api/products/:id` — delete (auth)

### Images
- `GET /api/images/:id` — fetches the image stored on a product (cached 24h)

### Health
- `GET /health` — `{ status: 'ok', uptime }`

## Security

- `JWT_SECRET` is required in production; the server refuses to start without it.
- `helmet` is enabled and the login/register endpoints are rate-limited (20 req / 15 min).
- Passwords are never returned (schema `select: false` + JSON transform).
- All write operations on `/api/products` require a valid bearer token.
