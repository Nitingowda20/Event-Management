import { Schema, model } from "mongoose";

const eventSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  organizer: {
    type: String,
    required: true,
  },
  attendees: {
    type: Number,
    default: 0,
  },
  maxAttendees: {
    type: Number,
  },
  image: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const EventModel = model("EventDesc", eventSchema);

export default EventModel;
