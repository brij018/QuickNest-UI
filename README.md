# QuickNest Frontend

A modern, premium SaaS frontend for the QuickNest service booking platform. Built with React 19, Vite, Tailwind CSS, and Framer Motion.

## Tech Stack

- React 19 + React DOM 19
- Vite 6
- React Router DOM 7
- Tailwind CSS 3.4
- Axios
- React Hook Form
- Context API (Auth, Theme, Toast)
- React Icons
- Framer Motion
- clsx + tailwind-merge

## Prerequisites

- Node.js 18+ and npm
- Backend API running (the existing QuickNest Node/Express/MongoDB backend)

## Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:5000/api
```

Or if your backend runs on a different port/domain, adjust accordingly.

## Installation & Running

```bash
# 1. Navigate to project
cd quicknest-frontend

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

This creates a `dist/` folder ready for deployment.

## Project Structure

```
src/
├── api/           # API clients (axios instance + endpoint modules)
├── components/
│   ├── layout/    # AppShell, Sidebar, Topbar, ThemeToggle
│   └── ui/        # Reusable UI components (Button, Card, Dialog, etc.)
├── context/       # React Context providers (Auth, Theme, Toast)
├── hooks/         # Custom hooks (useAuth, useTheme, useToast)
├── lib/           # Utilities (cn, formatters, status colors)
├── pages/
│   ├── auth/      # Login, Register, ForgotPassword
│   ├── public/    # Home, NotFound
│   ├── customer/  # Dashboard, Browse, Bookings, etc.
│   ├── provider/  # Dashboard, Services, Bookings, etc.
│   ├── admin/     # Dashboard, Users, Providers, etc.
│   └── shared/    # Profile
├── routes/        # ProtectedRoute component
├── App.jsx        # Main routing
└── main.jsx       # Entry point
```

## User Roles & Routes

| Role | Dashboard | Key Features |
|------|-----------|-------------|
| Customer (`user`) | `/dashboard` | Browse, Bookings, Favorites, Notifications |
| Provider (`provider`) | `/provider/dashboard` | Services, Bookings, Availability, Earnings, Reviews |
| Admin/Super Admin | `/admin/dashboard` | Users, Providers, Categories, Services, Bookings, Reviews, Settings |

## Backend API Notes

This frontend is built against the existing QuickNest backend API. Key endpoints wired:

- **Auth**: `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/profile`, `/auth/change-password`
- **Customer**: `/user/dashboard`, `/user/services`, `/user/bookings`, `/user/favorites`, `/user/notifications`
- **Provider**: `/provider/dashboard`, `/provider/services`, `/provider/bookings`, `/provider/availability`, `/provider/earnings`, `/provider/reviews`
- **Admin**: `/admin/dashboard`, `/admin/getAllUsers`, `/admin/getAllProviders`, `/admin/getAllCategories`, `/admin/getAllServices`, `/admin/getAllBookings`, `/admin/getAllReviews`, `/admin/settings`

### Known Backend Gaps

1. **No public browse endpoints**: The existing backend has admin-only category/service listing. Customer/public users may get 403 until you add public GET routes.
2. **No forgot/reset password API**: The forgot password page shows an informational message instead of a broken form.
3. **No notification data model**: The notifications page shows an honest empty state.

## Features

- ✅ Dark/Light theme toggle with system preference detection
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Role-based routing and access control
- ✅ Toast notifications
- ✅ Loading skeletons and empty states
- ✅ Confirmation dialogs
- ✅ Form validation with React Hook Form
- ✅ Reusable component architecture
- ✅ Minimal Framer Motion animations
- ✅ Modern premium SaaS aesthetic

## License

Private - for QuickNest project use.
