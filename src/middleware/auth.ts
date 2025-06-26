import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name?: string;
      };
    }
  }
}

export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // Get the session token from cookies or headers
    const sessionToken = req.cookies?.['next-auth.session-token'] || 
                        req.headers.authorization?.replace('Bearer ', '');

    if (!sessionToken) {
      return res.status(401).json({
        error: "Authentication required",
      });
    }

    // Find the session in the database
    const session = await prisma.userSession.findUnique({
      where: { sessionToken },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });

    if (!session || session.expires < new Date()) {
      return res.status(401).json({
        error: "Invalid or expired session",
      });
    }

    req.user = {
      id: session.user.id,
      email: session.user.email,
      name: session.user.name || undefined,
    };
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
}

export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const sessionToken = req.cookies?.['next-auth.session-token'] || 
                        req.headers.authorization?.replace('Bearer ', '');

    if (sessionToken) {
      const session = await prisma.userSession.findUnique({
        where: { sessionToken },
        include: {
          user: {
            select: {
              id: true,
              email: true,
              name: true,
            },
          },
        },
      });

      if (session && session.expires > new Date()) {
        req.user = {
          id: session.user.id,
          email: session.user.email,
          name: session.user.name || undefined,
        };
      }
    }

    next();
  } catch (error) {
    // Don't fail the request for optional auth
    next();
  }
} 