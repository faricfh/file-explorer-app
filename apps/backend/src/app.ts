import express, { type Express, type Request, type Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import folderRoutes from "@/routes/folder.route";
import { errorHandler } from "@/middleware/error.middleware";
import { notFound } from "@/middleware/not-found.middleware";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req: Request, res: Response) =>
  res.json({ message: "Working" }),
);

app.use("/api", folderRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
