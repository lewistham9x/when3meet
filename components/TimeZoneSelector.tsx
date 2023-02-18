import { useState } from "react";
import supabase from "../lib/supabaseClient";

interface Props {
  onUpdate: (timezone: string) => void;
}

const TimeZoneSelector: React.FC<Props> = ({ onUpdate }) => {
  const [timezone, setTimezone] = useState<string>("Asia/Singapore");

  // const handleTimezoneChange = async (
  //   event: React.ChangeEvent<HTMLSelectElement>
  // ) => {
  //   const newTimezone = event.target.value;
  //   const { error } = await supabase
  //     .from<User>("users")
  //     .upsert({ timezone: newTimezone }, { returning: "minimal" })
  //     .match({ id: user.id });

  //   if (!error) {
  //     onUpdate(newTimezone);
  //     setTimezone(newTimezone);
  //   }
  // };

  return (
    <select
      value={timezone}
      // onChange={handleTimezoneChange}
      className="border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:ring-2"
    >
      {Intl.DateTimeFormat().resolvedOptions().timeZone === timezone ? (
        <option value={timezone}>{timezone} (local)</option>
      ) : (
        <option value={timezone}>{timezone}</option>
      )}
      {Intl.DateTimeFormat().resolvedOptions().timeZone !== timezone && (
        <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
          {Intl.DateTimeFormat().resolvedOptions().timeZone} (local)
        </option>
      )}
    </select>
  );
};

export default TimeZoneSelector;
