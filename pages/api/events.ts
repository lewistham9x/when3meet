import supabase from "@/lib/supabaseClient";
import { EventInsert, EventRow, EventUpdate } from "@/lib/types";

export async function createEvent(
  event: EventInsert
): Promise<EventRow | null> {
  const { data, error } = await supabase.from("events").insert(event).select();

  if (error) {
    console.error("Error creating event:", error);
    return null;
  }
  console.log("data", data);

  return data?.[0] ?? null;
}

export async function getEvent(id: number): Promise<EventRow | null> {
  const { data, error } = await supabase
    .from("events")
    .select()
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error fetching event with id ${id}:`, error);
    return null;
  }

  return data ?? null;
}

export async function updateEvent(
  id: number,
  event: EventUpdate
): Promise<EventRow | null> {
  const { data, error } = await supabase
    .from("events")
    .update(event)
    .eq("id", id)
    .single();

  if (error) {
    console.error(`Error updating event with id ${id}:`, error);
    return null;
  }

  return data ?? null;
}

export async function deleteEvent(id: number): Promise<boolean> {
  const { error } = await supabase.from("events").delete().eq("id", id);

  if (error) {
    console.error(`Error deleting event with id ${id}:`, error);
    return false;
  }

  return true;
}

export async function getEvents(): Promise<EventRow[]> {
  const { data, error } = await supabase.from("events").select();

  if (error) {
    console.error("Error fetching events:", error);
    return [];
  }

  return data ?? [];
}
