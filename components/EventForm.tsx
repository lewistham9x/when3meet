import { useState } from "react";
import { useRouter } from "next/router";
import { createEvent } from "@/pages/api/events";
import { TimeRange } from "@/lib/types";
import TimeZoneSelector from "./TimeZoneSelector";

type Props = {
  onCreate?: (event: any) => void;
  onSuccess: () => void;
};

const EventForm = ({ onSuccess }: Props) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [timeRange, setTimeRange] = useState<TimeRange>({ start: "", end: "" });
  const [options, setOptions] = useState<any>({
    limit: 0,
    comments: false,
    reminders: false,
  });
  const [timeZone, setTimeZone] = useState("Asia/Singapore");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleStartDateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTimeRange((prev) => ({ ...prev, start: event.target.value }));
  };

  const handleEndDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeRange((prev) => ({ ...prev, end: event.target.value }));
  };

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev) => ({ ...prev, limit: Number(event.target.value) }));
  };

  const handleCommentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOptions((prev) => ({ ...prev, comments: event.target.checked }));
  };

  const handleRemindersChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setOptions((prev) => ({ ...prev, reminders: event.target.checked }));
  };

  const handleTimeZoneChange = (timezone: string) => {
    setTimeZone(timezone);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    const data = {
      name,
      description,
      start_date: timeRange.start,
      end_date: timeRange.end,
      timezone: timeZone,
      options,
    };
    const response = await createEvent(data);

    setIsLoading(false);

    if (!response) {
      console.error(response);
    } else {
      router.push(`/events/${response?.id}`);
      onSuccess();
    }
  };

  const handleCancel = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-md">
        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="name"
            >
              Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="name"
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Enter description"
              value={description}
              onChange={handleDescriptionChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="start_date"
            >
              Start date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="start_date"
              type="datetime-local"
              value={timeRange.start}
              onChange={handleStartDateChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="end_date"
            >
              End date
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="end_date"
              type="datetime-local"
              value={timeRange.end}
              onChange={handleEndDateChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="timezone"
            >
              Timezone
            </label>
            <TimeZoneSelector
              value={timeZone}
              onChange={handleTimeZoneChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="limit"
            >
              Limit
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="limit"
              type="number"
              min="0"
              value={options.limit}
              onChange={handleLimitChange}
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="comments"
            >
              Comments
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="comments"
              checked={options.comments}
              onChange={handleCommentsChange}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 font-bold mb-2"
              htmlFor="reminders"
            >
              Reminders
            </label>
            <input
              className="mr-2 leading-tight"
              type="checkbox"
              id="reminders"
              checked={options.reminders}
              onChange={handleRemindersChange}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm;
