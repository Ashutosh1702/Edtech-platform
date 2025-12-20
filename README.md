# EdTech Platform (MERN + Vite)

An EdTech web app with a React (Vite) frontend and an Express/MongoDB backend. Users can browse courses, view course details and syllabus, register/login, and enroll via a checkout flow (including PayPal redirect-based checkout).

> Note: The frontend folder is named `frontned/` (typo preserved in repo).

## Tech Stack

- **Frontend:** React (Vite), React Router, TailwindCSS, Framer Motion, Axios
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, PayPal Checkout SDK

## Key Features

- Course catalog (API-driven)
- Course detail pages + syllabus page
- Authentication (register/login) with JWT stored in `localStorage`
- Checkout page:
  - Demo payments (UPI/Card simulated)
  - PayPal checkout (create order → redirect to PayPal → capture → redirect back)
- Interactive UI improvements:
  - Search/filter/sort on course list
  - Testimonials carousel (animated + auto-rotate)
  - Wishlist toggle on course cards (saved locally)
  - Newsletter lead capture in footer (saved locally)

## Project Structure

```
EdTech-Platform/
  backend/        # Express API + MongoDB + PayPal
  frontned/       # React (Vite) app
```

### Backend Folder Structure (`backend/`)

```
backend/
  src/
    app.js                    # Express app wiring (middlewares, routes, errors)
    server.js                 # Bootstraps server + DB connect
    config/
      db.js                   # MongoDB connection
      paypal.js               # PayPal SDK client setup (sandbox/live)
    controllers/
      authController.js       # Register/login logic
      categoryController.js   # Category CRUD
      courseController.js     # Course endpoints + seeding helper
      orderController.js      # PayPal order create/capture + order retrieval
    middleware/
      authMiddleware.js       # JWT protect/admin helpers
      errorMiddleware.js      # Central error + 404 handlers
    models/
      User.js                 # User schema (auth)
      Category.js             # Category schema
      Course.js               # Course schema
      Order.js                # PayPal order schema (stored as PayPalOrder model)
    routes/
      index.js                # Route aggregator mounted at /api
      authRoutes.js           # /api/auth/*
      categoryRoutes.js       # /api/categories/*
      courseRoutes.js         # /api/courses/*
      orderRoutes.js          # /api/orders/*
    utils/
      generateToken.js        # JWT creation helper
  package.json
```

### Frontend Folder Structure (`frontned/`)

```
frontned/
  src/
    api/
      axiosClient.js          # Axios instance with baseURL + auth header injection
    components/
      Navbar.jsx              # Top nav + auth-aware links
      Hero.jsx                # Landing hero section
      Brands.jsx              # Auto-scrolling brand/logo strip
      CoursesGrid.jsx         # Carousel grid (static courses for landing)
      CourseCard.jsx          # Interactive course card UI (wishlist, hover CTAs)
      Testimonials.jsx        # Animated testimonials carousel
      CTA.jsx                 # Landing call-to-action section
      Footer.jsx              # Footer + instructors + newsletter capture
      CheckoutModal.jsx       # Modal checkout (demo) + local enrollment
      CourseFooter.jsx        # Course detail footer + instructor spotlight
    context/
      AuthContext.js          # Auth context definition + useAuth hook
      AuthProvider.jsx        # AuthProvider (login/logout + persisted user)
      AuthContext.jsx         # Re-export compatibility for older imports
    data/
      courseDetails.js        # Static syllabus/details mapping for some pages
    pages/
      HomePage.jsx            # Home composition (Hero/Brands/CoursesGrid/...)
      CoursesPage.jsx         # API-driven course list + search/filter/sort
      CourseDetailPage.jsx    # Course detail + resolves backend course by slug
      CheckoutPage.jsx        # Checkout tabs (UPI/Card/PayPal)
      PaymentSuccessPage.jsx  # Post-payment summary + next-step actions
      OnlineTestPage.jsx      # Animated practice-test flow
      SyllabusPage.jsx        # Syllabus listing for static courses
      LoginPage.jsx           # Login form
      RegisterPage.jsx        # Register form
    App.jsx                   # Routes + AuthProvider wrapper
    main.jsx                  # Vite entry
    index.css                 # Tailwind styles
  package.json
```

## Setup & Run Locally

### Prerequisites

- Node.js (LTS recommended)
- MongoDB connection string (local or Atlas)
- PayPal sandbox/live credentials (optional unless using PayPal checkout)

### 1) Backend

From `backend/`:

```bash
npm install
npm run dev
```

The API runs on `http://localhost:5000/` by default and is mounted under `http://localhost:5000/api`.

### 2) Frontend

From `frontned/`:

```bash
npm install
npm run dev
```

Frontend runs on Vite dev server (typically `http://localhost:5173`).

## Environment Variables

### Backend (`backend/.env`)

Required for auth + DB:

- `MONGO_URI` (MongoDB connection string)
- `JWT_SECRET` (secret for JWT signing)
- `PORT` (optional, default `5000`)
- `NODE_ENV` (optional, `development` enables request logging)

