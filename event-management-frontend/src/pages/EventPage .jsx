import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const EventPage = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);
  const [attendeesCount, setAttendeesCount] = useState(0);
  const [joined, setJoined] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      const response = await fetch(
        `http://localhost:1234/api/events/${eventId}`
      );
      const data = await response.json();
      console.log("Fetched event data:", data);
      setEventDetails(data);
      setAttendeesCount(data.attendeesCount || 0);
    };

    fetchEventDetails();
  }, [eventId]);

  const handleJoinEvent = async () => {
    if (joined) {
      alert("You have already joined this event!");
      return;
    }

    const response = await fetch(
      `http://localhost:1234/api/events/${eventId}/join`,
      {
        method: "POST",
      }
    );

    if (response.ok) {
      setJoined(true);
      setAttendeesCount(attendeesCount + 1);
      alert("You have successfully joined the event!");
    } else {
      alert("Failed to join the event. Please try again.");
    }
  };

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <EventPageWrapper>
      <EventImage>
        <img
          src={eventDetails.image || "default-image.jpg"}
          alt={eventDetails.name}
        />
      </EventImage>
      <EventContentWrapper>
        <EventDetailsWrapper>
          <LeftSide>
            <h1>{eventDetails.name}</h1>
            <p>{eventDetails.description}</p>
            <div>
              <strong>Date:</strong>{" "}
              {new Date(eventDetails.date).toLocaleString()}
            </div>
            <div>
              <strong>Location:</strong> {eventDetails.location}
            </div>
            <div>
              <strong>Organizer:</strong> {eventDetails.organizer}
            </div>
            <div>
              <strong>Max Attendees (Capacity):</strong>{" "}
              {eventDetails.maxAttendees}
            </div>
          </LeftSide>
          <RightSide>
            <AttendeesSection>
              <h3>Attendees</h3>
              <p>
                {attendeesCount} / {eventDetails.maxAttendees} people joined
              </p>
              {!joined && (
                <button onClick={handleJoinEvent} className="join-btn">
                  Join Event
                </button>
              )}
              {joined && <p>You have joined this event!</p>}
            </AttendeesSection>
          </RightSide>
        </EventDetailsWrapper>
      </EventContentWrapper>
    </EventPageWrapper>
  );
};

export default EventPage;

// Styled components...
const EventPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
`;

const EventImage = styled.div`
  width: 100%;
  height: 50vh;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const EventContentWrapper = styled.div`
  flex-grow: 1;
  padding: 20px;
  background-color: #fafafa;
`;

const EventDetailsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LeftSide = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const RightSide = styled.div`
  flex: 1;
  padding: 20px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
`;

const AttendeesSection = styled.div`
  padding: 20px;
  background-color: #4fd1c5;
  border-radius: 10px;
  color: white;
  text-align: center;

  .join-btn {
    padding: 10px 20px;
    background-color: #ff5722;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 20px;
    font-size: 16px;

    &:hover {
      background-color: #ff3d00;
    }
  }
`;
