import express, { Request, Response } from "express";

export const healthRouter = express.Router();

healthRouter.get("/", (_req: Request, res: Response) => {
  res.status(200).json({ status: "ok", message: "Server is healthy." });
});