Required for PayPal checkout:

- `PAYPAL_CLIENT_ID`
- `PAYPAL_CLIENT_SECRET`
- `PAYPAL_MODE` (`sandbox` or `live`)
- `PAYPAL_CURRENCY` (optional, default `USD`)
- `BACKEND_URL` (optional, default `http://localhost:5000`)
- `FRONTEND_URL` (optional, default `http://localhost:3000` in code; set to your Vite URL like `http://localhost:5173`)

### Frontend (`frontned/.env`)

- `VITE_API_BASE_URL` (optional, default `http://localhost:5000/api`)

## API Overview (Backend)

Base: `http://localhost:5000/api`

- `GET /courses` — list courses
- `GET /courses/:id` — get course by MongoDB id (returns the course object)
- `GET /courses/slug/:slug` — get course by slug (returns the course object)
- `POST /courses/add` — add a course (basic payload)
- `POST /courses/seed` — seed sample courses used by the landing page

Orders (JWT required on protected routes):

- `POST /orders/create` — creates a PayPal order for a `courseId` (protected)
- `GET /orders/capture` — PayPal return URL capture endpoint (redirects to frontend on `?redirect=1`)
- `POST /orders/capture` — capture endpoint returning JSON (for API usage)
- `GET /orders/all` — list current user’s orders (protected)
- `GET /orders/:id` — get a single order (protected)

Auth:

- `POST /auth/register`
- `POST /auth/login`

## What Was Done (File-by-File Highlights)

This section focuses on the most important files and the improvements implemented.

## File Responsibilities (Detailed)

This section explains what each major file/folder does so clients and developers can quickly understand the codebase.

### Backend (`backend/src`)

- `app.js`: Creates the Express app, registers middlewares (`cors`, JSON parsers, `morgan` in dev), mounts `/api` routes, and attaches error middleware.
- `server.js`: Loads env, connects DB, and starts the Express server on `PORT`.
- `config/db.js`: Establishes the MongoDB connection via Mongoose.
- `config/paypal.js`: Initializes the PayPal SDK client using env (`sandbox`/`live`) and exports `paypalClient()`.
- `controllers/authController.js`: Handles user registration/login and token issuance.
- `controllers/courseController.js`: Lists courses, fetches course by id/slug, adds new course, and provides a seed endpoint.
- `controllers/orderController.js`: Creates PayPal orders, captures PayPal orders, stores/retrieves order records for the user.
- `middleware/authMiddleware.js`: JWT auth guard (`protect`) and role guard (`admin`).
- `middleware/errorMiddleware.js`: Standard 404 handler + centralized error response formatter.
- `models/User.js`: User schema (auth fields) and model.
- `models/Category.js`: Category schema and model.
- `models/Course.js`: Course schema and model (title/slug/price/etc).
- `models/Order.js`: Order schema to persist PayPal order/capture metadata and payment status.
- `routes/index.js`: Mounts route modules under `/api/*`.
- `routes/authRoutes.js`: Maps `/api/auth/*` endpoints to controller methods.
- `routes/courseRoutes.js`: Maps `/api/courses/*` endpoints; includes `GET /slug/:slug` and `POST /seed`.
- `routes/orderRoutes.js`: Maps `/api/orders/*` endpoints; protects create/list/detail routes while leaving PayPal capture public.
- `utils/generateToken.js`: Helper for signing JWT tokens.

### Frontend (`frontned/src`)

- `App.jsx`: Defines the router and routes and wraps the app in `AuthProvider`.
- `main.jsx`: React/Vite entry; mounts the app to the DOM.
- `api/axiosClient.js`: Axios wrapper; applies base URL and injects `Authorization` header from `localStorage`.
- `context/AuthContext.js`: Defines the AuthContext and exports `useAuth`.
- `context/AuthProvider.jsx`: Stores current user, persists to `localStorage`, provides `login`/`logout`.
- `context/AuthContext.jsx`: Compatibility re-export for older imports.
- `pages/HomePage.jsx`: Composes landing sections: hero, brands, course carousel, testimonials, CTA, footer.
- `pages/CoursesPage.jsx`: Fetches backend courses and provides interactive search/filter/sort UI and loading skeletons.
- `pages/CourseDetailPage.jsx`: Renders detailed course view and starts checkout; resolves backend course by slug if needed.
- `pages/CheckoutPage.jsx`: Checkout tabs; supports simulated payment and PayPal redirect checkout.
- `pages/PaymentSuccessPage.jsx`: Shows payment result and next actions; reads checkout context from `localStorage` for continuity.
- `pages/SyllabusPage.jsx`: Displays syllabus for static courses from `data/courseDetails.js`.
- `pages/OnlineTestPage.jsx`: Interactive practice test intro flow with animations.
- `pages/LoginPage.jsx` / `pages/RegisterPage.jsx`: Auth forms that call backend and then update auth context.
- `components/Navbar.jsx`: Top nav with auth-aware actions and active route styling.
- `components/Hero.jsx`: Landing hero section.
- `components/Brands.jsx`: Auto-scrolling company logos strip (pauses on hover).
- `components/CoursesGrid.jsx`: Landing carousel for featured/static courses.
- `components/CourseCard.jsx`: Interactive course card (hover CTA + wishlist toggle + navigation).
- `components/Testimonials.jsx`: Animated testimonials carousel (auto-rotate + manual controls).
- `components/CTA.jsx`: Conversion-focused call-to-action (links to `/register` and `/courses`).
- `components/Footer.jsx`: Footer links, instructor highlights, and newsletter capture stored locally.
- `components/CheckoutModal.jsx`: Modal-based demo enrollment flow (used in some parts of the UI).
- `components/CourseFooter.jsx`: Course detail footer with instructor spotlight and “what’s included”.
- `data/courseDetails.js`: Static dataset for syllabus/learning outcomes/prerequisites.

