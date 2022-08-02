import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import "reflect-metadata";
import { AppError } from "./errors/AppError";
import { routes } from "./routes";
import { newPost } from "./services/kafka";
import { initKafka } from "./services/kafka/config";

import "./shared/container";

const app = express();

app.use(express.json());
app.use(routes);

initKafka([newPost]);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: `Internal server error ${err.message}`,
  });
});

app.listen(process.env.PORT || 3333, () =>
  console.log(`Server is running on port ${process.env.PORT || 3333}`)
);
