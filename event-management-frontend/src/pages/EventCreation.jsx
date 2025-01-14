import React, { useState } from "react";
import axios from 'axios';

const EventCreation = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [organizer, setOrganizer] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

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
        capacity,
        price,
        image: imageUrl, // Send the Cloudinary image URL to the backend
      };

      // Submit event data to your backend
      const backendResponse = await axios.post(
        "http://localhost:1234/api/events/create",
        eventData
      );

      if (backendResponse.status === 201) {
        alert("Event created successfully!");
      }
    } catch (error) {
      console.error("Error uploading image or creating event:", error);
      alert("Error creating event");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100vw",
        backgroundImage:
          "url('https://4kwallpapers.com/images/walls/thumbs_2t/12523.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* left */}
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

      {/* right */}
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
            fontSize: "54px",
            fontFamily: "sans-serif",
            padding: "10px",
            margin: "20px",
            textAlign: "center",
          }}
        >
          Create a Event
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
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          placeholder="Event Category"
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
          value={capacity}
          onChange={(e) => setCapacity(e.target.value)}
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
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          placeholder="Price"
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
    </div>
  );
};

export default EventCreation;
