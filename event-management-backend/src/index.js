import express from "express";
import mongoose from "mongoose"
import dotenv from "dotenv";
import user_route from "./route/user_route.js"
import event_route from "./route/event_route.js";

import cors from "cors";

dotenv.config();
const DB_URI = process.env.MONGO_URI;
const port = process.env.PORT || 1234;

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(DB_URI)
  .then(() => {
    console.log("Connected to MongoDB!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

// Routes
app.use("/api/users", user_route);
app.use("/api/events", event_route);


app.get("/", (req, res) => {
  res.send("Hello Event-Management-Bakend !!!");
});

app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
