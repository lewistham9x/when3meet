import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "../../components/Layout";
import supabase from "../../lib/supabaseClient";
import { EventRow as Event } from "@/lib/types";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      const { data: events, error } = await supabase.from("events").select("*");
      setLoading(false);
      if (error) {
        console.error(error);
      } else {
        setEvents(events);
      }
    };

    fetchEvents();
  }, []);

  return (
    <Layout title="Events">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-3xl font-bold">Events</h1>
        <Link
          href="/events/new"
          className="inline-block py-2 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          New event
        </Link>
      </div>
      {loading ? (
        <div className="text-gray-500 text-sm">Loading...</div>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id} className="my-4">
              <Link
                href={`/events/${event.id}`}
                className="text-lg font-medium text-blue-600 hover:underline"
              >
                {event.name}
              </Link>
              <div className="text-gray-500">{event.description}</div>
              <div className="text-gray-500">{event.start_date}</div>
            </li>
          ))}
        </ul>
      )}
    </Layout>
  );
};

export default EventsPage;
