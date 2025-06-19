# QuickQuiz Backend

A robust Node.js + TypeScript backend API for QuickQuiz, an AI-powered flashcard generator that transforms content into interactive quiz questions using OpenAI's GPT models.

## 🎯 Project Overview

QuickQuiz Backend provides a RESTful API that enables users to:
- Generate quiz questions from pasted content using OpenAI's GPT models
- Save and manage flashcards with spaced repetition algorithms
- Authenticate users securely with JWT tokens
- Validate data with Zod schemas
- Manage user progress and learning analytics

## ✨ Features

- **Express.js API** - Fast, unopinionated web framework
- **TypeScript** - Type-safe development with enhanced IDE support
- **Zod Validation** - Runtime type checking and data validation
- **CORS Support** - Cross-origin resource sharing enabled
- **Error Handling** - Centralized error handling middleware
- **Health Checks** - API health monitoring endpoints
- **Environment Configuration** - Secure environment variable management
- **Development Hot Reload** - Automatic server restart on file changes

## 🛠 Tech Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Validation**: Zod
- **CORS**: cors middleware
- **Environment**: dotenv
- **Package Manager**: pnpm
- **Development**: ts-node-dev

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v10.11.1 or higher)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/quickquiz-backend.git
   cd quickquiz-backend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```

4. **Configure your environment variables** (see Environment Configuration below)

5. **Start the development server**
   ```bash
   pnpm dev
   ```

The server will start on `http://localhost:3000`

## ⚙️ Environment Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# OpenAI Configuration (for future AI features)
OPENAI_API_KEY=your_openai_api_key_here

# JWT Configuration (for future auth features)
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# Database Configuration (for future database features)
DATABASE_URL=your_database_url_here

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Environment Variables Explained

- `PORT`: The port number the server runs on (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `OPENAI_API_KEY`: Your OpenAI API key for AI-powered features
- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRES_IN`: JWT token expiration time
- `DATABASE_URL`: Database connection string (for future implementation)
- `CORS_ORIGIN`: Allowed origin for CORS requests

## 🏃‍♂️ Running in Development

### Development Mode
```bash
pnpm dev
```
- Starts the server with hot reload
- Automatically restarts on file changes
- Uses ts-node-dev for TypeScript compilation

### Production Build
```bash
# Build the project
pnpm build

# Start production server
pnpm start
```

### Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build the project for production
- `pnpm start` - Start production server
- `pnpm test` - Run tests (Jest)

## 📁 Folder Structure

```
quickquiz-backend/
├── src/
│   ├── app.ts              # Express app configuration
│   ├── server.ts           # Server entry point
│   ├── middleware/
│   │   └── errorHandler.ts # Global error handling
│   └── routes/
│       └── health.route.ts # Health check endpoints
├── package.json
├── tsconfig.json
├── .env.example
└── README.md
```

### Structure Overview

- **`src/app.ts`** - Main Express application setup with middleware
- **`src/server.ts`** - Server initialization and port configuration
- **`src/middleware/`** - Custom middleware functions
- **`src/routes/`** - API route handlers and controllers
- **`src/`** - Future directories for services, models, and utilities

## 🚀 Deployment

### Render

1. **Connect your repository** to Render
2. **Create a new Web Service**
3. **Configure build settings**:
   - Build Command: `pnpm install && pnpm build`
   - Start Command: `pnpm start`
4. **Set environment variables** in Render dashboard
5. **Deploy**

### Railway

1. **Connect your repository** to Railway
2. **Create a new service**
3. **Configure environment variables**
4. **Deploy automatically** on push to main branch

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
NODE_ENV=production
PORT=3000
OPENAI_API_KEY=your_production_openai_key
JWT_SECRET=your_production_jwt_secret
CORS_ORIGIN=https://your-frontend-domain.com
```

## 🔧 API Endpoints

### Health Check
- `GET /health` - Server health status

### Future Endpoints (Planned)
- `POST /auth/register` - User registration
- `POST /auth/login` - User authentication
- `POST /quiz/generate` - Generate quiz questions
- `GET /quiz/:id` - Get specific quiz
- `PUT /quiz/:id` - Update quiz
- `DELETE /quiz/:id` - Delete quiz
- `GET /user/progress` - Get user learning progress

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email joaquinllenado@gmail.com or create an issue in this repository.

---

**Built with ❤️ for better learning experiences**
