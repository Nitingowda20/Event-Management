import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function EventCard({ event }) {
  return (
    <Card>
      <Link to={`/event/${event._id}`}>
        <EventImage
          src={event.image || "default-image-url"} // Default image URL if the event does not have an image
          alt="event cover"
        />
      </Link>
      <CardContent>
        <EventName>{event.name}</EventName>
        <LinkButton to={`/event/${event._id}`}>View Event</LinkButton>
      </CardContent>
    </Card>
  );
}

// Styled Components for basic styling
const Card = styled.div`
  position: relative;
  width: 100%;
  max-width: 400px;
  border: 2px solid #4fd1c5;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s;
  &:hover {
    border-color: #2b6cb0;
  }
`;

const EventImage = styled.img`
  positon : fixed;
  width: 100%;
  height: 300px;
  object-fit: cover;
  transition: height 0.3s;
  ${Card}:hover & {
    height: 250px;
  }
`;

const CardContent = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EventName = styled.p`
  font-size: 1.125rem;
  font-weight: bold;
  color: #2d3748;
  line-clamp: 2;
  overflow: hidden;
`;

const LinkButton = styled(Link)`
  position: absolute;
  bottom: -200px;
  left: 0;
  right: 0;
  padding: 12px;
  text-align: center;
  background-color: transparent;
  color: #4fd1c5;
  border: 2px solid #4fd1c5;
  border-radius: 4px;
  transition: all 0.3s;
  ${Card}:hover & {
    bottom: 0;
  }
  &:hover {
    background-color: #4fd1c5;
    color: white;
  }
`;
