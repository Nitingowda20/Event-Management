import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import styled from "styled-components";

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
        "https://event-management-e9oz.onrender.com/api/events/create",
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

    const socket = io("https://event-management-e9oz.onrender.com");

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
  }, [eventId]);

  return (
    <EventCreationWrapper>
      <LeftSection>
        <h1>
          Join us for an engaging event where innovation meets learning! Connect
          with experts, enhance your skills, and explore new trends in a dynamic
          setting. Don't miss this opportunity to grow and network!
        </h1>
      </LeftSection>

      <FormWrapper onSubmit={handleSubmit}>
        <h1>Create an Event</h1>

        <Input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Event Name"
          required
        />

        <Input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Event Description"
          required
        />

        <Input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <Input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Event Location"
          required
        />

        <Select value={category} onChange={handleCategoryChange}>
          <option value="all">All</option>
          <option value="workshop">Workshop</option>
          <option value="conference">Conference</option>
          <option value="webinar">Webinar</option>
        </Select>

        <Input
          type="text"
          value={organizer}
          onChange={(e) => setOrganizer(e.target.value)}
          placeholder="Organizer Name"
          required
        />

        <Input
          type="number"
          value={maxAttendees}
          onChange={(e) => setMaxAttendees(e.target.value)}
          placeholder="Capacity"
          required
        />

        <FileInput type="file" onChange={handleFileChange} />

        <SubmitButton type="submit">Create Event</SubmitButton>
      </FormWrapper>

      {eventId && (
        <AttendeeListSection>
          <h2>Real-Time Attendee Count</h2>
          <p>
            {attendeesCount} / {maxAttendees} people have joined
          </p>
        </AttendeeListSection>
      )}
    </EventCreationWrapper>
  );
};

export default EventCreation;

const EventCreationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-wrap: wrap;
  padding: 20px;
  background-color: #f5f5f5;

  @media (max-width: 600px) {
    flex-direction: column;
    padding: 10px;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  min-width: 280px;
  padding: 10px;
  text-align: center;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  margin-right: 20px;

  h1 {
    font-size: 18px;
    font-weight: 400;
    color: #333;
  }

  @media (max-width: 768px) {
    margin-right: 0;
    margin-bottom: 20px;
    h1 {
      font-size: 16px;
    }
  }
`;

const FormWrapper = styled.form`
  flex: 1;
  max-width: 400px;
  width: 90%;
  padding: 15px;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);

  h1 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 15px;
    color: #333;
  }

  @media (max-width: 600px) {
    padding: 10px;
    max-width: 100%;
  }
`;

const Input = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
  width: 90%;
`;

const Select = styled.select`
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
  width: 90%;
`;

const FileInput = styled.input`
  padding: 10px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #ccc;
  margin-bottom: 12px;
  width: 90%;
`;

const SubmitButton = styled.button`
  padding: 12px;
  font-size: 16px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-top: 10px;

  &:hover {
    background-color: #45a049;
  }
`;

const AttendeeListSection = styled.div`
  margin-top: 20px;
  padding: 12px;
  background-color: #f0f0f0;
  border-radius: 8px;
  text-align: center;

  h2 {
    font-size: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 16px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 15px;
    padding: 10px;
  }
`;
