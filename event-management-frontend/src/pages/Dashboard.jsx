import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import EventCard from "../components/EventCard";
import styled from "styled-components";

export default function Dashboard() {
  const API_URL = "http://localhost:1234";

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${API_URL}/api/events/getallevent`);
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        const data = await res.json();
        console.log("Fetched events:", data);
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  return (
    <DashboardWrapper>
      <Header>
        <Title>
          <p>
            Here, you can explore a variety of upcoming and past events. As a
            guest, you can view event details, but to fully interact with our
            features, such as registering for events or participating in
            discussions, please log in or sign up for an account. We encourage
            you to join our community and take advantage of all the exciting
            opportunities available!
          </p>
        </Title>
        <LinkText to="/search">View all Events</LinkText>
      </Header>

      <Divider />

      <EventsSection>
        {events && events.length > 0 && (
          <EventsGrid>
            <h2>Recent Events</h2>
            <Grid>
              {events.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </Grid>
          </EventsGrid>
        )}
      </EventsSection>

      <LinkText to="/search">View all Events</LinkText>
    </DashboardWrapper>
  );
}

const DashboardWrapper = styled.div`
  width: 100%;
  padding: 28px 3px;
  max-width: 7xl;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Header = styled.div`
  text-align: center;
  font-size: 1.5rem; /* Default for smaller devices */
  font-weight: bold;
  @media (min-width: 768px) {
    font-size: 2.5rem;
  }
  @media (min-width: 1024px) {
    font-size: 3.5rem;
  }
`;

const Title = styled.div`
  color: #4a5568;
  font-size: 1rem;
  margin-top: 5px;
  padding: 12px;
  @media (min-width: 640px) {
    font-size: 1.25rem;
  }
`;

const LinkText = styled(Link)`
  text-align: center;
  color: #4fd1c5;
  font-weight: bold;
  font-size: 1rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const Divider = styled.div`
  min-width: 100%;
  padding: 1px;
  background-color: #ffbf00;
  @media (prefers-color-scheme: dark) {
    background-color: #2d3748;
  }
`;

const EventsSection = styled.div`
  padding: 15px 3px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-top: 1rem;
`;

const EventsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  text-align: center;
  h2 {
    font-size: 1.5rem;
    font-weight: 600;
    @media (min-width: 768px) {
      font-size: 2rem;
    }
    @media (min-width: 1024px) {
      font-size: 2.5rem;
    }
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 24px;
  @media (min-width: 640px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
