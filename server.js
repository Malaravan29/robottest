import express from 'express';
import dotenv from 'dotenv';
import connectDB from './src/DB/db.js';
import cors from 'cors';

import { verifyToken } from './src/Middleware/authMiddleware.js'; 

import authRoutes from './src/Routes/authRoutes.js';
import robotRoutes from './src/Routes/robotRoutes.js';
import profileRoutes from './src/Routes/profileRoutes.js';
import robotmsgRoutes from "./src/Routes/robotmsgRoutes.js"
import Appdetails from "./src/Routes/Appcontroller.js.js";
import robotanalytics from "./src/Routes/RobotAnalytics.js"
import Mappost from "./src/Routes/mappost.js"
import FIVEMODE from "./src/Routes/MODE5-SINGLE-ROUTES.js"
import AdminRouteUser from "./src/Routes/AdminRouteUser.js"

import bodyParser from "body-parser";

dotenv.config();

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.use(verifyToken); // Ensure token verification middleware is used correctly

//Routes

app.use('/', authRoutes);
app.use('/', robotRoutes);
app.use('/', profileRoutes);
app.use('/', robotmsgRoutes);
app.use('/', Appdetails);
app.use('/', robotanalytics);
app.use('/', Mappost);
app.use('/modes', FIVEMODE);
app.use('/', AdminRouteUser);



app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
