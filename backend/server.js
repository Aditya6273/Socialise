import express from "express";
import { config } from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import path from "path";
import fs from "fs";
config();

import authRoutes from "./routes/authRoutes.js";
import { connect } from "./config/dbConfig.js";
import errorHandler from "./middlewares/errorHanderMiddleware.js";

const app = express();
const PORT = process.env.PORT || 3000;
const __dirname = path.resolve();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(express.static("public"));
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: path.join(__dirname, "tmp"), // Use the correct path here
    createParentPath: true,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max file size
  })
);

app.use("/api/users", authRoutes);

setTimeout(() => {
  //delete file from tmp folder
  fs.unlinkSync(path.join(__dirname, "tmp", "file.txt"));
}, 24 * 60 * 60 * 1000);

app.use(errorHandler);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connect(process.env.MONGO_URL);
});
