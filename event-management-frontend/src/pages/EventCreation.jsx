import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client"; // Importing socket.io

const EventCreation = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [maxAttendees, setMaxAttendees] = useState("");
  const [image, setImage] = useState(null);
  const [attendeesCount, setAttendeesCount] = useState(0); // State for attendees count
  const [eventId, setEventId] = useState(null); // Store the created event ID

  const handleFileChange = (e) => {
    setImage(e.target.files[0]); // Store the file for upload
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    // Create FormData to send image to Cloudinary directly
    const formData = new FormData();
    formData.append("file", image); // Attach the file
    formData.append("upload_preset", "event_preset"); // Replace with your Cloudinary upload preset
    formData.append("cloud_name", "dgwhwdlyo");

    try {
      // Upload image to Cloudinary
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dgwhwdlyo/image/upload",
        formData
      );

      const imageUrl = response.data.secure_url; // Get the URL of the uploaded image

      // Now create the event with the image URL
      const eventData = {
        name,
        description,
        date,
        location,
        category,
        organizer,
        maxAttendees,
        image: imageUrl, // Send the Cloudinary image URL to the backend
      };

      // Submit event data to your backend
      const backendResponse = await axios.post(
        "http://localhost:1234/api/events/create",
        eventData
      );

      if (backendResponse.status === 201) {
        setEventId(backendResponse.data.id); // Get the event ID after creation
        alert("Event created successfully!");
      }
    } catch (error) {
      console.error("Error uploading image or creating event:", error);
      alert("Error creating event");
    }
  };
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  // Set up socket connection to listen for real-time attendees updates
  useEffect(() => {
    if (!eventId) return; // Only connect once event is created

    const socket = io("http://localhost:1234");

    // Join the event room using eventId
    socket.emit("joinEvent", eventId);

    // Listen for real-time attendee count updates
    socket.on("updateAttendees", (count) => {
      setAttendeesCount(count);
    });

    // Clean up when component unmounts
    return () => {
      socket.disconnect();
      socket.off("updateAttendees");
    };
  }, [eventId]); // Re-run when eventId changes

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        // backgroundImage:
        //   "url('https://4kwallpapers.com/images/walls/thumbs_2t/12523.jpg')",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
        // backgroundRepeat: "no-repeat",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "10px",
          padding: "10px",
          minHeight: "100vh", // Ensure it takes the full height of the viewport
          width: "40vw", // Ensure it takes the full width of the viewport
        }}
      >
        <h1
          style={{
            fontSize: "34px",
            padding: "10px",
            margin: "20px",
            textAlign: "center",
            color: "black",
          }}
        >
          Join us for an engaging event where innovation meets learning! Connect
          with experts, enhance your skills, and explore new trends in a dynamic
          setting. Don't miss this opportunity to grow and network!
        </h1>
      </div>

      {/* Right Section */}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "10px",
          gap: "15px",
          padding: "20px",
          height: "auto",
          width: "100%",
          maxWidth: "450px",
          backgroundColor: "white",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          className="text-center text-3xl my-7 font-semibold"
          style={{
            fontSize: "28px",
            fontFamily: "sans-serif",
            padding: "10px",
            margin: "10px",
            textAlign: "center",
          }}
        >
          Create an Event
        </h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event Name"
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Event Location"
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <select
          id="category"
          value={category}
          onChange={handleCategoryChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        >
          <option value="all">All</option>
          <option value="workshop">Workshop</option>
          <option value="conference">Conference</option>
          <option value="webinar">Webinar</option>
        </select>
        <input
          type="text"
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          placeholder="Organizer Name"
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="number"
          value={maxAttendees}
          onChange={(e) => setMaxAttendees(e.target.value)}
          placeholder="Capacity"
          required
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <input
          type="file"
          onChange={handleFileChange}
          style={{
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#4CAF50",
            color: "white",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
          }}
        >
          Create Event
        </button>
      </form>

      {/* Attendee List Section */}
      {eventId && (
        <div
          style={{
            marginTop: "20px",
            padding: "10px",
            backgroundColor: "#f0f0f0",
            borderRadius: "8px",
            textAlign: "center",
          }}
        >
          <h2>Real-Time Attendee Count</h2>
          <p>
            {attendeesCount} / {maxAttendees} people have joined
          </p>
        </div>
      )}
    </div>
  );
};

export default EventCreation;
