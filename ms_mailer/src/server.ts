import express, { Response } from "express";

const app = express();

app.use(express.json());

app.get("/", (_, res: Response) => {
  res.json({ message: "Hello World" });
});

app.listen(process.env.PORT || 3030, () =>
  console.log(`Server is running on port ${process.env.PORT || 3030}`)
);
