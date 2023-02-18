import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Layout from "@/components/Layout";
import TimeSelectionGrid from "@/components/TimeSelectionGrid";
import supabase from "@/lib/supabaseClient";
import { AvailabilityRow, TimeRange, EventRow as Event } from "@/lib/types";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  event: Event;
  initialAvailabilities: AvailabilityRow[];
}

const EventPage: React.FC<Props> = ({ event, initialAvailabilities }) => {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState<TimeRange>({
    start: event.start_date,
    end: event.end_date,
  });
  const [availabilities, setAvailabilities] = useState<AvailabilityRow[]>(
    initialAvailabilities
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const updateEvent = async () => {
      setLoading(true);
      const { error } = await supabase
        .from("events")
        .update({ start_date: timeRange.start, end_date: timeRange.end })
        .match({ id: event.id });
      setLoading(false);
      if (error) {
        console.error(error);
      }
    };

    if (event.id) {
      updateEvent();
    }
  }, [timeRange, event]);

  const handleAvailabilityRowClick = async (date: string) => {
    const AvailabilityRow = availabilities.find((a) => a.date === date);
    const timeslot = dayjs.tz(date, event.timezone).format();
    let updatedAvailabilities: AvailabilityRow[];

    if (AvailabilityRow) {
      const timeslots = AvailabilityRow.timeslots.filter((t) => t !== timeslot);
      if (timeslots.length === 0) {
        const { error } = await supabase
          .from("availabilities")
          .delete()
          .match({ id: AvailabilityRow.id });
        if (error) {
          console.error(error);
        }
        updatedAvailabilities = availabilities.filter(
          (a) => a.id !== AvailabilityRow.id
        );
      } else {
        const { error, data } = await supabase
          .from("availabilities")
          .update({ timeslots })
          .match({ id: AvailabilityRow.id });
        if (error) {
          console.error(error);
        }
        updatedAvailabilities = availabilities.map((a) =>
          a.id === data[0].id ? data[0] : a
        );
      }
    } else {
      const { error, data } = await supabase
        .from("availabilities")
        .insert({ event_id: event.id, date, timeslots: [timeslot] })
        .select();
      if (error) {
        console.error(error);
      }
      updatedAvailabilities = [...availabilities, data[0]];
    }

    setAvailabilities(updatedAvailabilities);
  };

  return (
    <Layout title={event.name}>
      <h1 className="text-3xl font-bold">{event.name}</h1>
      <p className="text-gray-600">{event.description}</p>
      <div className="mt-4">
        <TimeSelectionGrid
          timeRange={timeRange}
          timeZone={event.timezone}
          availabilities={availabilities}
          onAvailabilityClick={handleAvailabilityRowClick}
        />
      </div>
      {loading && (
        <div className="text-gray-500 text-sm mt-2">Saving changes...</div>
      )}
      <div className="text-gray">
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          onClick={() => router.push(`/events/${event.id}/results`)}
        >
          View Results
        </button>
      </div>
    </Layout>
  );
};

export const getServerSideProps = async ({ params }) => {
  const { data: event, error: eventError } = await supabase
    .from("events")
    .select("*")
    .eq("id", params.eventId)
    .single();

  if (!event) {
    return { notFound: true };
  }

  const { data: availabilities, error: availabilitiesError } = await supabase
    .from("availabilities")
    .select("*")
    .eq("event_id", event.id);

  return {
    props: {
      event,
      initialAvailabilities: availabilities || [],
    },
  };
};

export default EventPage;
