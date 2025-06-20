# QuickQuiz Backend

A robust Node.js + TypeScript backend API for QuickQuiz, an AI-powered flashcard generator that transforms content into interactive quiz questions using OpenAI's GPT models.

## 🎯 Project Overview

QuickQuiz Backend provides a RESTful API that enables users to:
- Generate quiz questions from pasted content using OpenAI's GPT models
- Save and manage flashcards with spaced repetition algorithms
- Authenticate users securely with JWT tokens
- Validate data with Zod schemas
- Manage user progress and learning analytics
- **Store and manage quiz data with Prisma ORM and PostgreSQL**

## ✨ Features

- **Express.js API** - Fast, unopinionated web framework
- **TypeScript** - Type-safe development with enhanced IDE support
- **Prisma ORM** - Type-safe database access with auto-generated client
- **PostgreSQL Database** - Robust relational database for data persistence
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
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **CORS**: cors middleware
- **Environment**: dotenv
- **Package Manager**: pnpm
- **Development**: ts-node-dev

## 🗄️ Database Schema

The application uses Prisma ORM with PostgreSQL and includes the following models:

### User Model
- `id` (UUID) - Primary key
- `email` (String) - Unique user email
- `createdAt` (DateTime) - Account creation timestamp
- `quizzes` (Relation) - User's created quizzes

### Quiz Model
- `id` (UUID) - Primary key
- `title` (String) - Quiz title
- `source` (String) - Source content for quiz generation
- `createdAt` (DateTime) - Creation timestamp
- `updatedAt` (DateTime) - Last update timestamp
- `userId` (String) - Foreign key to User
- `questions` (Relation) - Quiz questions
- `sessions` (Relation) - Quiz sessions

### Question Model
- `id` (UUID) - Primary key
- `title` (String) - Question text
- `type` (String) - Question type (multiple choice, true/false, etc.)
- `options` (String[]) - Array of answer options
- `answer` (String) - Correct answer
- `quizId` (String) - Foreign key to Quiz
- `answers` (Relation) - User answers for this question

### Session Model
- `id` (UUID) - Primary key
- `createdAt` (DateTime) - Session start timestamp
- `updatedAt` (DateTime) - Session end timestamp
- `quizId` (String) - Foreign key to Quiz
- `score` (Int) - User's score
- `total` (Int) - Total possible score
- `answers` (Relation) - Session answers

### Answer Model
- `id` (UUID) - Primary key
- `sessionId` (String) - Foreign key to Session
- `questionId` (String) - Foreign key to Question
- `answer` (String) - User's answer
- `isCorrect` (Boolean) - Whether answer is correct

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (v10.11.1 or higher)
- PostgreSQL database
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

5. **Set up the database**
   ```bash
   # Generate Prisma client
   pnpm prisma generate
   
   # Run database migrations
   pnpm prisma migrate dev
   ```

6. **Start the development server**
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

# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/quickquiz_db"

# OpenAI Configuration (for future AI features)
OPENAI_API_KEY=your_openai_api_key_here

# JWT Configuration (for future auth features)
JWT_SECRET=your_jwt_secret_here
JWT_EXPIRES_IN=7d

# CORS Configuration
CORS_ORIGIN=http://localhost:3000
```

### Environment Variables Explained

- `PORT`: The port number the server runs on (default: 3000)
- `NODE_ENV`: Environment mode (development/production)
- `DATABASE_URL`: PostgreSQL connection string
- `OPENAI_API_KEY`: Your OpenAI API key for AI-powered features
- `JWT_SECRET`: Secret key for JWT token signing
- `JWT_EXPIRES_IN`: JWT token expiration time
- `CORS_ORIGIN`: Allowed origin for CORS requests

## 🗄️ Database Management

### Prisma Commands

```bash
# Generate Prisma client (after schema changes)
pnpm prisma generate

# Create a new migration
pnpm prisma migrate dev --name migration_name

# Apply migrations to production
pnpm prisma migrate deploy

# Reset database (development only)
pnpm prisma migrate reset

# Open Prisma Studio (database GUI)
pnpm prisma studio

# Push schema changes without migrations (development only)
pnpm prisma db push
```

### Database Setup

1. **Create PostgreSQL database**
   ```sql
   CREATE DATABASE quickquiz_db;
   ```

2. **Run migrations**
   ```bash
   pnpm prisma migrate dev
   ```

3. **Verify setup**
   ```bash
   pnpm prisma studio
   ```

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
- `pnpm prisma:generate` - Generate Prisma client
- `pnpm prisma:migrate` - Run database migrations
- `pnpm prisma:studio` - Open Prisma Studio

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
├── prisma/
│   ├── schema.prisma       # Database schema definition
│   ├── migration_lock.toml # Migration lock file
│   └── migrations/         # Database migration files
│       └── 20250619215822_init/
│           └── migration.sql
├── generated/              # Generated Prisma client (gitignored)
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
- **`prisma/schema.prisma`** - Database schema definition
- **`prisma/migrations/`** - Database migration files
- **`generated/`** - Auto-generated Prisma client (excluded from git)

## 🚀 Deployment

### Render

1. **Connect your repository** to Render
2. **Create a new Web Service**
3. **Configure build settings**:
   - Build Command: `pnpm install && pnpm prisma generate && pnpm build`
   - Start Command: `pnpm prisma migrate deploy && pnpm start`
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
DATABASE_URL=your_production_postgresql_url
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
- `POST /session/start` - Start quiz session
- `POST /session/:id/answer` - Submit answer
- `GET /session/:id/result` - Get session results

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Run `pnpm prisma generate` after schema changes
- Create migrations for database changes: `pnpm prisma migrate dev --name description`
- Use Prisma Studio for database inspection: `pnpm prisma studio`

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email joaquinllenado@gmail.com or create an issue in this repository.

---

**Built with ❤️ for better learning experiences**