### Backend changes

- `backend/src/routes/index.js`
  - Simplified routing so `/api/orders` is mounted without a global `protect` wrapper.
  - This enables PayPal’s return URL to reach `/api/orders/capture` without requiring JWT.
- `backend/src/routes/orderRoutes.js`
  - Split protection by route:
    - `POST /create`, `GET /all`, `GET /:id` are protected
    - `GET /capture` and `POST /capture` are public for PayPal callbacks
- `backend/src/controllers/orderController.js`
  - Added `FRONTEND_URL`, `BACKEND_URL`, and `PAYPAL_CURRENCY` support.
  - `createOrder` now builds dynamic PayPal `return_url` and `cancel_url`.
  - `captureOrder` supports a redirect mode: `GET /capture?redirect=1` captures and then redirects the user to the frontend `/payment-success` page with query params.
  - Returned `localOrderId` from `createOrder` for easier frontend correlation.
- `backend/src/routes/courseRoutes.js`
  - Fixed route ambiguity by moving slug route to `GET /slug/:slug` so it can’t conflict with `/:id`.
- `backend/src/controllers/courseController.js`
  - Adjusted `getSingleCourse` to return the plain course object (not `{ success, course }`) for frontend consistency.

### Frontend changes

- `frontned/src/api/axiosClient.js`
  - Made API base URL configurable via `VITE_API_BASE_URL`.
  - Keeps auto-attaching `Authorization: Bearer <token>` from `localStorage`.
- `frontned/src/pages/CheckoutPage.jsx`
  - Added a PayPal tab and a “Continue to PayPal” flow.
  - Saves lightweight checkout context to `localStorage` before redirecting to PayPal.
- `frontned/src/pages/PaymentSuccessPage.jsx`
  - Reads both simulated payment (`edtech_last_payment`) and PayPal checkout context (`edtech_checkout_context`) for better continuity.
  - Fixed navigation to use `/courses` (not the broken `/course/:1`) and added a “View Syllabus” action.
- `frontned/src/pages/CourseDetailPage.jsx`
  - Resolves backend course by slug using `GET /courses/slug/:slug` when the state payload does not contain a MongoDB `_id`.
  - Made rating display tolerant to missing values and aligned currency formatting.
- `frontned/src/pages/CoursesPage.jsx`
  - Added search, language filtering, sorting, and loading skeletons.
  - Improved card interactivity (“View & Enroll”) and consistent pricing format.
- `frontned/src/components/Testimonials.jsx`
  - Replaced static cards with an animated carousel:
    - Auto-rotates every 5s
    - Pauses on hover
    - Prev/next buttons + dot navigation
- `frontned/src/components/CourseCard.jsx`
  - Added wishlist (♥/♡) persisted to `localStorage` (`edtech_wishlist`).
  - Improved resilience around rating/review/price formatting.
- `frontned/src/components/CTA.jsx`
  - Updated copy and wired CTA links to real routes (`/register`, `/courses`).
- `frontned/src/components/Footer.jsx`
  - Converted key links to SPA navigation (`Link`).
  - Added newsletter capture stored in `localStorage` (`edtech_leads`) with validation feedback.
- `frontned/src/components/Navbar.jsx`
  - Added active route styling using `NavLink`.
- `frontned/src/components/Brands.jsx` and `frontned/src/components/CoursesGrid.jsx`
  - Reduced hook warnings by stabilizing functions with `useCallback` where appropriate.
- `frontned/src/context/AuthProvider.jsx`, `frontned/src/context/AuthContext.js`, `frontned/src/context/AuthContext.jsx`
  - Split auth context and provider:
    - Provider initializes state from `localStorage` without using an effect.
    - `AuthContext.jsx` remains as a compatibility re-export for existing imports.

## Notes / Common Gotchas

- The folder name is `frontned/` (not `frontend/`). All commands should be run in that folder.
- PayPal checkout requires correct URLs:
  - Set `FRONTEND_URL` to your Vite URL (example: `http://localhost:5173`)
  - Set `BACKEND_URL` to your API URL (example: `http://localhost:5000`)
- There is a `POST /api/courses/seed` endpoint to quickly populate course data.

