import express from "express";
import { auth } from "../lib/auth";
import { prisma } from "../lib/prisma";
import { z } from "zod";
import { requireAuth } from "../middleware/auth";

const router = express.Router();

const signupSchema = z.object({
  email: z.string().email("Invalid email address"),
  name: z.string().optional(),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
});

// OTP Signup - Initiates email verification
router.post("/signup", async (req, res) => {
  try {
    const { email, name } = signupSchema.parse(req.body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({
        error: "User with this email already exists",
      });
    }

    // Auth.js will handle the OTP sending automatically
    // This endpoint just validates the input and checks for existing users
    res.status(200).json({
      message: "Verification email sent. Please check your inbox.",
      email,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid input",
        details: error.errors,
      });
    }
    
    console.error("Signup error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// OTP Login - Initiates email verification for existing users
router.post("/login", async (req, res) => {
  try {
    const { email } = loginSchema.parse(req.body);

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({
        error: "User not found. Please sign up first.",
      });
    }

    // Auth.js will handle the OTP sending automatically
    res.status(200).json({
      message: "Login email sent. Please check your inbox.",
      email,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        error: "Invalid input",
        details: error.errors,
      });
    }
    
    console.error("Login error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Get current user session
router.get("/me", requireAuth, async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Logout
router.post("/logout", requireAuth, async (req, res) => {
  try {
    // Auth.js will handle the logout automatically
    res.status(200).json({
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
});

// Mount Auth.js on /auth/* routes for OAuth flows (Google, etc.)
router.use("/*", auth);

export default router;