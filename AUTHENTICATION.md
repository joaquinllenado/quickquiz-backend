# Authentication System Documentation

## Overview

The QuickQuiz backend supports two authentication methods:
1. **OTP (One-Time Password) via Resend** - Passwordless email authentication
2. **Google OAuth** - Social login with Google

## Authentication Flow

### OTP Authentication (Resend)

#### Signup Flow
1. User submits email to `/auth/signup`
2. System validates email and checks if user exists
3. If user doesn't exist, Auth.js sends verification email via Resend
4. User clicks link in email to verify and create account
5. User is automatically logged in

#### Login Flow
1. User submits email to `/auth/login`
2. System validates email and checks if user exists
3. If user exists, Auth.js sends verification email via Resend
4. User clicks link in email to log in
5. User is automatically logged in

### Google OAuth

#### Authentication Flow
1. User visits `/auth/signin/google` (handled by Auth.js)
2. User is redirected to Google for authentication
3. Google redirects back with authorization code
4. Auth.js exchanges code for user info and creates/updates user
5. User is automatically logged in

## API Endpoints

### OTP Endpoints

#### POST `/auth/signup`
Initiates OTP signup process.

**Request Body:**
```json
{
  "email": "user@example.com",
  "name": "John Doe" // optional
}
```

**Response:**
```json
{
  "message": "Verification email sent. Please check your inbox.",
  "email": "user@example.com"
}
```

#### POST `/auth/login`
Initiates OTP login process.

**Request Body:**
```json
{
  "email": "user@example.com"
}
```

**Response:**
```json
{
  "message": "Login email sent. Please check your inbox.",
  "email": "user@example.com"
}
```

### Session Management

#### GET `/auth/me`
Get current user session (requires authentication).

**Headers:**
```
Authorization: Bearer <session-token>
```

**Response:**
```json
{
  "user": {
    "id": "user-uuid",
    "email": "user@example.com",
    "name": "John Doe"
  }
}
```

#### POST `/auth/logout`
Logout current user (requires authentication).

**Response:**
```json
{
  "message": "Logged out successfully"
}
```

### OAuth Endpoints (Handled by Auth.js)

- `GET /auth/signin/google` - Initiate Google OAuth
- `GET /auth/callback/google` - Google OAuth callback
- `GET /auth/signout` - Logout (handled by Auth.js)

## Environment Variables

Add these to your `.env` file:

```env
# Auth.js Configuration
AUTH_SECRET=your-super-secret-key-here
AUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Resend (for OTP emails)
RESEND_API_KEY=your-resend-api-key

# CORS
CORS_ORIGIN=http://localhost:3000
```

## Frontend Integration

### OTP Authentication

```javascript
// Signup
const signup = async (email, name) => {
  const response = await fetch('/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, name })
  });
  return response.json();
};

// Login
const login = async (email) => {
  const response = await fetch('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email })
  });
  return response.json();
};
```

### Google OAuth

```javascript
// Redirect to Google OAuth
const googleLogin = () => {
  window.location.href = '/auth/signin/google';
};
```

### Session Management

```javascript
// Get current user
const getCurrentUser = async () => {
  const response = await fetch('/auth/me', {
    credentials: 'include' // Important for cookies
  });
  return response.json();
};

// Logout
const logout = async () => {
  const response = await fetch('/auth/logout', {
    method: 'POST',
    credentials: 'include'
  });
  return response.json();
};
```

## Security Features

1. **Session Management**: Secure session tokens stored in database
2. **CORS Protection**: Configured for specific origins
3. **Input Validation**: Zod schemas validate all inputs
4. **Error Handling**: Centralized error handling with proper status codes
5. **HTTPS Ready**: Configured for secure cookie handling

## Database Schema

The authentication system uses these Prisma models:

- `User` - User accounts
- `Account` - OAuth provider accounts
- `UserSession` - Active user sessions
- `VerificationToken` - Email verification tokens

## Middleware

### `requireAuth`
Protects routes that require authentication.

```javascript
router.get('/protected', requireAuth, (req, res) => {
  // req.user is available here
});
```

### `optionalAuth`
Adds user info to request if authenticated, but doesn't require it.

```javascript
router.get('/public', optionalAuth, (req, res) => {
  // req.user might be available here
});
```

## Error Handling

All authentication endpoints return consistent error responses:

```json
{
  "error": "Error message",
  "details": [] // For validation errors
}
```

Common error status codes:
- `400` - Bad request (validation errors)
- `401` - Unauthorized (authentication required)
- `404` - User not found
- `500` - Internal server error 