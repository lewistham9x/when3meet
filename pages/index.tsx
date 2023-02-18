import { useState } from "react";
import Layout from "../components/Layout";
import EventList from "../components/EventList";
import EventForm from "../components/EventForm";
import supabase from "../lib/supabaseClient";
import { EventRow as Event } from "../lib/types";
import "@/app/globals.css";
interface Props {
  events: Event[];
}

const Home: React.FC<Props> = ({ events }) => {
  const [eventList, setEventList] = useState<Event[]>(events);

  const handleCreateEvent = async (event: Event) => {
    const { data, error } = await supabase
      .from("events")
      .insert(event)
      .select();

    if (error) {
      console.error(error);
    } else {
      setEventList([...eventList, data[0]]);
    }
  };

  return (
    <Layout title="When2meet">
      <div className="space-y-4">
        <EventForm onCreate={handleCreateEvent} onSuccess={() => {}} />
        <EventList events={eventList} />
      </div>
    </Layout>
  );
};

export const getServerSideProps = async () => {
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
  }

  return {
    props: {
      events: events || [],
    },
  };
};

export default Home;
