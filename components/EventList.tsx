interface Props {
  events: Event[];
}

const EventList = ({ events }) => {
  // const [events, setEvents] = useState<Event[]>([]);

  // useEffect(() => {
  //   const fetchEvents = async () => {
  //     const { data: eventsData } = await supabase
  //       .from("events")
  //       .select("*")
  //       .eq("user_id", userId);

  //     if (eventsData) {
  //       setEvents(eventsData);
  //     }
  //   };

  //   fetchEvents();
  // }, [userId]);

  if (!events.length) {
    return <p className="text-gray-500">No events found.</p>;
  }

  return (
    <ul className="divide-y divide-gray-200">
      {events.map((event) => (
        <li key={event.id} className="py-4">
          <a href={`/events/${event.id}`} className="block hover:text-blue-600">
            <h2 className="text-lg font-medium text-gray-900">{event.name}</h2>
            <p className="text-sm font-medium text-gray-500">
              {event.description}
            </p>
          </a>
        </li>
      ))}
    </ul>
  );
};

export default EventList;
