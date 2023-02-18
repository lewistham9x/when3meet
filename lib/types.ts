import { Database as definitions } from "@/lib/database";

export type EventRow = definitions["public"]["Tables"]["events"]["Row"];
export type EventInsert = definitions["public"]["Tables"]["events"]["Insert"];
export type EventUpdate = definitions["public"]["Tables"]["events"]["Update"];

export type AvailabilityRow =
  definitions["public"]["Tables"]["availabilities"]["Row"];
export type AvailabilityInsert =
  definitions["public"]["Tables"]["availabilities"]["Insert"];
export type AvailabilityUpdate =
  definitions["public"]["Tables"]["availabilities"]["Update"];
export interface TimeRange {
  start: string; // ISO 8601 formatted string
  end: string; // ISO 8601 formatted string
}
