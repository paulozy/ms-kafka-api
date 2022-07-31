import express, { Response } from "express";
import "reflect-metadata";
import { routes } from "./routes";

import "./shared/container";

const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (_, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(process.env.PORT || 3333, () =>
  console.log(`Server is running on port ${process.env.PORT || 3333}`)
);
