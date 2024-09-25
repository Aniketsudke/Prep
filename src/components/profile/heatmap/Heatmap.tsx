import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { heatmapdata } from "@/constant/heatmapdata";
import "./Heatmap.css";

const today = new Date();

function Heatmap() {
  const [daysToShow, setDaysToShow] = useState(365);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setDaysToShow(200); // 6 months
      } else {
        setDaysToShow(365); // 1 year
      }
    };

    handleResize(); // Set the initial value based on the screen size
    window.addEventListener("resize", handleResize); // Adjust the value when the window is resized

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = getRange(daysToShow).map((index) => {
    return {
      date: shiftDate(today, -index),
      count: heatmapdata[index],
    };
  });

  return (
    <div>
      <CalendarHeatmap
        startDate={shiftDate(today, -daysToShow)}
        endDate={today}
        values={data}
        classForValue={(value:{date:string,count:number}) => {
          if (!value) {
            return "color-empty";
          }
          return value.count < 5
            ? `color-github-${value.count}`
            : `color-github-5`;
        }}
        showWeekdayLabels={false}
      />
    </div>
  );
}

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

function getRange(count: number) {
  return Array.from({ length: count }, (_, i) => i);
}

export default Heatmap;
