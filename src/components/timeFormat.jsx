import React from "react";

const DateTimeDisplay = ({ timestamp }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    const day = date.getDate();
    const month = date.toLocaleString("default", { month: "short" });
    const year = date.getFullYear();

    const ordinalSuffix = (n) => {
      if (n > 3 && n < 21) return "th";
      switch (n % 10) {
        case 1:
          return "st";
        case 2:
          return "nd";
        case 3:
          return "rd";
        default:
          return "th";
      }
    };

    return `${day}${ordinalSuffix(day)} ${month} ${year}`;
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="date-time-display">
      <span>
        <i className="fa-solid fa-calendar"></i> {formatDate(timestamp)}
      </span>
      <span>
        <i className="fa-solid fa-clock"></i> {formatTime(timestamp)}
      </span>
    </div>
  );
};

export default DateTimeDisplay;
