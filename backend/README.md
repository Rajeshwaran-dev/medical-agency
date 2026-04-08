# Medical Agency Backend

Express + MongoDB backend for:
- Public website product/category/offer APIs
- Admin dashboard JWT authentication and CRUD operations

## Tech
- Node.js, Express.js
- MongoDB Atlas + Mongoose
- JWT authentication
- Cloudinary image upload

## Project Structure
```
backend/
  src/
    config/
    controllers/
    middlewares/
    models/
    routes/
    seed/
    services/
    utils/
    app.js
    server.js
```

## Setup
1. Copy `.env.example` to `.env`
2. Fill environment variables
3. Install dependencies:
   - `npm install`
4. Seed admin account:
   - `npm run seed:admin`
5. Run server:
   - `npm run dev`

## Main API Endpoints
- `POST /api/auth/login`
- `GET /api/auth/me` (protected)

- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/products` (protected, admin, multipart with `image`)
- `PUT /api/products/:id` (protected, admin)
- `DELETE /api/products/:id` (protected, admin)

- `GET /api/categories`
- `POST /api/categories` (protected, admin)
- `PUT /api/categories/:id` (protected, admin)
- `DELETE /api/categories/:id` (protected, admin)

- `GET /api/offers`
- `POST /api/offers` (protected, admin)
- `PUT /api/offers/:id` (protected, admin)
- `DELETE /api/offers/:id` (protected, admin)

- `GET /api/dashboard/stats` (protected, admin)

## Deployment Notes
- Backend target: Render
- DB target: MongoDB Atlas
- Set all `.env` variables in Render dashboard
- Configure CORS origin to your frontend domains
