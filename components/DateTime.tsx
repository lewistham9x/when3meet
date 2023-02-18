import { useEffect, useState } from "react";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevMonth = () => {
    const prevMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    setCurrentDate(nextMonth);
  };

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const firstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  const days = [] as number[];
  const daysCount = daysInMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );
  const offset = firstDayOfMonth(
    currentDate.getMonth(),
    currentDate.getFullYear()
  );

  for (let i = 0; i < offset; i++) {
    days.push("");
  }

  for (let i = 1; i <= daysCount; i++) {
    days.push(i);
  }

  return (
    <div className="Quiz--calendar flex flex-wrap mb-4">
      <table className="border-collapse border-separate border-spacing-0.5rem">
        <caption className="flex items-center justify-center space-x-4">
          <button
            className="relative w-8 h-8 flex items-center justify-center rounded-full text-gray-700 focus:outline-none"
            onClick={handlePrevMonth}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M15.707 9.707a1 1 0 0 0-1.414-1.414l-4 4a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414-1.414L12.414 12H18a1 1 0 0 0 0-2h-5.293l3.707-3.707z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="font-medium">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </div>
          <button
            className="relative w-8 h-8 flex items-center justify-center rounded-full text-blue-500 focus:outline-none"
            onClick={handleNextMonth}
          >
            <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M4.293 9.707a1 1 0 0 0 0 1.414l4 4a1 1 0 0 0 1.414-1.414L6.414 12H12a1 1 0 0 0 0-2H6.414l3.293-3.293a1 1 0 0 0-1.414-1.414l-4 4z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </caption>
        <thead>
          <tr>
            <th className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sun
            </th>
            <th className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Mon
            </th>
            <th className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Tue
            </th>
            <th className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Wed
            </th>
            <th className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Thu
            </th>
            <th className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Fri
            </th>
            <th className="text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sat
            </th>
          </tr>
        </thead>
        <tbody>
          {[...Array(Math.ceil(days.length / 7)).keys()].map((week) => (
            <tr key={week}>
              {[...Array(7).keys()].map((day) => (
                <td key={day}>
                  {days[week * 7 + day] && (
                    <>
                      <input
                        type="checkbox"
                        id={`day-${days[week * 7 + day]}`}
                        className="sr-only"
                      />
                      <label
                        htmlFor={`day-${days[week * 7 + day]}`}
                        className="relative block h-8 rounded-full w-8 flex items-center justify-center text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-100"
                      >
                        {days[week * 7 + day]}
                      </label>
                    </>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
const Time = ({ label, value, onChange }) => {
  const hours = [...Array(24).keys()].map((hour) => {
    return hour < 10 ? "0" + hour : hour.toString();
  });
  const minutes = ["00", "15", "30", "45"];
  const [time, setTime] = useState("12:00");

  useEffect(() => {
    if (Number.isInteger(value)) {
      const hour = value < 10 ? "0" + value : value.toString();
      setTime(`${hour}:00`);
    } else {
      setTime(`${value}:00`);
    }
  }, [value]);

  const handleHourChange = (event) => {
    const newHour = event.target.value;
    const newTime = `${newHour}:${time.split(":")[1]}`;
    setTime(newTime);
    onChange(newTime);
  };

  const handleMinuteChange = (event) => {
    const newMinute = event.target.value;
    const newTime = `${time.split(":")[0]}:${newMinute}`;
    setTime(newTime);
    onChange(newTime);
  };

  return (
    <div className="relative flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="flex flex-row items-center">
        <select
          value={time.split(":")[0]}
          onChange={handleHourChange}
          className="mr-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {hours.map((hour) => (
            <option key={hour} value={hour}>
              {hour}
            </option>
          ))}
        </select>
        <span className="text-gray-500">:</span>
        <select
          value={time.split(":")[1]}
          onChange={handleMinuteChange}
          className="ml-2 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          {minutes.map((minute) => (
            <option key={minute} value={minute}>
              {minute}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

const DateTime = ({ label, value, onChange }) => {
  const handleDateChange = (event) => {
    const date = new Date(event.target.value);
    const dateTime = new Date(value);
    dateTime.setDate(date.getDate());
    dateTime.setMonth(date.getMonth());
    dateTime.setFullYear(date.getFullYear());
    onChange(dateTime.toISOString());
  };

  const handleTimeChange = (time) => {
    const dateTime = new Date(value);
    const [hours, minutes] = time.split(":");
    dateTime.setHours(hours);
    dateTime.setMinutes(minutes);
    onChange(dateTime.toISOString());
  };
  return (
    <div className="flex flex-col">
      <label className="font-bold text-xl mb-4">{label}</label>
      <div className="flex flex-row bg-gray-100 rounded-md p-4 space-x-4">
        <Calendar />
        <div className="flex flex-col w-2/5">
          <Time
            label={"Time"}
            value={value.slice(11)}
            onChange={(newTime) => onChange(value.slice(0, 11) + newTime)}
          />
        </div>
      </div>
    </div>
  );
};

export default Time;
