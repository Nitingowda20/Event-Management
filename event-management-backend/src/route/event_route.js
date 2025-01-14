import express from "express";
import {
  createEventController,
  deleteEventController,
  getAllEventsController,
  getEventByIdController,
  updateEventController,
} from "../controller/event_controller.js";

const router = express.Router();

//   to create a new event
router.post("/create", createEventController);

//   to get all events
router.get("/getallevent", getAllEventsController);

//   to get an event by ID
router.get("/:id", getEventByIdController);

//   to update an event
router.put("/:id", updateEventController);

//   to delete an event
router.delete("/:id", deleteEventController);

export default router;
