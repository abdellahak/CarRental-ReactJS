import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

export default function Calendar({events}) {

  const eventDates = events.flatMap((event) => {
    const startDate = new Date(event.start);
    const endDate = new Date(event.end);
    const dates = [];
    while (startDate <= endDate) {
      dates.push(startDate.toISOString().split("T")[0]);
      startDate.setDate(startDate.getDate() + 1);
    }
    return dates;
  });

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={[]} // Hide event titles
      dayCellDidMount={(info) => {
        const dateStr = info.date.toISOString().split("T")[0];
        if (eventDates.includes(dateStr)) {
            info.el.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Apply red background with opacity to cells with events
        }
      }}
      height="600px"
    />
  );
}
