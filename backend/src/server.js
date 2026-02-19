import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { connectDB } from "./config/db.js";
import notesRoutes from "./routes/notes-routes.js";
import rateLimiter from "./middlewares/rateLimiter.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

// Middleware:
app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.json()); // this middleware will parse JSON body.
app.use(rateLimiter);

// simple use of middleware:
// it is a function between request and response.
// app.use((req, res, next) => {
//     console.log(req.url);
//     next();
// })

// Routes:
app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:3000`);
  });
});
