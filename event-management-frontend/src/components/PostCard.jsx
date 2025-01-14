import { Link } from "react-router-dom";

export default function EventCard({ event }) {
  return (
    <div className="group relative w-full border border-teal-500 hover:border-2 h-[400px] overflow-hidden rounded-lg sm:w-[400px] transition-all">
      <Link to={`/event/${eventId}`}>
        <img
          src={events.image || "default-image-url"} // Default image URL if the event does not have an image
          alt="event cover"
          className="h-[260px] w-full object-cover group-hover:h-[200px] transition-all duration-300 z-20"
        />
      </Link>
      <div className="p-3 flex flex-col gap-2">
        <p className="text-lg font-semibold line-clamp-2">{events.name}</p>
        {/* You can add more details here if needed */}
        <Link
          to={`/event/${eventId}`}
          className="z-10 group-hover:bottom-0 absolute bottom-[-200px] left-0 right-0 border border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white transition-all duration-300 text-center py-2 rounded-md !rounded-tl-none m-2"
        >
          View Event
        </Link>
      </div>
    </div>
  );
}
