import EventModel from "../model/event_model.js";
import {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  joinEventService,
  searchEvents,
} from "../service/event_service.js";

//   to create a new event
export const createEventController = async (req, res) => {
  try {
    const newEvent = await createEvent(req.body);
    res.status(201).json(newEvent);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

//   to get all events
// export const getAllEventsController = async (req, res) => {
//   try {
//     const events = await getAllEvents();
//     res.status(200).json(events);
//   } catch (error) {
//     res.status(500).json({ message: "Server Error: " + error.message });
//   }
// };
export const getAllEventsController = async (req, res) => {
  try {
    const events = await getAllEvents();
    res.status(200).json(events);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// Controller for searching events
export const searchEventsController = async (req, res) => {
  try {
    const { searchTerm } = req.query;
    console.log("Received search term:", searchTerm);

    if (!searchTerm) {
      return res.status(400).json({ message: "Search term is required" });
    }

    const events = await EventModel.find({
      $text: { $search: searchTerm },
    });

    res.status(200).json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


//   to get an event by ID
export const getEventByIdController = async (req, res) => {
  try {
    const event = await getEventById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(event);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

//   to update an event
export const updateEventController = async (req, res) => {
  try {
    const updatedEvent = await updateEvent(req.params.id, req.body);
    if (!updatedEvent) {
      return res.status(404).json({ message: "Event not found" });
    }
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

//   to delete an event
export const deleteEventController = async (req, res) => {
  try {
    const result = await deleteEvent(req.params.id);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};

// Join event controller
export const joinEventController = async (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id; // Assuming user ID is available from authentication middleware

  try {
    const updatedEvent = await joinEventService(eventId, userId);
    res.status(200).json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Server Error: " + error.message });
  }
};
