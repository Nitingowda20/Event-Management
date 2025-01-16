import {BrowserRouter as Router,Route,Routes, BrowserRouter} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import EventCreation from './pages/EventCreation';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import EventPage from './pages/EventPage ';
import EventSearch from './pages/EventSearch';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event" element={<EventCreation />} />
        {/* <Route path="/events/:eventId" element={<EventPage />} /> */}
        <Route path="/event/:eventId" element={<EventPage />} />
        <Route path="/search" element={<EventSearch />} />

        {/* <Route path="/guest-view" element={<GuestView />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
