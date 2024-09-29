import React, { useEffect, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import { Attempt } from "@/types";
import "./Heatmap.css";



type AttemptData = {
  date: string;
  count: number;
};
const today = new Date();

function Heatmap({ attempts }: { attempts: Attempt[] }) {
  const [daysToShow, setDaysToShow] = useState(365);
  const [heatmapData, setHeatmapData] = useState<AttemptData[]>([]);
  
  
  useEffect(() => {
    // Function to generate dates for the past `daysToShow` days
    const generateDateRange = (days: number) => {
      const dates: Record<string, number> = {};
      for (let i = 0; i < days; i++) {
        const date = shiftDate(today, -i).toISOString().split("T")[0]; // format date to YYYY-MM-DD
        dates[date] = 0; // Initialize with 0 for each day
      }
      return dates;
    };

    // Initialize a record of all days with a default count of 0
    const allDays = generateDateRange(daysToShow);
    // Populate `allDays` with actual attempt data
    attempts.forEach((attempt) => {
        
      
        const date = new Date(attempt.solvedAt).toISOString().split("T")[0]; // format date to YYYY-MM-DD
        allDays[date] = (allDays[date] || 0) + 1; // Increment the count for this date
        
      
    });

    // Convert `allDays` object to an array for the heatmap
    const formattedData = Object.entries(allDays).map(([date, count]) => ({
      date,
      count: count || 0, // Set count to 0 if no attempts were made
    }));

    setHeatmapData(formattedData);
  }, [attempts, daysToShow]);

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

  return (
    <div>
      <CalendarHeatmap
        startDate={shiftDate(today, -daysToShow)}
        endDate={today}
        values={heatmapData}
        classForValue={(value: { date: string; count: number }) => {
          if (!value || value.count === 0) {
            return "color-empty";
          }
          if (value.count === 1) {
            return "color-github-1"; 
          }
          return value.count < 9
            ? `color-github-${value.count/2}`
            : `color-github-5`;
        }}
        showWeekdayLabels={false}
        titleForValue={(value: { date: string; count: number }) => {
          

          if (!value || value.count === 0) {
            return `${value?.date}: No attempts`; // Show no attempts if count is 0
          }
          return `${value?.date}: ${value.count} attempt${value.count > 1 ? 's' : ''}`;
        }}
      />
    </div>
  );
}

function shiftDate(date: Date, numDays: number) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export default Heatmap;
