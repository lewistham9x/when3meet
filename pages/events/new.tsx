import { useState } from "react";
import { useRouter } from "next/router";
import Layout from "../../components/Layout";
import EventForm from "../../components/EventForm";
import supabase from "../../lib/supabaseClient";

const NewEventPage: React.FC = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (eventData: FormData) => {
    setLoading(true);
    const { error } = await supabase.from("events").insert(eventData);
    setLoading(false);
    if (error) {
      console.error(error);
    } else {
      router.push("/events");
    }
  };

  return (
    <Layout title="New Event">
      <h1 className="text-3xl font-bold">New Event</h1>
      <div className="mt-4">
        <EventForm onCreate={handleSubmit} onSuccess={() => {}} />
      </div>
    </Layout>
  );
};

export default NewEventPage;
