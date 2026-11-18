# Viswa Farmland Properties – Admin Panel

Separate React/Vite admin frontend + Node/Express API + MongoDB.

## Requirements
- Node.js 20+
- MongoDB local or MongoDB Atlas
- npm

## 1. Backend setup
```powershell
cd backend
Copy-Item .env.example .env
npm install
npm run seed:admin
npm run dev
```
Edit `backend/.env` before seeding:
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: long random secret (at least 32 characters)
- `ADMIN_EMAIL` and `ADMIN_PASSWORD`: initial admin credentials
- `CLIENT_ORIGIN`: React admin URL, normally `http://localhost:5173`
- `PUBLIC_BASE_URL`: API base URL, normally `http://localhost:5000`

The seed command creates the first admin only if that email does not already exist. Do not expose the seed command or use a weak password in production.

## 2. Frontend setup
Open a second PowerShell terminal:
```powershell
cd frontend
Copy-Item .env.example .env
npm install
npm run dev
```
Open http://localhost:5173 and sign in using the admin credentials from backend/.env.

## 3. Public property listing page
The frontend includes a customer-facing property listing page at `http://localhost:5173/properties`. The admin dashboard remains at `http://localhost:5173/`.

The public page uses the same backend and MongoDB records as the admin panel. It loads only enabled properties from `GET /api/public/properties`, with search, property cards, details/gallery modal and WhatsApp enquiry. If your public website is hosted on another domain, add that exact origin to `CORS_ORIGINS` in `backend/.env`.

The page recreates the supplied HTML design in React/CSS. The original website's `assets/` folder was not included in the admin ZIP. For the exact original logo and title image, copy those image files into `frontend/public/assets/img/` (logo.png, favicon.png, page-title-bg.jpg, img_long_5.jpg). A farmland photo fallback and text logo are provided.

The existing Property model stores property features in the `amenities` array. Enter features such as `Road Access, Borewell Water, Electricity` in the admin Amenities field; the public page displays them in the card and details view.

## 4. API endpoints
### Public
- `GET /api/public/properties`
- `GET /api/public/properties/:id`

### Admin (JWT required)
- `GET /api/admin/dashboard`
- `GET /api/admin/properties`
- `POST /api/admin/properties` (multipart form, `images` field, up to 10 files)
- `PUT /api/admin/properties/:id` (multipart form, `images` field; existing image URLs retained unless `removeImages` JSON array is supplied)
- `PATCH /api/admin/properties/:id/status`
- `DELETE /api/admin/properties/:id`
- `POST /api/auth/login`
- `GET /api/auth/me`

## 5. Image handling
Images are stored in `backend/uploads` for local development. In production, use persistent storage or object storage (Cloudinary, S3, etc.); many application hosts have ephemeral filesystems. Set `PUBLIC_BASE_URL` to the deployed API origin so image URLs are correct.

Allowed image formats: JPEG, PNG, WebP. Maximum 5 MB each, maximum 10 images per request/property. Configure limits in `backend/middleware/upload.js`.

## 6. Production deployment
1. Provision MongoDB Atlas and allow network access only from your server where possible.
2. Deploy the backend to a Node-compatible host with persistent disk or object storage for uploads.
3. Set production environment variables; generate a unique random `JWT_SECRET`. Set `NODE_ENV=production`, `CLIENT_ORIGIN` to your admin site, and `CORS_ORIGINS` to the exact public/admin origins.
4. Build frontend: `npm run build`; deploy `frontend/dist` to a static host.
5. Set frontend `VITE_API_URL` to your backend origin plus `/api`.
6. Use HTTPS. Never commit `.env` files or share admin credentials.
7. Create admin credentials using the server's seed command once. Remove/disable seed access after initial setup if your hosting workflow permits.
8. Back up MongoDB and image storage separately.

## Security notes
- Passwords are hashed with bcrypt.
- JWT-protected admin routes.
- Helmet security headers, rate-limited login, strict CORS allowlist, file MIME/extension checks, upload size limits and request validation.
- The initial admin seed is controlled by environment variables. Change the password after first login by updating the admin account through a secure account-management workflow; this starter intentionally does not provide public registration.
- For a production business deployment, add password reset, audit logs, role-based accounts and managed image storage.

## Public property listing page

The same React/Vite frontend now includes the customer-facing property listing page matching the supplied Viswa Farmland Properties design. The admin dashboard remains available at `/`; the public listing is available at `/properties`.

- Public page URL in local development: `http://localhost:5173/properties`
- It loads only active listings from `GET /api/public/properties`.
- It uses the existing admin backend and MongoDB data; no second database or duplicate property entry is needed.
- Search filters property title, location and district.
- Property cards include image, location, price, area, amenities, details modal/gallery and WhatsApp enquiry.
- The backend model currently stores `amenities` as an array, so the public page displays those as property features. Road access / water facility can be entered in the admin Amenities field (for example: `Road Access, Borewell Water`).
- Set `VITE_API_URL` in `frontend/.env` to your deployed backend API base, ending in `/api`.

The supplied HTML referenced an `assets/` folder that was not part of the admin ZIP. This update recreates the listing layout and typography in React/CSS and uses a farmland photo fallback. To use your exact original logo, favicon and page-title background, copy the original website's `assets/img/` files into `frontend/public/assets/img/` (logo.png, favicon.png, page-title-bg.jpg, img_long_5.jpg). The logo will fall back to text if no logo file is present.

### Local run

Terminal 1:
```bash
cd backend
npm install
cp .env.example .env
npm run seed:admin
npm run dev
```

Terminal 2:
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:5173` for admin and `http://localhost:5173/properties` for the public property listing.


## Public website pages

- Home page: `http://localhost:5173/`
- Dynamic property listings: `http://localhost:5173/properties`
- Admin panel: `http://localhost:5173/admin`

The home page follows the supplied AgriCulture-style design: rotating five-slide hero, eight service cards, company/about section, managing director panel, and WhatsApp call-to-action. Copy your original template images into `frontend/public/assets/img/` (including `hero_1.jpg` through `hero_5.jpg`, `logo.png`, and `img_long_5.png`) to use the same images as your HTML website.
