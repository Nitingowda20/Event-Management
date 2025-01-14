import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import EventCreation from './pages/EventCreation';
import Dashboard from './pages/Dashboard';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-event" element={<EventCreation />} />
        <Route path="/guest-view" element={<GuestView />} />
      </Routes>
    </Router>
  );
}

export default App
