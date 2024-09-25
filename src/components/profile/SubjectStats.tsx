"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";


import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { useEffect, useState } from "react";

const SubjectStats = ({
  subject,
  color,
  totalQuestions,
  solvedQuestions,
}: {
  subject: string;
  color: string;
  totalQuestions: number;
  solvedQuestions: number;
}) => {
  const angle: number = (solvedQuestions / totalQuestions) * 360;

  const chartData = [
    {
      browser: "subject",
      problems: solvedQuestions,
      fill: "var(--color-subject)",
    },
  ];

  const chartConfig = {
    problems: {
      label: "Problems",
    },
    subject: {
      label: "Subject",
      color: `${color}`,
    },
  } satisfies ChartConfig;

  const [pieWidth, setPieWidth] = useState(80);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPieWidth(40);
      } else {
        setPieWidth(70);
      }
    };

    handleResize(); // Set the initial value based on the screen size
    window.addEventListener("resize", handleResize); // Adjust the value when the window is resized

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full md:py-2">
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square md:max-h-[170px] max-h-[100px] "
      >
        <RadialBarChart
          data={chartData}
          endAngle={angle}
          innerRadius={pieWidth}
          outerRadius={pieWidth + 30}
        >
          <PolarGrid
            gridType="circle"
            radialLines={false}
            stroke="none"
            className="first:fill-muted last:fill-white"
            polarRadius={[pieWidth + 4, pieWidth - 4]}
          />
          <RadialBar dataKey="problems" background />
          <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground md:text-4xl text-xl font-bold "
                      >
                        {chartData[0].problems.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 22}
                        className="fill-muted-foreground text-xs  md:text-base "
                      >
                        Questions
                      </tspan>
                    </text>
                  );
                }
              }}
            />
          </PolarRadiusAxis>
        </RadialBarChart>
      </ChartContainer>
      <div className="text-center ">
        <h2 className="md:text-lg text-base font-semibold">{subject}</h2>
      </div>
    </div>
  );
};

export default SubjectStats;
