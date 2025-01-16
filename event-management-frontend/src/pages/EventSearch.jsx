import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import EventCard from "../components/EventCard"; // Import EventCard component

const Container = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 100vw;
  @media (min-width: 768px) {
    flex-direction: row;
  }
`;
export const TextInput = styled.input`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 1rem;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
export const Select = styled.select`
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #ccc;
  width: 100%;
  font-size: 1rem;

  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 0.375rem;
  border: 1px solid #007bff;
  background-color: #007bff;
  color: white;
  font-size: 1rem;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
    border-color: #0056b3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(38, 143, 255, 0.5);
  }
`;
const Sidebar = styled.div`
  padding: 20px;
  border-bottom: 1px solid #d1d5db;
  @media (min-width: 768px) {
    border-right: 1px solid #d1d5db;
    min-height: 100vh;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const Label = styled.label`
  font-weight: bold;
  white-space: nowrap;
`;
const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;
const MainContent = styled.div`
  flex-grow: 1;
  padding: 20px;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  border-bottom: 1px solid #d1d5db;
  padding-bottom: 10px;
`;
const EventsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
const ShowMoreButton = styled.button`
  color: #0d9488;
  text-decoration: underline;
  padding: 20px;
  width: 100%;
  text-align: center;
  cursor: pointer;

  &:hover {
    text-decoration: none;
  }
`;

const API_URL = "https://event-management-e9oz.onrender.com";

export default function EventSearch() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "all",
  });

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        searchTerm: searchTermFromUrl || "",
        sort: sortFromUrl || "desc",
        category: categoryFromUrl || "all",
      });
    }

    const fetchEvents = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://event-management-e9oz.onrender.com/api/events/searchevent`,
          {
            params: {
              searchTerm: urlParams.get("searchTerm"),
              sort: urlParams.get("sort"),
              category: urlParams.get("category"),
              startIndex: urlParams.get("startIndex"),
            },
          }
        );

        // Log the fetched data to check if it's correct
        console.log("Fetched data:", response.data);

        // Assuming the response structure is an array
        if (response.data && Array.isArray(response.data)) {
          console.log("Fetched events:", response.data); // Log the actual event array
          setEvents(response.data);
          setShowMore(response.data.length === 9);
        } else {
          console.log("No events found or incorrect data format");
          setEvents([]);
          setShowMore(false);
        }
      } catch (error) {
        console.error("Failed to fetch events", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [location.search]);

  useEffect(() => {
    console.log("Updated events:", events);
  }, [events]); // Logs every time events state is updated

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSidebarData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(sidebarData).toString();
    navigate(`/search?${params}`);
  };

  const handleShowMore = async () => {
    try {
      const response = await axios.get(
        `https://event-management-e9oz.onrender.com/api/events/searchevent`,
        {
          params: {
            ...sidebarData,
            startIndex: events.length,
          },
        }
      );
      if (response.data && response.data.events) {
        setEvents((prev) => [...prev, ...response.data.events]);
        setShowMore(response.data.events.length === 9);
      }
    } catch (error) {
      console.error("Failed to fetch more events", error);
    }
  };

  return (
    <Container>
      <Sidebar>
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <Label htmlFor="searchTerm">Search Term:</Label>
            <TextInput
              id="searchTerm"
              type="text"
              placeholder="Search events..."
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="sort">Sort:</Label>
            <Select id="sort" value={sidebarData.sort} onChange={handleChange}>
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </InputWrapper>
          <InputWrapper>
            <Label htmlFor="category">Category:</Label>
            <Select
              id="category"
              value={sidebarData.category}
              onChange={handleChange}
            >
              <option value="all">All</option>
              <option value="workshop">Workshop</option>
              <option value="conference">Conference</option>
              <option value="webinar">Webinar</option>
            </Select>
          </InputWrapper>
          <Button type="submit">Apply Filters</Button>
        </Form>
      </Sidebar>
      <MainContent>
        <Title>Event Results:</Title>
        <EventsWrapper>
          {loading ? (
            <p>Loading...</p>
          ) : events.length === 0 ? (
            <p>No events found.</p>
          ) : (
            events &&
            events.map((event) => <EventCard key={event.id} event={event} />)
          )}
          {/* {loading && <p className="text-xl text-gray-500">Loading...</p>}
          {!loading &&
            events &&
            events.map((post) => <EventCard key={event._id} event={event} />)} */}
          {showMore && (
            <ShowMoreButton onClick={handleShowMore}>Show More</ShowMoreButton>
          )}
        </EventsWrapper>
      </MainContent>
    </Container>
  );
}
