import express from "express";
import dotenv from "dotenv";
import { DATABASE } from "./functions/database.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//app delecration
const app = express();

//dotenv configuration
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.resolve(__dirname, "client", "dist")));

// Serve images from public/images directory
app.use("/images", express.static(path.join(__dirname, "uploads/images")));
app.use("/videos", express.static(path.join(__dirname, "uploads/videos")));
//routes
app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/post", postRoutes);

//homepage
app.get("/", (req, res) => {
  res.send("hey this is social media running from backend");
});

// Handle all other routes by serving the React app
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
});

//PORT
const port = process.env.PORT || 8000;

app.listen(port, () => {
  DATABASE();
  console.log(`server running at port: ${port}`);
});
