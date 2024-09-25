"use client";
import { Card } from "@/components/ui/card";
import React from "react";
// import CalendarHeatmap from "react-calendar-heatmap";
import Heatmap from "./heatmap/Heatmap";
import { Separator } from "@/components/ui/separator";

const Calender = () => {
  return (
    <Card className="my-3 mx-2">
      <div className="h-[27.8px] p-[9px_12px_0_12px]">
        <div className="font-semibold">1781 submissions in the last year</div>
      </div>
      <Separator className="my-2" />

      <div className="p-3">
        <Heatmap />
        {/*  // Make this responsive by reducing the months to 6 months */}
      </div>
    </Card>
  );
};

export default Calender;
