import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user_route from "./route/user_route.js";
import event_route from "./route/event_route.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

dotenv.config();
const DB_URI = process.env.MONGO_URI;
const port = process.env.PORT || 1234;

const app = express();
const server = http.createServer(app);
const io = new Server(server); // Create socket.io server using the http server

app.use(express.json());
app.use(cors());

let eventAttendees = {};

// Emit the initial number of attendees when someone joins the event
io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinEvent", async (eventId) => {
    // Get the initial number of attendees from the database
    const event = await EventModel.findById(eventId);
    eventAttendees[eventId] = event.attendees || 0;

    socket.emit("updateAttendees", eventAttendees[eventId]);
  });

  // Listen for event updates, like new attendee
  socket.on("attendeeJoined", (eventId) => {
    eventAttendees[eventId] = (eventAttendees[eventId] || 0) + 1;
    io.emit("updateAttendees", eventAttendees[eventId]); // Emit updated attendees count to all connected clients
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

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

// Start the server with http server (not app.listen)
server.listen(port, () => {
  console.log(`Server is running on ${port}`);
});
