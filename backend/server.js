import express from 'express';
import { config } from 'dotenv';
import morgan from 'morgan';
import cors from "cors";
import cookieParser from 'cookie-parser';
config();

import authRoutes from './routes/authRoutes.js';
import { connect } from './config/dbConfig.js';
import errorHandler from './middlewares/errorHanderMiddleware.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "http://localhost:5173",
    credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use("/api/users",authRoutes)


app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    connect(process.env.MONGO_URL)
});

