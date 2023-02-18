import { useState } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import type { Availability, TimeRange } from "../types";

dayjs.extend(utc);
dayjs.extend(timezone);

interface Props {
  timeRange: TimeRange;
  timeZone: string;
  availabilities: Availability[];
  onAvailabilityClick: (date: string) => void;
}

const TimeSelectionGrid: React.FC<Props> = ({
  timeRange,
  timeZone,
  availabilities,
  onAvailabilityClick,
}) => {
  const start = dayjs(timeRange.start).tz(timeZone);
  const end = dayjs(timeRange.end).tz(timeZone);
  const numDays = end.diff(start, "day") + 1;
  const dates = new Array(numDays)
    .fill(null)
    .map((_, i) => start.add(i, "day").format("YYYY-MM-DD"));
  const timeIntervals = ["00", "30"];
  const numSlots = timeIntervals.length * 24 * numDays;
  const slotWidth = 100 / numSlots;
  const [hoverDate, setHoverDate] = useState<string | null>(null);

  const getAvailabilityForDate = (date: string): Availability | undefined => {
    return availabilities.find((a) => a.date === date);
  };

  const handleSlotEnter = (date: string) => {
    setHoverDate(date);
  };

  const handleSlotLeave = () => {
    setHoverDate(null);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr>
            <th className="px-2 py-3 text-left border-b border-gray-200"></th>
            {dates.map((date) => (
              <th
                key={date}
                className="px-2 py-3 text-left border-b border-gray-200"
              >
                <div className="text-sm font-medium text-gray-500">
                  {dayjs(date).format("ddd D/M")}
                </div>
                <div className="text-sm font-medium text-gray-900">
                  {dayjs(date).format("dddd")}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {timeIntervals.map((minute) => (
            <tr key={minute}>
              <td className="px-2 py-3 text-right border-b border-gray-200">
                <div className="text-sm font-medium text-gray-500">
                  {minute === "00" ? "am" : ""}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {parseInt(minute) + 12}
                </div>
                <div className="text-sm font-medium text-gray-500">
                  {minute === "00" ? "pm" : ""}
                </div>
              </td>
              {dates.map((date) => {
                const dateTime = dayjs(`${date}T00:${minute}`).tz(timeZone);
                const isInRange =
                  dateTime.isBefore(end) && dateTime.isAfter(start);
                const availability = getAvailabilityForDate(date);
                const isAvailable = availability?.timeslots.includes(
                  dateTime.format()
                );
                const isActive = hoverDate === date && isInRange;
                const className = `
                  border-b border-r border-gray-200 text-sm h-12
                  ${isInRange ? "hover:bg-blue-50" : "bg-gray-100"}
                  ${isActive ? "bg-blue-100" : ""}
                  ${isAvailable ? "bg-green-200" : ""}
               
                  `;
                return (
                  <td
                    key={`${date}-${minute}`}
                    className={className}
                    onClick={() => onAvailabilityClick(dateTime.format())}
                    onMouseEnter={() => handleSlotEnter(date)}
                    onMouseLeave={() => handleSlotLeave()}
                  ></td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TimeSelectionGrid;
