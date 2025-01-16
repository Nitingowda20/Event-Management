import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import user_route from "./route/user_route.js";
import event_route from "./route/event_route.js";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import EventModel from "./model/event_model.js";

dotenv.config();
const DB_URI = process.env.MONGO_URI;
const port = process.env.PORT || 1234;

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Allow frontend origin
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(express.json());
app.use(cors({ origin: "http://localhost:5173", credentials: true }));

let eventAttendees = {};

// Listen for client connections
io.on("connection", (socket) => {
  console.log("A user connected");

  // Emit an event to the client when they join an event
  socket.on("joinEvent", (eventId) => {
    console.log(`User joined event: ${eventId}`);
    socket.join(eventId); // Join a specific room for the event

    // Notify other users in the event room about the new join
    io.to(eventId).emit("newAttendee", "A new attendee has joined!");
  });

  // Handle other events

  // Listen for client disconnect
  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

const updateAttendeeCount = async (eventId) => {
  try {
    // Find the event by ID
    const event = await EventModel.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }

    // Check if there is space available for more attendees
    if (event.attendees >= event.maxAttendees) {
      throw new Error("Event is already full");
    }

    // Increment the attendee count
    event.attendees += 1;

    // Save the updated event
    await event.save();

    return event;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Route to handle joining an event and updating attendee count
app.post("/api/events/:eventId/join", async (req, res) => {
  const eventId = req.params.eventId;

  // Assume you have a function `updateAttendeeCount` to increment the attendee count in your database
  const updatedEvent = await updateAttendeeCount(eventId);

  // Broadcast the updated attendee count to all clients in the event room
  io.to(eventId).emit("attendeeUpdated", updatedEvent.attendees);

  res.status(200).json(updatedEvent); // Return updated event data
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
