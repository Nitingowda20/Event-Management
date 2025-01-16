import EventModel from "../model/event_model.js";
import dotenv from "dotenv";
import cloudinary from "cloudinary";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//  to create events
export const createEvent = async (eventData) => {
  try {
    let imageUrl = null;
    if (eventData.image) {
      const uploadResponse = await cloudinary.v2.uploader.upload(
        eventData.image,
        {
          folder: "events", // Optional, specify folder for image storage in Cloudinary
        }
      );
      imageUrl = uploadResponse.secure_url; // Get the secure URL of the uploaded image
    }

    // Save event data to database with Cloudinary image URL (if any)
    const newEvent = new EventModel({
      ...eventData,
      image: imageUrl, // Store the Cloudinary URL
    });

    await newEvent.save();
    return newEvent;
  } catch (error) {
    console.error("Error makaka creating event:", error);
    throw new Error("Error while creating event: " + error.message);
  }
};

//  to get all events
// export const getAllEvents = async () => {
//   try {
//     return await EventModel.find();
//   } catch (error) {
//     throw new Error("Error while fetching events: " + error.message);
//   }
// };
// eventService.js

export const getAllEvents = async () => {
  try {
    return await EventModel.find();
  } catch (error) {
    throw new Error("Error while fetching events: " + error.message);
  }
};

export const searchEvents = async (searchTerm, category, sort) => {
  try {
    const query = {};

    // Use text search if searchTerm is provided
    if (searchTerm) {
      query.$text = { $search: searchTerm }; // Ensure text index is on the search fields (e.g., title, description)
    }

    // Filter by category if provided
    if (category && category !== "all") {
      query.category = category;
    }

    // Sort events based on createdAt field (ascending or descending)
    const sortOptions = sort === "asc" ? { createdAt: 1 } : { createdAt: -1 };

    return await EventModel.find(query).sort(sortOptions);
  } catch (error) {
    throw new Error("Error while searching events: " + error.message);
  }
};


// to get an event by ID
export const getEventById = async (eventId) => {
  try {
    return await EventModel.findById(eventId);
  } catch (error) {
    throw new Error("Error while fetching event: " + error.message);
  }
};
//   to update an event
export const updateEvent = async (eventId, updatedData) => {
  try {
    return await EventModel.findByIdAndUpdate(eventId, updatedData, {
      new: true,
    });
  } catch (error) {
    throw new Error("Error while updating event: " + error.message);
  }
};

//   to delete an event
export const deleteEvent = async (eventId) => {
  try {
    await EventModel.findByIdAndDelete(eventId);
    return { message: "Event deleted successfully" };
  } catch (error) {
    throw new Error("Error while deleting event: " + error.message);
  }
};

// Join event service
export const joinEventService = async (eventId, userId) => {
  try {
    const event = await EventModel.findById(eventId);

    if (!event) {
      throw new Error("Event not found");
    }

    // Check if the user is already a participant
    if (event.participants.includes(userId)) {
      throw new Error("User already joined this event");
    }

    // Add the user to the event's participants list
    event.participants.push(userId);

    await event.save();

    return event;
  } catch (error) {
    throw new Error("Error while joining event: " + error.message);
  }
};
