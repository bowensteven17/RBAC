# RBAC (Role-Based Access Control) Application

A full-stack web application implementing Role-Based Access Control (RBAC) with a React frontend and Node.js/Express backend.

## Features

- **User Authentication**: Secure login and registration system
- **Role-Based Access Control**: Granular permissions system with feature and sub-feature level access
- **Dynamic Navigation**: Sidebar that adapts based on user permissions
- **Protected Routes**: Client-side route protection based on user roles
- **Admin Dashboard**: Role and permission management interface
- **Modern UI**: Clean, responsive design with FontAwesome icons

## Tech Stack

### Frontend
- **React 19.1.0** - UI library
- **React Router DOM 7.6.3** - Client-side routing
- **FontAwesome** - Icons
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express 4.21.2** - Web framework
- **MongoDB** - Database
- **Mongoose 7.8.7** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## Project Structure

```
RBAC/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── context/        # Context providers
│   │   ├── hooks/          # Custom hooks
│   │   ├── pages/          # Page components
│   │   ├── services/       # API services
│   │   ├── styles/         # CSS files
│   │   └── utils/          # Utility functions
│   └── public/            # Static assets
├── server/                # Node.js backend
│   ├── config/            # Configuration files
│   ├── middleware/        # Express middleware
│   ├── models/            # Database models
│   ├── routes/            # API routes
│   ├── seeds/             # Database seeding
│   └── utils/             # Server utilities
└── README.md
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd RBAC
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/rbac
   JWT_SECRET=your-jwt-secret-key
   NODE_ENV=development
   ```

5. **Seed the database**
   ```bash
   cd server
   npm run seed
   ```

### Running the Application

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   Server will run on http://localhost:5000

2. **Start the frontend client**
   ```bash
   cd client
   npm start
   ```
   Client will run on http://localhost:3000

## Available Scripts

### Server Scripts
- `npm start` - Start production server
- `npm run dev` - Start development server with nodemon
- `npm run seed` - Seed database with initial data
- `npm run seed:fresh` - Fresh database seeding
- `npm run db:check` - Check database connection

### Client Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

## RBAC System Overview

The application implements a hierarchical permission system:

### Features
- **home** - Dashboard and main navigation
- **discover** - Content discovery functionality
- **conversational** - Chat and messaging features
- **visualize** - Charts, reports, and analytics
- **config** - System configuration
- **users** - User management
- **admin** - Administrative functions
- **settings** - User preferences and system settings

### Sub-features
Each feature can have multiple sub-features for granular control:
- `admin.roles` - Role management
- `admin.users` - User administration
- `users.add-user` - Add new users
- `visualize.analytics` - Analytics dashboard
- And many more...

## API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout

### RBAC Management
- `GET /api/rbac/roles` - Get all roles
- `POST /api/rbac/roles` - Create new role
- `PUT /api/rbac/roles/:id` - Update role
- `DELETE /api/rbac/roles/:id` - Delete role
- `GET /api/rbac/permissions` - Get user permissions

## Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- CORS protection
- Helmet security headers
- Protected routes and middleware
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

